/**
 * The rate limit for a given period.
 */
export interface IRateLimit {
  /**
   * The maximum number of requests allowed in the current period.
   */
  limit: number;

  /**
   * The time period in milliseconds.
   */
  duration: number;
}

/**
 * The usage of a given rate limit.
 */
export interface ILimitUsage {
  /**
   * The number of requests that have been made.
   */
  count: number;

  /**
   * The time (in milliseconds) in which this should be reset.
   */
  reset: number;

  /**
   * The time period in milliseconds for the limit (to associate with the limits).
   */
  duration: number;
}
