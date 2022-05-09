import Collection from '@discordjs/collection';
import type { Region } from '../types';
import type { AxiosResponse } from 'axios';

interface RateLimit {
  limit: number;
  used: number;
  remaining: number;
  duration: number;
  firstAt: number;
}

/**
 * A utility class that handles ratelimits.
 */
export class Ratelimiter {
  private readonly appLimit: Collection<Region, RateLimit[]>;
  private readonly methodLimit: Collection<Region, Collection<string, RateLimit[]>>;

  constructor() {
    this.appLimit = new Collection();
    this.methodLimit = new Collection();
  }

  /**
   * Parse and update ratelimits from a response.
   * @param region - The region the response is from.
   * @param response - The response to parse.
   * @param method - The method the response is for.
   */
  update(region: Region, response: AxiosResponse, method: string) {
    const { headers } = response;

    if (!headers['x-app-rate-limit']) return;
    if (!headers['x-app-rate-limit-count']) return;
    if (!headers['x-method-rate-limit']) return;
    if (!headers['x-method-rate-limit-count']) return;

    const appLimitHeader = headers['x-app-rate-limit'].split(',').map((limit) => ({
      max: Number(limit.split(':')[0]),
      duration: Number(limit.split(':')[1]) * 1000
    }));
    const appLimitCountHeader = headers['x-app-rate-limit-count'].split(',').map((limit) => ({
      count: Number(limit.split(':')[0]),
      duration: Number(limit.split(':')[1]) * 1000
    }));
    const methodLimitHeader = headers['x-method-rate-limit'].split(',').map((limit) => ({
      max: Number(limit.split(':')[0]),
      duration: Number(limit.split(':')[1]) * 1000
    }));
    const methodLimitCountHeader = headers['x-method-rate-limit-count'].split(',').map((limit) => ({
      count: Number(limit.split(':')[0]),
      duration: Number(limit.split(':')[1]) * 1000
    }));

    const newAppLimits = [];
    const newMethodLimits = [];

    for (const appLimit of appLimitHeader) {
      const existing = this.appLimit.get(region)?.find((l) => l.duration === appLimit.duration);
      const count = appLimitCountHeader.find((limit) => limit.duration === appLimit.duration)!.count;

      const existingTime = existing?.firstAt || Date.now();

      const rateLimit: RateLimit = {
        limit: appLimit.max,
        used: count,
        remaining: appLimit.max - count,
        duration: appLimit.duration,
        firstAt: count === 1 ? Date.now() : existingTime
      };
      newAppLimits.push(rateLimit);
    }

    for (const methodLimit of methodLimitHeader) {
      const existing = this.methodLimit
        .get(region)
        ?.get(method)
        ?.find((l) => l.duration === methodLimit.duration);
      const count = methodLimitCountHeader.find((limit) => limit.duration === methodLimit.duration)!.count;

      let existingTime = existing?.firstAt || Date.now();

      if (headers['retry-after'])
        existingTime = Date.now() + Number(headers['retry-after']) * 1000 - methodLimit.duration;

      const rateLimit: RateLimit = {
        limit: methodLimit.max,
        used: count,
        remaining: methodLimit.max - count,
        duration: methodLimit.duration,
        firstAt: count === 1 ? Date.now() : existingTime
      };
      newMethodLimits.push(rateLimit);
    }

    this.appLimit.set(region, newAppLimits);
    if (!this.methodLimit.has(region)) this.methodLimit.set(region, new Collection());
    const existingMethodLimits = this.methodLimit.get(region)!;
    existingMethodLimits.set(method, newMethodLimits);
    this.methodLimit.set(region, existingMethodLimits);
  }

  /**
   * Verify if the request is going beyond the ratelimit.
   * @param region - The region the request is for.
   * @param method - The method the request is for.
   */
  verify(region: Region, method: string): { pass: boolean; wait: number } {
    const appLimits = this.appLimit.get(region);
    const methodLimits = this.methodLimit.get(region)?.get(method);

    let optimalWait = 0;

    if (!appLimits || !methodLimits) return { pass: true, wait: optimalWait };
    else if (appLimits.length === 0 || methodLimits.length === 0) return { pass: true, wait: optimalWait };
    else {
      for (const limit of appLimits) {
        const endTime = limit.firstAt + limit.duration;
        optimalWait = Math.min(optimalWait, endTime > Date.now() ? (endTime - Date.now()) / limit.remaining : 0);
        if (limit.remaining === 0 && limit.firstAt + limit.duration > Date.now())
          return { pass: false, wait: Date.now() - (limit.firstAt + limit.duration) };
        const newLimits = appLimits.map((l) => ({ ...l, used: l.used + 1, remaining: l.remaining - 1 }));
        this.appLimit.set(region, newLimits);
      }
      for (const limit of methodLimits) {
        const endTime = limit.firstAt + limit.duration;
        optimalWait = Math.min(optimalWait, endTime > Date.now() ? (endTime - Date.now()) / limit.remaining : 0);
        if (limit.remaining === 0 && limit.firstAt + limit.duration > Date.now())
          return { pass: false, wait: Date.now() - (limit.firstAt + limit.duration) };
        const newLimits = methodLimits.map((l) => ({ ...l, used: l.used + 1, remaining: l.remaining - 1 }));
        const existingMethods = this.methodLimit.get(region)!;
        existingMethods.set(method, newLimits);
        this.methodLimit.set(region, existingMethods);
      }
    }

    return { pass: true, wait: optimalWait };
  }
}
