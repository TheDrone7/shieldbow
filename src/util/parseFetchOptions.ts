import type { FetchOptions } from '../types';
import type { Client } from '../client';

type DragonManagerKey = 'champions' | 'items' | 'runes' | 'summonerSpells';
type ApiManagerKey =
  | 'account'
  | 'challenge'
  | 'championMastery'
  | 'clash'
  | 'currentGame'
  | 'league'
  | 'match'
  | 'summoner';

export const parseFetchOptions = (
  client: Client,
  manager: DragonManagerKey | ApiManagerKey,
  options?: FetchOptions
): FetchOptions => {
  // Destructure the options.
  const { region, force, cache, store } = options ?? {};
  const parsed: FetchOptions = {};
  // Region and force are easy.
  parsed.region = region || client.region;
  parsed.force = force ?? false;

  // Cache first prioritizes the specified option, then the client configuration, then the manager default.
  if (typeof cache !== 'undefined') parsed.cache = cache;
  else if (['champions', 'items', 'runes', 'summonerSpells'].includes(manager))
    parsed.cache =
      typeof client.cacheEnabled.dragon === 'boolean'
        ? client.cacheEnabled.dragon
        : client.cacheEnabled.dragon![manager as DragonManagerKey];
  else
    parsed.cache =
      typeof client.cacheEnabled.api === 'boolean'
        ? client.cacheEnabled.api
        : client.cacheEnabled.api![manager as ApiManagerKey];

  // Storage is the same as cache.
  if (typeof store !== 'undefined') parsed.store = store;
  else if (['champions', 'items', 'runes', 'summonerSpells'].includes(manager))
    parsed.store =
      typeof client.storageEnabled.dragon === 'boolean'
        ? client.storageEnabled.dragon
        : client.storageEnabled.dragon![manager as DragonManagerKey];
  else
    parsed.store =
      typeof client.storageEnabled.api === 'boolean'
        ? client.storageEnabled.api
        : client.storageEnabled.api![manager as ApiManagerKey];

  return parsed;
};
