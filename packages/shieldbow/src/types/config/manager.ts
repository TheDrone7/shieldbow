import { ConfigConditional, ManagerConfig as WebMConfig } from '@shieldbow/web';

export interface ManagerConfig extends WebMConfig {
  account: ConfigConditional;
  challenges: ConfigConditional;
  championMastery: ConfigConditional;
  champions: ConfigConditional;
  clash: ConfigConditional;
  league: ConfigConditional;
  match: ConfigConditional;
  spectator: ConfigConditional;
  summoner: ConfigConditional;
}
