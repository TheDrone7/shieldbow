import { RateLimitStrategy } from '@shieldbow/ratelimiter';

/**
 * The configuration for the rate limiter.
 */
export interface RateLimiterConfig {
  /**
   * The rate limiting strategy to use.
   */
  strategy?: RateLimitStrategy;
  /**
   * Whether or not to throw an error when the rate limit is exceeded.
   */
  throwOnLimit?: boolean;
  /**
   * Retrying options.
   */
  retry?: {
    /**
     * The number of times to retry a request.
     *
     * 0 means no retries.
     */
    times: number;
    /**
     * The delay between retries.
     *
     * If set to 0, the delay will be automatically detected from headers.
     * This is the default (and recommended behaviour).
     */
    delay: number;
  };
}
