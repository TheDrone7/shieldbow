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

  /**
   * The number of requests that have been made.
   */
  count: number;

  /**
   * The timestamp at which this should be reset.
   */
  reset: number;
}
