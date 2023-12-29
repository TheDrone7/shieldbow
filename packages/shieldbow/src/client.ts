import { Client as WebClient } from '@shieldbow/web';
import { ClientConfig, ClientFetchConfig, RequestOptions } from 'types';
import { parseClientConfig, genWebConfig, divideToManager, apiBaseURLs, regionalURLs, seaRegions } from 'utilities';
import { RateLimiter } from '@shieldbow/ratelimiter';
import { ICache, ShieldbowMemoryCache } from '@shieldbow/cache';
import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import { ShieldbowError } from './error';
import { IStorage } from '@shieldbow/storage';

/**
 * The shieldbow client class.
 */
export class Client extends WebClient {
  #defaultFetchConfig: ClientFetchConfig;
  #apiKey: string;
  #rateLimiter: RateLimiter;
  #http: AxiosInstance;
  #storage: IStorage;

  /**
   * Create a new shieldbow client.
   */
  constructor(apiKey: string) {
    super();
    this.#defaultFetchConfig = {
      cache: divideToManager(true),
      store: divideToManager(true),
      ignoreCache: divideToManager(false),
      ignoreStorage: divideToManager(false),
      region: 'na'
    };

    const keyRegex = /RGAPI-[0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12}/i;
    const isMatch = keyRegex.test(apiKey);
    if (!isMatch) throw new Error('Shieldbow:: Invalid API key provided.');
    this.#apiKey = apiKey;

    this.#rateLimiter = new RateLimiter({
      cache: new ShieldbowMemoryCache()
    });

    this.#http = axios.create({
      headers: {
        'X-Riot-Token': this.#apiKey,
        'Content-Type': 'application/json'
      },
      responseType: 'json',
      validateStatus: () => true
    });

    this.#storage = undefined!;
  }

  /**
   * The default options to use when fetching anything.
   */
  get defaultOpts() {
    this.ensureInitialized();
    return this.#defaultFetchConfig;
  }

  /**
   * The storage to use for storing data (if enabled).
   */
  get storage() {
    this.ensureInitialized();
    return this.#storage;
  }

  /**
   * Initialize the client for usage.
   */
  async initialize(config: ClientConfig = {}) {
    const parsedConfig = parseClientConfig(config);
    const webConfig = genWebConfig(parsedConfig);
    await super.initialize(webConfig);

    this.#rateLimiter = new RateLimiter({
      cache: parsedConfig.cache === undefined ? new ShieldbowMemoryCache() : (parsedConfig.cache as ICache)
    });

    axiosRetry(this.#http, {
      retries: config.ratelimit?.retry?.times ?? 0,
      retryCondition: (error) => (error.response?.status ?? 501) % 500 < 100,
      retryDelay: () => config.ratelimit?.retry?.delay ?? 3000
    });

    if (parsedConfig.storage?.custom !== undefined) this.#storage = parsedConfig.storage.custom;
    else {
      const { ShieldbowLocalStorage } = await import('@shieldbow/storage');
      this.#storage = new ShieldbowLocalStorage(parsedConfig.storage?.config);
    }

    this._fetcher = async <T>(url: string, debugMessage?: string, method: string = '') => {
      const response = await this.#http.get(url);
      const { status, data, headers } = response;

      // Check for errors
      if (status !== 200) throw new ShieldbowError(debugMessage ?? 'Fetching data', status);

      // Update rate limits
      if (headers['x-app-rate-limit'] !== undefined)
        this.#rateLimiter.setAppLimits(headers['x-app-rate-limit'], headers['x-app-rate-limit-count']);
      if (headers['x-method-rate-limit'] !== undefined)
        this.#rateLimiter.setMethodLimits(method, headers['x-method-rate-limit'], headers['x-method-rate-limit-count']);

      return data as T;
    };
  }

  /**
   * The fetcher to use for fetching data.
   *
   * This throws errors and updates rate limits.
   */
  get fetch() {
    return this._fetcher;
  }

  /**
   * Make a request to the Riot API.
   *
   * This throws errors and updates rate limits.
   */
  async request<T>(url: string, opts: RequestOptions) {
    let reqRegion = opts.region ?? this.defaultOpts.region ?? this.region;
    const reqRegional = opts.regional ?? false;
    const reqMethod = `${reqRegion}-${opts.method}`;

    // Check for rate limits
    await this.#rateLimiter.waitForLimit(reqMethod);

    // Additional check for SEA regions for account-v1 endpoints
    if (url.includes('account/v1') && seaRegions.includes(reqRegion)) reqRegion = 'jp'; // JP = ASIA
    const baseUrl = reqRegional ? regionalURLs[reqRegion] : apiBaseURLs[reqRegion];
    if (baseUrl === undefined) throw new Error('Shieldbow:: Invalid region provided.');

    const requestUrl = `${baseUrl}${url}`;
    return (await this.fetch<T>(requestUrl)) as T;
  }
}
