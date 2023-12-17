import { ConfigConditional, ManagerConfig as WebMConfig } from '@shieldbow/web';

export interface CDNOptions {
  dDragon?: string;
  cDragon?: string;
  meraki?: string;
}

export interface WebOptions {
  noVersion?: WebMConfig | ConfigConditional;
  cdn?: CDNOptions;
}
