import type { BaseManager, CurrentGameData, FetchOptions } from '../types';
import type { Client } from '../client';
import { CurrentGame } from '../structures';
import { Collection } from '@discordjs/collection';

/**
 * A current game manager - to fetch and manage the live games.
 */
export class CurrentGameManager implements BaseManager<CurrentGame> {
  /**
   * The cached live games (mapped by summoner IDs).
   *
   * Only use this if you absolutely must.
   * Prioritize using
   * {@link CurrentGameManager.fetch | fetch} or
   * {@link CurrentGameManager.fetchFeatured | fetchFeatured}
   * instead.
   */
  readonly cache: Collection<string, CurrentGame>;
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;

  /**
   * Creates a new current game manager.
   * @param client - The client that instantiated the manager.
   */
  constructor(client: Client) {
    this.cache = new Collection<string, CurrentGame>();
    this.client = client;
  }

  /**
   * Fetches the live game for the given summoner ID.
   *
   * This method is a special case where the cache is ignored by default.
   *
   * @param id - The summoner ID to fetch the live game for.
   * @param options - The basic fetching options.
   */
  fetch(id: string, options?: FetchOptions) {
    const force = options?.force ?? true;
    const cache = options?.cache ?? false;
    const region = options?.region ?? this.client.region;
    return new Promise<CurrentGame>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/spectator/v4/active-games/by-summoner/' + id, {
            region,
            regional: false,
            name: 'Current match by summoner ID',
            params: 'Summoner ID: ' + id
          })
          .catch(reject);
        if (response) {
          const data = <CurrentGameData>response.data;
          await this.client.champions.fetchByKeys(data.participants.map((p) => p.championId));
          if (this.client.items.cache.size === 0) await this.client.items.fetch('1001');
          if (this.client.summonerSpells.cache.size === 0) await this.client.summonerSpells.findByName('Flash');
          if (this.client.runes.cache.size === 0) await this.client.runes.fetch('Domination');
          const game = new CurrentGame(this.client, data);
          if (cache) this.cache.set(id, game);
          resolve(game);
        }
      }
    });
  }

  /**
   * Fetch a list of featured games.
   * These games are not cached.
   *
   * @param options - The basic fetching options (force and cache are ignored).
   */
  fetchFeatured(options?: FetchOptions) {
    const region = options?.region ?? this.client.region;
    return new Promise<CurrentGame[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest('/lol/spectator/v4/featured-games', {
          region,
          regional: false,
          name: 'Featured matches',
          params: 'no params'
        })
        .catch(reject);
      if (response) {
        const data = <{ gameList: CurrentGameData[] }>response.data;
        for (const game of data.gameList)
          await this.client.champions.fetchByKeys(game.participants.map((p) => p.championId));
        if (this.client.items.cache.size === 0) await this.client.items.fetch('1001');
        if (this.client.summonerSpells.cache.size === 0) await this.client.summonerSpells.findByName('Flash');
        if (this.client.runes.cache.size === 0) await this.client.runes.fetch('Domination');
        const games = response.data.gameList.map((g: CurrentGameData) => new CurrentGame(this.client, g));
        resolve(games);
      }
    });
  }
}
