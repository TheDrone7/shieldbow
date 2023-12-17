import { ClientConfig, WebOptions } from 'types';
import { ShieldbowMemoryCache } from '@shieldbow/cache';
import { constants } from '@shieldbow/web';
import { parseFetchOpts } from './parseFetchOpts';

export function parseWebConfig(config?: WebOptions): WebOptions {
  const parsed: WebOptions = {};

  parsed.cdn = {
    dDragon: config?.cdn?.dDragon || constants.defaultDDragonBase,
    cDragon: config?.cdn?.cDragon || constants.defaultCDragonBase,
    meraki: config?.cdn?.meraki || constants.defaultMerakiABase
  };

  parsed.noVersion = config?.noVersion || false;

  return parsed;
}

export function parseClientConfig(config: ClientConfig): ClientConfig {
  const parsed: ClientConfig = {};

  // Parse the cache options
  if (config.cache !== undefined && typeof config.cache === 'object') parsed.cache = config.cache!;
  else if (config.cache === undefined || config.cache === true) new ShieldbowMemoryCache();
  else if (config.cache === false) parsed.cache = undefined;

  // Parse the logger options
  if (config.logger === false) parsed.logger = undefined;
  else if (config.logger === true || config.logger === undefined) parsed.logger = { enabled: true, level: 'WARN' };
  else if (config.logger !== undefined && typeof config.logger === 'object') parsed.logger = config.logger!;

  // Parse the web options
  if (config.locale === undefined) parsed.locale = 'en_US';
  if (config.region === undefined) parsed.region = 'na';

  parsed.web = parseWebConfig(config.web);

  parsed.fetchOptions = parseFetchOpts(config.fetchOptions);
  parsed.fetchOptions.region = parsed.region;

  parsed.fetchMethod = config.fetchMethod;
  parsed.prefetch = config.prefetch;

  return parsed;
}
