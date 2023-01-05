import type { Locales, Region } from '../index';
import type { CacheConfig } from './CacheConfig';
import type { StorageConfig } from './StorageConfig';
import type { LoggerConfig } from './LoggerConfig';
import type { PreFetchConfig } from './PrefetchConfig';

/**
 * The basic configuration for the shieldbow Client.
 */
export interface ClientConfig {
  /**
   * The client's logger utility configuration.
   * Alternatively, you can pass `true` to use the default logger configuration.
   * Or you can pass `false` to disable logging.
   */
  logger?: LoggerConfig | boolean;
  /**
   * The caching settings.
   * Alternatively, you can pass `true` or `false` to enable or disable caching without further configuration.
   */
  cache?: CacheConfig | boolean;
  /**
   * The storage settings.
   * Alternatively, you can pass `true` or `false` to enable or disable storage without further configuration.
   */
  storage?: StorageConfig | boolean;
  /**
   * The data to fetch beforehand when initializing the client.
   * This can delay the initialization but makes the rest of the processes much faster.
   * Alternatively, you can pass `true` or `false` to enable or disable all the data fetching.
   */
  fetch?: PreFetchConfig | boolean;
  /**
   * The data dragon CDN version (defaults to latest as per the specified region)
   */
  version?: string;
  /**
   * The locale in which to fetch all the data (defaults to region's default)
   */
  locale?: Locales;
  /**
   * The initial region to fetch all the data from (defaults to `na`)
   */
  region?: Region;
}
