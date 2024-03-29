import { ConfigConditional, Region } from '@shieldbow/web';

/**
 * Per-request fetch options.
 */
export interface FetchOptions {
  /**
   * Whether or not to cache the fetched data.
   */
  cache?: ConfigConditional;
  /**
   * Whether or not to ignore the cache before fetching data.
   */
  ignoreCache?: ConfigConditional;
  /**
   * Whether or not to store the fetched data.
   */
  store?: ConfigConditional;
  /**
   * Whether or not to ignore the storage before fetching data.
   */
  ignoreStorage?: ConfigConditional;
  /**
   * The region to fetch the data from.
   */
  region?: Region;
  /**
   * Whether or not to include the version when generating the URL.
   *
   * (This is only used for the data dragon and community dragon URLs)
   */
  noVersion?: ConfigConditional;
}
