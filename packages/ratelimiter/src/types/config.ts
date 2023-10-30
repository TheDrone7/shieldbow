import { ICache } from '@shieldbow/web';

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
}
