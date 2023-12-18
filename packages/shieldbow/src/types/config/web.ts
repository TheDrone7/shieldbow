import { ConfigConditional, ManagerConfig as WebMConfig } from '@shieldbow/web';

/**
 * The config for the client.
 */
export interface CDNOptions {
  /**
   * The data dragon CDN base URL.
   */
  dDragon?: string;
  /**
   * The community dragon CDN base URL.
   */
  cDragon?: string;
  /**
   * The meraki CDN base URL.
   */
  meraki?: string;
}

/**
 * The config for the web client.
 */
export interface WebOptions {
  /**
   * Whether to include the version in URLs when fetchin data.
   */
  noVersion?: WebMConfig | ConfigConditional;
  /**
   * The CDN URLs.
   */
  cdn?: CDNOptions;
}
