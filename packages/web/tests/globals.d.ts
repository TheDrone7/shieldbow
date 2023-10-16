import type { ClientConfig, FetchOptions } from '../dist';

declare global {
  var clientConfig: ClientConfig;
  var fetchOpts: FetchOptions;
}
