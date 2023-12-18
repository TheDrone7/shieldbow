import { ConfigConditional, ManagerConfig as WebMConfig } from '@shieldbow/web';

/**
 * Managers config - to allow separate config for each of the various managers.
 */
export interface ManagerConfig extends WebMConfig {
  /**
   * The config for the account manager.
   */
  account: ConfigConditional;
  /**
   * The config for the challenges manager.
   */
  challenges: ConfigConditional;
  /**
   * The config for the champion mastery manager.
   */
  championMastery: ConfigConditional;
  /**
   * The config for the champion manager.
   */
  champions: ConfigConditional;
  /**
   * The config for the clash manager.
   */
  clash: ConfigConditional;
  /**
   * The config for the league manager.
   */
  league: ConfigConditional;
  /**
   * The config for the match manager.
   */
  match: ConfigConditional;
  /**
   * The config for the spectator manager.
   */
  spectator: ConfigConditional;
  /**
   * The config for the summoner manager.
   */
  summoner: ConfigConditional;
}
