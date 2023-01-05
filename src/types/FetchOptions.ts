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
   * Whether to ignore the cache and request data from the storage / API. Defaults to false.
   */
  ignoreCache?: boolean;
  /**
   * Whether to ignore the storage and request data from the API. Defaults to false.
   */
  ignoreStorage?: boolean;
  /**
   * Whether to cache the returned data. Defaults to client configuration.
   */
  cache?: boolean;
  /**
   * Whether to store the returned data in the database. Defaults to client configuration.
   */
  store?: boolean;
}
