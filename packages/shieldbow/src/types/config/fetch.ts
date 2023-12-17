import { ConfigConditional, Region } from '@shieldbow/web';
import { ManagerConfig } from './manager';

export interface FetchOptions {
  cache: ManagerConfig | ConfigConditional;
  ignoreCache: ManagerConfig | ConfigConditional;
  store: ManagerConfig | ConfigConditional;
  ignoreStorage: ManagerConfig | ConfigConditional;
  region?: Region;
}

export interface FetchConfig {
  cache: ManagerConfig;
  ignoreCache: ManagerConfig;
  store: ManagerConfig;
  ignoreStorage: ManagerConfig;
  region: Region;
}
