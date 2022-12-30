import type { ICache, IStorage, ILogger, Locales, LogLevel, Region } from './index';

/**
 * Managers configuration is a means to enable/disable storage/caching of the library across the different managers.
 */
export interface ManagersConfig {
  /**
   * Whether to enable cache/storage for the DDragon/CDragon json data.
   * Can be set to true to enable for all, or false to disable for all.
   */
  dragon?:
    | boolean
    | {
        /**
         * Whether to enable cache/storage for the DDragon/CDragon champions json data.
         */
        champions?: boolean;
        /**
         * Whether to enable cache/storage for the DDragon/CDragon items json data.
         */
        items?: boolean;
        /**
         * Whether to enable cache/storage for the DDragon/CDragon rune(tree)s json data.
         */
        runes?: boolean;
        /**
         * Whether to enable cache/storage for the DDragon/CDragon summoner spells json data.
         */
        summonerSpells?: boolean;
      };
  /**
   * Whether to enable cache/storage for the API (requires API key) data.
   * Can be set to true to enable for all, or false to disable for all.
   */
  api?:
    | boolean
    | {
        /**
         * Whether to enable cache/storage for the RIOT accounts.
         */
        account?: boolean;
        /**
         * Whether to enable cache/storage for the challenges.
         */
        challenge?: boolean;
        /**
         * Whether to enable cache/storage for the champion mastery.
         */
        championMastery?: boolean;
        /**
         * Whether to enable cache/storage for the clash tournaments.
         */
        clash?: boolean;
        /**
         * Whether to enable cache/storage for live games.
         */
        currentGame?: boolean;
        /**
         * Whether to enable cache/storage for the league entries.
         */
        league?: boolean;
        /**
         * Whether to enable cache/storage for the matches.
         */
        match?: boolean;
        /**
         * Whether to enable cache/storage for the summoners.
         */
        summoner?: boolean;
      };
}

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

/**
 * Client's storage plugin configuration.
 */
export interface StorageConfig {
  /**
   * Whether to enable storing fetched data.
   * Can be set to true to enable for all, or false to disable for all.
   *
   * By default, this is enabled for DDragon/CDragon data, and disabled for API data.
   */
  enable?: boolean | ManagersConfig;
  /**
   * The root directory for the local storage plugin. Defaults to 'data'.
   * This will be ignored if a custom storage plugin is used.
   */
  root?: string;
  /**
   * The custom storage plugin to use. This will override the default local storage plugin.
   */
  custom?: IStorage;
}

/**
 * Client's pre-fetching data from data dragon configuration.
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
