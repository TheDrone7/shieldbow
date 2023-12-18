import { ConfigConditional, Region } from '@shieldbow/web';
import { ManagerConfig } from './manager';

/**
 * The fetch options (to be provided by the user).
 */
export interface FetchOptions {
  /**
   * Whether or not to cache the fetched data.
   */
  cache?: ManagerConfig | ConfigConditional;
  /**
   * Whether or not to ignore the cache before fetching data.
   */
  ignoreCache?: ManagerConfig | ConfigConditional;
  /**
   * Whether or not to store the fetched data.
   */
  store?: ManagerConfig | ConfigConditional;
  /**
   * Whether or not to ignore the storage before fetching data.
   */
  ignoreStorage?: ManagerConfig | ConfigConditional;
  /**
   * The region to fetch the data from.
   */
  region?: Region;
}

/**
 * The fetch config (to be used internally).
 */
export interface FetchConfig {
  /**
   * Whether or not to cache the fetched data.
   */
  cache: ManagerConfig;
  /**
   * Whether or not to ignore the cache before fetching data.
   */
  ignoreCache: ManagerConfig;
  /**
   * Whether or not to store the fetched data.
   */
  store: ManagerConfig;
  /**
   * Whether or not to ignore the storage before fetching data.
   */
  ignoreStorage: ManagerConfig;
  /**
   * The region to fetch the data from.
   */
  region: Region;
}
