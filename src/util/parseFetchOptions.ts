import type { FetchOptions } from '../types';
import type { Client } from '../client';

/**
 * List of managers that interact with DDragon/CDragon.
 */
export type DragonManagerKey = 'champions' | 'items' | 'runes' | 'summonerSpells';
/**
 * List of managers that interact with the API.
 */
export type ApiManagerKey =
  | 'account'
  | 'challenge'
  | 'championMastery'
  | 'clash'
  | 'currentGame'
  | 'league'
  | 'match'
  | 'summoner';

/**
 * A utility for parsing the fetch options using request specific, client config and default settings.
 */
export const parseFetchOptions = (
  client: Client,
  manager: DragonManagerKey | ApiManagerKey,
  options?: FetchOptions
): FetchOptions => {
  // Destructure the options.
  const { region, ignoreCache, ignoreStorage, cache, store } = options ?? {};
  let parsedCache: boolean;
  let parsedStore: boolean;
  const parsed: FetchOptions = {};
  // Region and force are easy.
  parsed.region = region || client.region;

  // Cache first prioritizes the specified option, then the client configuration, then the manager default.
  if (['champions', 'items', 'runes', 'summonerSpells'].includes(manager))
    parsedCache =
      typeof client.cacheEnabled.dragon === 'boolean'
        ? client.cacheEnabled.dragon
        : client.cacheEnabled.dragon![manager as DragonManagerKey]!;
  else
    parsedCache =
      typeof client.cacheEnabled.api === 'boolean'
        ? client.cacheEnabled.api
        : client.cacheEnabled.api![manager as ApiManagerKey]!;

  // Storage is the same as cache.
  if (['champions', 'items', 'runes', 'summonerSpells'].includes(manager))
    parsedStore =
      typeof client.storageEnabled.dragon === 'boolean'
        ? client.storageEnabled.dragon
        : client.storageEnabled.dragon![manager as DragonManagerKey]!;
  else
    parsedStore =
      typeof client.storageEnabled.api === 'boolean'
        ? client.storageEnabled.api
        : client.storageEnabled.api![manager as ApiManagerKey]!;

  parsed.store = store ?? parsedStore;
  parsed.cache = cache ?? parsedCache;

  parsed.ignoreCache = ignoreCache ?? !parsedCache;
  parsed.ignoreStorage = ignoreStorage ?? !parsedStore;

  return parsed;
};
