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
