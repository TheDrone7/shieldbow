import { ConfigConditional } from '@shieldbow/web';
import { ClientFetchConfig, ClientFetchOptions, ManagerConfig } from 'types';

export function divideToManager(opts: ManagerConfig | ConfigConditional): ManagerConfig {
  if (typeof opts !== 'object')
    return {
      account: opts,
      challenges: opts,
      champions: opts,
      championMastery: opts,
      clash: opts,
      league: opts,
      match: opts,
      spectator: opts,
      summoner: opts,
      summonerSpells: opts,
      items: opts,
      runes: opts
    };

  return opts;
}

export function parseFetchOpts(opts?: ClientFetchOptions): ClientFetchConfig {
  return {
    cache: divideToManager(opts?.cache),
    ignoreCache: divideToManager(opts?.ignoreCache),
    store: divideToManager(opts?.store),
    ignoreStorage: divideToManager(opts?.ignoreStorage),
    region: opts?.region || 'na'
  };
}
