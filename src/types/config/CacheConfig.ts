import type { ManagersConfig } from './ManagersConfig';
import type { ICache } from '../index';

/**
 * Client's caching plugin configuration.
 */
export interface CacheConfig {
  /**
   * Whether to enable caching of fetched data (defaults to true for all).
   * Can be set to true to enable for all, or false to disable for all.
   */
  enable?: boolean | ManagersConfig;
  /**
   * The custom cache plugin to use. This will override the default memory cache plugin.
   */
  custom?: ICache;
}
