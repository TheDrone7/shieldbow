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
