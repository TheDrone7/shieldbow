import { ICache } from './cache';
import { Locale } from './locale';
import { ILogger, LogLevel } from './logger';
import { Region } from './region';

/**
 * A union type of condition checks.
 *
 * `boolean` - Always true or false.
 * `undefined` - Always false.
 * `function` - A function that takes an object and returns a boolean, per-case checking.
 */
export type ConfigConditional = boolean | undefined | (<T>(obj: T) => boolean);

/**
 * The configuration for the various fetch-able data types.
 */
export interface ManagerConfig {
  champions: ConfigConditional;
  items: ConfigConditional;
  challenges: ConfigConditional;
  runes: ConfigConditional;
  summonerSpells: ConfigConditional;
}

/**
 * The configuration for default options for fetching data.
 */
export interface FetchConfig {
  /**
   * Whether to include the version (and locale) in the URL.
   *
   * For data dragon: true by default.
   * For community dragon: true by default (does not depend on locale).
   * For meraki: false by default (ignored).
   */
  noVersion: ManagerConfig | ConfigConditional;
  /**
   * Whether to cache the fetched data (in-memory).
   *
   * This prevents the client from fetching the same data multiple times.
   * This lowers the load on the CDNs and makes the client faster.
   */
  cache: ManagerConfig | ConfigConditional;
  /**
   * Whether to ignore the cache and force fetching the data from the CDNs.
   */
  ignoreCache: ManagerConfig | ConfigConditional;
}

/**
 * The options for fetching data.
 */
export interface FetchOptions {
  /**
   * Whether to include the version (and locale) in the URL.
   *
   * For data dragon: true by default.
   * For community dragon: true by default (does not depend on locale).
   * For meraki: false by default (ignored).
   */
  noVersion?: boolean;
  /**
   * Whether to cache the fetched data (in-memory).
   *
   * This prevents the client from fetching the same data multiple times.
   * This lowers the load on the CDNs and makes the client faster.
   */
  cache?: boolean;
  /**
   * Whether to ignore the cache and force fetching the data from the CDNs.
   */
  ignoreCache?: boolean;
}

/**
 * The client configuration options.
 */
export interface ClientConfig {
  /**
   * The method to use to fetch data from the APIs.
   *
   * Defaults to using `axios` package.
   *
   * @param url - The URL to fetch.
   * @returns - A promise of the fetched data.
   */
  fetchMethod?: <T>(url: string) => Promise<T>;
  /**
   * Whether to pre-fetch data when initializing the client.
   *
   * This can delay the initialization but makes the rest of the processes much faster.
   *
   * Defaults to `false`.
   */
  prefetch?: ManagerConfig | boolean;
  /**
   * The data dragon CDN version
   *
   * Defaults to latest as per the specified region.
   */
  version?: string;
  /**
   * The locale (language) in which to fetch all the data.
   *
   * Defaults to region's default locale.
   */
  locale?: Locale;
  /**
   * The region to fetch all the data from.
   */
  region?: Region;
  /**
   * The base URLs for the various CDNs shieldbow uses.
   */
  cdn?: {
    /**
     * The base URL for the Data Dragon CDN.
     */
    dDragon?: string;
    /**
     * The base URL for the Community Dragon CDN.
     */
    cDragon?: string;
    /**
     * The base URL for the Meraki Analytics CDN.
     */
    meraki?: string;
  };
  /**
   * The options to use when fetching data.
   */
  defaultFetchOptions?: FetchConfig;

  /**
   * The cache to use for caching data.
   * Defaults to an in-memory cache.
   *
   * Can be set to `false` to disable caching.
   * NOTE: To use this, the `cache` fetch option must be true (defaults to true).
   */
  cache?: ICache | boolean;

  /**
   * The logger settings.
   *
   * Can be set to `false` to disable logging.
   *
   * Can be set to `true` to enable logging with default settings.
   */
  logger?:
    | {
        /**
         * Whether to enable logging.
         * Defaults to `true`.
         */
        enabled?: boolean;
        /**
         * The log level to use for logging (only if using the built-in logger).
         *
         * Defaults to `WARN`
         */
        level?: LogLevel;
        /**
         * The logger to use for logging if you want to use a custom logger.
         * This logger must implement the `ILogger` interface.
         *
         * Ignore to use the built-in logger.
         */
        customLogger?: ILogger;
      }
    | boolean;
}
