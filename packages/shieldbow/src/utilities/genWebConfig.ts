import { ClientConfig } from 'types';
import { ClientConfig as WebConfig } from '@shieldbow/web';

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
