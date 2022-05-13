import type { Region } from './index';

/**
 * The basic fetching options for various fetch methods in the managers.
 */
export interface FetchOptions {
  /**
   * The region to fetch from. Defaults to the client's region.
   */
  region?: Region;
  /**
   * Whether to ignore the cache and request data from the API. Defaults to false.
   */
  force?: boolean;
  /**
   * Whether to cache the returned data. Defaults to true.
   */
  cache?: boolean;
}
