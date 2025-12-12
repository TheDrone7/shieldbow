import { RateLimitStrategy } from '@shieldbow/ratelimiter';

/**
 * The retrial configuration for the client.
 */
export interface RetrialConfig {
  /**
   * The number of times to retry a request.
   *
   * 0 means no retries (default).
   */
  times: number;
  /**
   * The delay between retries.
   *
   * If set to 0, the delay will be automatically detected from headers.
   * This is the default (and recommended behaviour).
   */
  delay: number;
}

/**
 * The configuration for the rate limiter.
 */
export interface RateLimiterOptions {
  /**
   * The rate limiting strategy to use.
   */
  strategy?: RateLimitStrategy;
  /**
   * Whether or not to throw an error when the rate limit is exceeded.
   */
  throwOnLimit?: boolean;
  /**
   * Retrying options (this is only for 5XX responses).
   *
   * That is, if the server is unable to handle the request for any reason.
   * If there is a 4XX response (issue was on user end), it will not retry.
   */
  retry?: RetrialConfig;
}
