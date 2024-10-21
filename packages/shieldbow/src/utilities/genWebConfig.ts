import { ClientConfig } from 'types';
import { ClientConfig as WebConfig } from '@shieldbow/web';

/**
 * A utility config that generates a @shieldbow/web config from shieldbow config.
 * @param config - The shieldbow config.
 * @returns The @shieldbow/web config.
 */
export function genWebConfig(config: ClientConfig): WebConfig {
  return {
    prefetch: config.prefetch,
    version: config.version,
    locale: config.locale,
    region: config.region,
    cdn: config.web?.cdn,
    defaultFetchOptions: {
      noVersion: config.web?.noVersion,
      cache: config.fetchOptions?.cache,
      ignoreCache: config.fetchOptions?.ignoreCache
    },
    cache: config.cache,
    logger: config.logger
  };
}
