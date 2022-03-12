import type { Locales, Region } from './index';

/**
 * The basic configuration for the league.ts Client.
 */
export interface ClientConfig {
  /**
   * The local caching settings.
   */
  cache?: {
    /**
     * Whether to store the data fetched from data dragon and other CDNs locally (defaults to `true`)
     */
    enable?: boolean;
    /**
     * The directory where all the data is stored with respect to your project root. (defaults to `data`)
     */
    localRoot?: string;
  };
  /**
   * The data to fetch beforehand when initializing the client.
   * This can delay the initialization but makes the rest of the processes much faster.
   */
  fetch?: {
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
  };
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
