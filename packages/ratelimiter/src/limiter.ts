import type { ICache } from '@shieldbow/web';
import type { IRateLimit, ILimitUsage, IRateLimiterConfig, RateLimitStrategy } from 'types';

/**
 * The RateLimiter class.
 */
export class RateLimiter {
  private readonly _cache: ICache;
  private _strategy: RateLimitStrategy;
  private readonly _keyPrefix: string = 'shieldbow:ratelimit:';

  /**
   * Creates a new RateLimiter instance.
   *
   * @param config - The configuration for the RateLimiter.
   */
  constructor(config: IRateLimiterConfig) {
    this._cache = config.cache;
    this._strategy = config.strategy || 'burst';
  }

  /**
   * Set application rate limits.
   *
   * @param header - The header string.
   */
  async setAppLimits(header: string) {
    const limits = this.parseRateLimitHeader(header);
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
  async setMethodLimits(method: string, header: string) {
    const limits = this.parseRateLimitHeader(header);
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
   * Fetch the limit from the cache.
   * @returns The number of requests that have been made for the app.
   */
  async getAppUsage() {
    return await this._cache.get<ILimitUsage[]>(`${this._keyPrefix}app:usage`);
  }

  /**
   * Get method usage for a specific method.
   *
   * @param method - The method to get the limits for.
   * @returns The number of requests that have been made for the method.
   */
  async getMethodUsage(method: string) {
    return await this._cache.get<ILimitUsage[]>(`${this._keyPrefix}method:${method}:usage`);
  }

  /**
   * Set the app limit usage.
   *
   * @param usage - The usages to set.
   */
  async setAppUsage(usage: ILimitUsage[]) {
    await this._cache.set(`${this._keyPrefix}app:usage`, usage);
  }

  /**
   * Set method usage for a specific method.
   *
   * @param method - The method to set the usage for.
   * @param usage - The usages to set.
   */
  async setMethodUsage(method: string, usage: ILimitUsage[]) {
    await this._cache.set(`${this._keyPrefix}method:${method}:usage`, usage);
  }

  /**
   * Parses the rate limit header value.
   *
   * @param header - The header value to parse.
   * @returns The parsed rate limits.
   */
  parseRateLimitHeader(header: string): IRateLimit[] {
    return header.split(',').map((limit) => ({
      limit: parseInt(limit.split(':')[0]),
      duration: parseInt(limit.split(':')[1])
    }));
  }

  async waitForAppLimit() {}
}
