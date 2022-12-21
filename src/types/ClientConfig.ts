import type { ILogger, Locales, LogLevel, Region } from './index';

/**
 * Client's data dragon cache configuration.
 */
export interface CacheConfig {
  /**
   * Whether to store the data fetched from data dragon and other CDNs locally (defaults to `true`)
   */
  enable?: boolean;
  /**
   * The directory where all the data is stored with respect to your project root. (defaults to `data`)
   */
  localRoot?: string;
}

/**
 * Client's pre-fetching data from data dragon configuration
 */
export interface PreFetchConfig {
  /**
   * Whether to fetch the champions' data during initialization.
   */
  champions?: boolean;
  /**
   * Whether to fetch the items' data during initialization.
   */
  items?: boolean;
  /**
   * Whether to fetch the runes' data during initialization.
   */
  runes?: boolean;
  /**
   * Whether to fetch the summoner spells' data during initialization.
   */
  summonerSpells?: boolean;
}

/**
 * Client's logging utility configuration.
 */
export interface LoggerConfig {
  /**
   * Whether to enable logging (defaults to `true`).
   * If set to `false`, all other options are ignored.
   */
  enable?: boolean;
  /**
   * The log level to use (defaults to `WARN`).
   * Only logs with a level equal to or higher than this will be logged.
   */
  level?: LogLevel;
  /**
   * The custom logger to use, if you don't want to use the built-in one.
   * This must implement the `ILogger` interface.
   */
  custom?: ILogger;
}

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
   * The local caching settings.
   * Alternatively, you can pass `true` or `false` to enable or disable caching without configuration.
   */
  cache?: CacheConfig | boolean;
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
