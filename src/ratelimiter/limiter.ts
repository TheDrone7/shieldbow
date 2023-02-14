import type { MethodRateLimitConfig, RateLimitConfig, RateLimiterOptions } from './config';
import parseOptions from './parseOptions';
import type { Client } from '../client';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiRequestOptions } from './requestOptions';
import { ApiError, mockRatelimitedResponse } from './error';
import { apiBaseURLs, regionalURLs } from '../util/urls';
import axiosRetry from 'axios-retry';
import { Queue } from './queue';

export class RateLimiter {
  private readonly appLimit: RateLimitConfig[];
  private readonly methodLimit: MethodRateLimitConfig;
  private readonly throw: boolean;
  private readonly strategy: 'burst' | 'spread';
  private readonly client: Client;
  private readonly _http: AxiosInstance;
  private readonly _queue = new Queue();

  constructor(client: Client, options: RateLimiterOptions, apiKey: string) {
    const config = parseOptions(options);
    this.client = client;
    this.appLimit = config.appLimit;
    this.methodLimit = config.methodLimit;
    this.throw = config.throw;
    this.strategy = config.strategy;
    this._http = axios.create({
      headers: {
        'X-Riot-Token': apiKey,
        'Content-Type': 'application/json'
      },
      responseType: 'json',
      validateStatus: (_) => true
    });
    axiosRetry(this._http, {
      retries: config.retry.retries,
      retryDelay: () => config.retry.retryDelay!
    });
  }

  async request(url: string, options: ApiRequestOptions): Promise<AxiosResponse> {
    return await this._queue.enqueue(this.requestFromApi.bind(this, url, options));
  }

  private async requestFromApi(url: string, options: ApiRequestOptions) {
    const request = `${options.api}:${options.method} (${options.params})`;
    this.client.logger?.debug(`Request URL: '${url}' - intention: ${request}`);

    return new Promise<AxiosResponse>(async (resolve, reject) => {
      await this.update(options.api, options.method).catch(reject);
      const check = await this.check(options.api, options.method).catch((e) => {
        throw e;
      });
      if (check.limited && this.throw)
        reject(new ApiError(429, url, this._http.defaults.headers.get, mockRatelimitedResponse));
      else if (check.limited && !this.throw)
        setTimeout(async () => {
          this.client.logger?.debug(`Request was ratelimited. Retrying in ${check.delay}ms.`);
          const response = await this.request(url, options).catch(reject);
          if (response) resolve(response);
        }, check.delay);
      else {
        this.client.logger?.trace(`Making the request - ${request}`);
        const base = options.regional ? regionalURLs[options.region] : apiBaseURLs[options.region];
        setTimeout(async () => {
          const response = await this._http.get(base + url);
          if (response.status !== 200)
            reject(new ApiError(response.status, base + url, this._http.defaults.headers.get, response));
          else resolve(response);
        }, check.delay);
      }
    });
  }

  async check(api: keyof MethodRateLimitConfig, method: string) {
    const appLimit = await this._checkAppLimit();
    const methodLimit = await this._checkMethodLimit(api, method);
    this.client.logger?.trace('App limit in (check): ', appLimit);
    this.client.logger?.trace('Method limit in (check): ', methodLimit);
    if (appLimit.limited || methodLimit.limited)
      return {
        limited: true,
        delay: Math.max(appLimit.delay, methodLimit.delay)
      };
    this.client.logger?.trace('Returned limit in (check): ', {
      limited: false,
      delay: Math.max(appLimit.delay, methodLimit.delay)
    });
    return { limited: false, delay: Math.max(appLimit.delay, methodLimit.delay) };
  }

  private async _checkAppLimit() {
    const appLimits = await this._fetchAppLimitUsage();
    this.client.logger?.trace(`Current time: ${Date.now()}, Cached limits:`, appLimits);
    const now = Date.now();
    const appLimit = this.appLimit.map((limit) => {
      const usage = appLimits.filter((time) => time >= now - limit.duration);
      const limited = usage.length >= limit.limit;
      return { limited, delay: this._calculateSpreadDelay(limit, usage) };
    });
    this.client.logger?.trace(`Processed limits:`, appLimits);
    const limited = appLimit.filter((limit) => limit.limited);
    this.client.logger?.trace(`Filtered limits:`, limited);
    if (limited.length > 0) return limited.sort((a, b) => b.delay - a.delay)[0];
    return appLimit.sort((a, b) => a.delay - b.delay)[0];
  }

  private async _checkMethodLimit(api: keyof MethodRateLimitConfig, method: string) {
    const methodLimits = await this._fetchMethodLimitUsage(api, method);
    const now = Date.now();
    const methodLimit = this.methodLimit[api][method]
      .map((limit) => {
        const usage = methodLimits.filter((time) => time >= now - limit.duration);
        const limited = usage.length >= limit.limit;
        return { limited, delay: this._calculateSpreadDelay(limit, usage) };
      })
      .sort((a, b) => a.delay - b.delay);
    return methodLimit[0];
  }

  async update(api: keyof MethodRateLimitConfig, method: string) {
    const appLimits = await this._fetchAppLimitUsage();
    const methodLimits = await this._fetchMethodLimitUsage(api, method);
    this.client.logger?.trace(`Old limits:`, appLimits);
    appLimits.push(Date.now());
    methodLimits.push(Date.now());
    this.client.logger?.trace(`New limits:`, appLimits);
    const oldestApp = Math.max(...this.appLimit.map((l) => l.duration));
    const oldestMethod = Math.max(...this.methodLimit[api][method].map((l) => l.duration));
    this.client.logger?.trace(
      `Filtered new limits:`,
      appLimits.filter((time) => time >= Date.now() - oldestApp)
    );
    await this.client.cache.set<number[]>(
      'limits:app:usage',
      appLimits.filter((time) => time >= Date.now() - oldestApp)
    );
    await this.client.cache.set<number[]>(
      `limits:method:${method}:usage`,
      methodLimits?.filter((time) => time >= Date.now() - oldestMethod)
    );
  }

  private _calculateSpreadDelay(l: RateLimitConfig, usage: number[]) {
    const used = usage.length;
    if (used >= l.limit) return l.duration - (Date.now() - usage[0]);
    else if (used < 1 || this.strategy === 'burst') return 0;
    else return l.duration / (l.limit - used);
  }

  private async _fetchAppLimitUsage() {
    const appLimits = await this.client.cache.get<number[] | undefined>('limits:app:usage');
    return appLimits ?? [];
  }

  private async _fetchMethodLimitUsage(api: keyof MethodRateLimitConfig, method: string) {
    const methodLimits = await this.client.cache.get<number[] | undefined>(
      `limits:method:${api.toLowerCase()}:${method}:usage`
    );
    return methodLimits ?? [];
  }
}
