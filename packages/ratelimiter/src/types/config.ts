import { ICache } from '@shieldbow/cache';

/**
 * Rate limit strategy
 * burst: Allow the maximum number of requests per period to be made at once.
 * spread: Spread the maximum number of requests per period out evenly.
 */
export type RateLimitStrategy = 'burst' | 'spread';

export interface IRateLimiterConfig {
  /**
   * The cache mechanism to use.
   */
  cache: ICache;

  /**
   * The rate limit strategy to use.
   */
  strategy?: RateLimitStrategy;

  /**
   * Whether or not to throw an error when the rate limit is exceeded.
   *
   * If true, an error will be thrown.
   *
   * If false, the program will halt until the rate limit is reset.
   *
   * Defaults to false.
   */
  throwOnLimit?: boolean;
}
