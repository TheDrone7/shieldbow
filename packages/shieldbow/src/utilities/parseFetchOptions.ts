import { Client } from 'client';
import { FetchOptions, ManagerConfig } from 'types';
import { ManagerConfig as WebMConfig } from '@shieldbow/web';

/**
 * Parses the per-request fetch options.
 * @param client - The client making the request.
 * @param manager - The manager of the client handling the request.
 * @param opts - The manual options passed to the request.
 * @returns - The parsed options.
 */
export const parseFetchOptions = (client: Client, manager: keyof ManagerConfig, opts?: FetchOptions): FetchOptions => {
  const cNoV =
    typeof client.defaultFetchOptions.noVersion === 'object'
      ? client.defaultFetchOptions.noVersion[manager as keyof WebMConfig]
      : client.defaultFetchOptions.noVersion;
  return {
    cache: opts?.cache ?? client.defaultOpts.cache[manager] ?? true,
    ignoreCache: opts?.ignoreCache ?? client.defaultOpts.ignoreCache[manager] ?? false,
    store: opts?.store ?? client.defaultOpts.store[manager] ?? true,
    ignoreStorage: opts?.ignoreStorage ?? client.defaultOpts.ignoreStorage[manager] ?? false,
    region: opts?.region ?? client.defaultOpts.region ?? 'na',
    noVersion: opts?.noVersion ?? cNoV ?? false
  };
};
