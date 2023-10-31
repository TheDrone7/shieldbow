import type { ICache } from '@shieldbow/cache';
import type { IRateLimit, IRateLimiterConfig, RateLimitStrategy } from 'types';

/**
 * The RateLimiter class.
 */
export class RateLimiter {
  private readonly _cache: ICache;
  private _strategy: RateLimitStrategy;
  private readonly _throwOnLimit: boolean;
  private readonly _keyPrefix: string = 'rl:';

  /**
   * Creates a new RateLimiter instance.
   *
   * @param config - The configuration for the RateLimiter.
   */
  constructor(config: IRateLimiterConfig) {
    this._cache = config.cache;
    this._strategy = config.strategy || 'burst';
    this._throwOnLimit = config.throwOnLimit ?? false;
  }

  /**
   * Set application rate limits.
   *
   * @param header - The header string.
   */
  async setAppLimits(limitHeader: string, countHeader: string) {
    const limits = this.parseRateLimitHeader(limitHeader, countHeader);
    await this._cache.set(`${this._keyPrefix}app:limit`, limits);
  }

  /**
   * Get application rate limits.
   *
   * @returns The app rate limits from the cache.
   */
  async getAppLimits() {
    return await this._cache.get<IRateLimit[]>(`${this._keyPrefix}app:limit`);
  }

  /**
   * Set method rate limit for a specific method.
   * @param method - The method to set the limits for.
   * @param header - The method limit header.
   */
  async setMethodLimits(method: string, limitHeader: string, countHeader: string) {
    const limits = this.parseRateLimitHeader(limitHeader, countHeader);
    await this._cache.set(`${this._keyPrefix}method:${method}:limit`, limits);
  }

  /**
   * Get method rate limit for a specific method.
   * @param method - The method to get the limits for.
   * @returns The method rate limits for the method.
   */
  async getMethodLimits(method: string) {
    return await this._cache.get<IRateLimit[]>(`${this._keyPrefix}method:${method}:limit`);
  }

  /**
   * Parses the rate limit header value.
   *
   * @param header - The header value to parse.
   * @returns The parsed rate limits.
   */
  parseRateLimitHeader(limitHeader: string, countHeader: string): IRateLimit[] {
    const result: IRateLimit[] = [];
    const limits = limitHeader.split(',');
    const counts = countHeader.split(',');
    for (let i = 0; i < limits.length; i++) {
      const limit = parseInt(limits[i].split(':')[0]);
      const duration = parseInt(limits[i].split(':')[1]) * 1000;
      const count = parseInt(counts[i].split(':')[0]);
      const reset = Date.now() + duration;
      result.push({ limit, duration, count, reset });
    }
    return result;
  }

  /**
   * Make the program wait until the rate limit is reset.
   * @returns The time to wait (in ms).
   */
  async waitForAppLimit(): Promise<number> {
    const limits = await this.getAppLimits();
    if (!limits) return 0;
    const waitTimes: number[] = [0];
    for (const limit of limits)
      if (limit.reset < Date.now()) continue;
      else if (limit.count >= limit.limit) {
        if (this._throwOnLimit) throw new Error('[Shieldbow ratelimiter]: Rate limit exceeded.');
        else await new Promise((resolve) => setTimeout(resolve, limit.reset - Date.now()));
        continue;
      } else if (this._strategy === 'spread') {
        const timeRemaining = limit.reset - Date.now();
        const requestsRemaining = limit.limit - limit.count;
        const timePerRequest = timeRemaining / requestsRemaining;
        waitTimes.push(timePerRequest);
      }
    return Math.max(...waitTimes);
  }

  /**
   * Wait for the method limit to reset.
   * @param method - The method to wait for.
   * @returns The time to wait (in ms).
   */
  async waitForMethodLimit(method: string): Promise<number> {
    const limits = await this.getMethodLimits(method);
    if (!limits) return 0;
    const waitTimes: number[] = [0];
    for (const limit of limits)
      if (limit.reset < Date.now()) continue;
      else if (limit.count >= limit.limit) {
        if (this._throwOnLimit) throw new Error('[Shieldbow ratelimiter]: Rate limit exceeded.');
        else await new Promise((resolve) => setTimeout(resolve, limit.reset - Date.now()));
        continue;
      } else if (this._strategy === 'spread') {
        const timeRemaining = limit.reset - Date.now();
        const requestsRemaining = limit.limit - limit.count;
        const timePerRequest = timeRemaining / requestsRemaining;
        waitTimes.push(timePerRequest);
      }
    return Math.max(...waitTimes);
  }

  /**
   * Wait for the app and method limits to reset.
   * @param method - The method to wait for.
   */
  async waitForLimit(method: string) {
    const appWait = await this.waitForAppLimit();
    const methodWait = await this.waitForMethodLimit(method);
    const waitTime = Math.max(appWait, methodWait);
    if (waitTime) await new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
