import { ClientConfig } from '..';

export function parseClientConfig(config?: ClientConfig): ClientConfig {
  const parsedConfig: ClientConfig = {
    fetchMethod: config?.fetchMethod,
    prefetch: config?.prefetch,
    cache: config?.cache,
    version: config?.version,
    locale: config?.locale,
    region: config?.region
  };

  return parsedConfig;
}
