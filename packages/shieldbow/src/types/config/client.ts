import { ICache } from '@shieldbow/cache';
import { ILogger, Locale, Region, LogLevel, ManagerConfig as WebMConfig } from '@shieldbow/web';
import { WebOptions } from './web';
import { ClientFetchOptions } from './fetch';
import { RateLimiterOptions } from './ratelimiter';
import { ClientStorageConfig } from './storage';

/**
 * The config for the client.
 */
export interface ClientConfig {
  /**
   * The cache to use for caching data.
   * Defaults to an in-memory cache.
   *
   * NOTE: To use this, the `cache` fetch option must be true (defaults to true).
   */
  cache?: ICache;
  /**
   * The storage to use for storing data.
   */
  storage?: ClientStorageConfig;
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
  /**
   * The data dragon CDN version.
   *
   * Defaults to the latest version as per the region.
   */
  version?: string;
  /**
   * The locale to use for fetching data.
   *
   * Defaults to the locale of the region.
   */
  locale?: Locale;
  /**
   * The region to fetch all the data from.
   *
   * Defaults to `na`.
   */
  region?: Region;
  /**
   * The config for web-based parts of shieldbow.
   *
   * This includes champions, items, runes and summoner spells.
   */
  web?: WebOptions;
  /**
   * Default fetch options to use.
   */
  fetchOptions?: ClientFetchOptions;
  /**
   * Whether to pre-fetch data when initializing the client.
   *
   * This can delay initialization but considerably speeds up the rest of the program.
   *
   * Defaults to `false`.
   */
  prefetch?: WebMConfig | boolean;
  /**
   * The options to use for the rate limiter.
   */
  ratelimit?: RateLimiterOptions;
}
