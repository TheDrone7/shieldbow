import { Client } from 'client';
import { ConfigConditional, FetchOptions } from 'types/config';

/**
 * The key of a manager.
 */
export type ManagerKey = 'champions' | 'items' | 'runes' | 'summonerSpells' | 'challenges';

/**
 * A utility function to parse fetch options.
 * @param client - The client to use.
 * @param manager - The manager to use.
 * @param options - The options to parse.
 * @returns The parsed options.
 */
export function parseFetchOptions(client: Client, manager: ManagerKey, options?: FetchOptions): FetchOptions {
  let noVersionValue = options?.noVersion;
  let cacheValue = options?.cache;
  let ignoreCacheValue = options?.ignoreCache;

  if (noVersionValue === undefined) {
    const noVersionConditional: ConfigConditional =
      typeof client.defaultFetchOptions.noVersion === 'object'
        ? client.defaultFetchOptions.noVersion[manager]
        : client.defaultFetchOptions.noVersion;

    if (typeof noVersionConditional === 'function') noVersionValue = noVersionConditional(manager);
    else if (typeof noVersionConditional === 'boolean') noVersionValue = noVersionConditional;
    else noVersionValue = false;
  }

  if (cacheValue === undefined) {
    const cacheConditional: ConfigConditional =
      typeof client.defaultFetchOptions.cache === 'object'
        ? client.defaultFetchOptions.cache[manager]
        : client.defaultFetchOptions.cache;

    if (typeof cacheConditional === 'function') cacheValue = cacheConditional(manager);
    else if (typeof cacheConditional === 'boolean') cacheValue = cacheConditional;
    else cacheValue = true;
  }

  if (ignoreCacheValue === undefined) {
    const ignoreCacheConditional: ConfigConditional =
      typeof client.defaultFetchOptions.ignoreCache === 'object'
        ? client.defaultFetchOptions.ignoreCache[manager]
        : client.defaultFetchOptions.ignoreCache;

    if (typeof ignoreCacheConditional === 'function') ignoreCacheValue = ignoreCacheConditional(manager);
    else if (typeof ignoreCacheConditional === 'boolean') ignoreCacheValue = ignoreCacheConditional;
    else ignoreCacheValue = false;
  }

  return {
    noVersion: noVersionValue,
    cache: cacheValue,
    ignoreCache: ignoreCacheValue
  };
}
