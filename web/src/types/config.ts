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
  maps: ConfigConditional;
  challenges: ConfigConditional;
  runes: ConfigConditional;
  summonerSpells: ConfigConditional;
  tftArenas: ConfigConditional;
  tftAugments: ConfigConditional;
  tftChampions: ConfigConditional;
  tftItems: ConfigConditional;
  tftQueues: ConfigConditional;
  tftRegalias: ConfigConditional;
  tftTacticians: ConfigConditional;
  tftTraits: ConfigConditional;
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
   * Whether to cache the fetched data (in-memory).
   *
   * This prevents the client from fetching the same data multiple times.
   * This lowers the load on the CDNs and makes the client faster.
   *
   * Defaults to `true`.
   */
  cache?: boolean;
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
  locale?: string;
  /**
   * The region to fetch all the data from.
   */
  region?: string;
}
