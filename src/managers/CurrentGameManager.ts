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
  async fetch(id: string, options?: FetchOptions) {
    const force = options?.force ?? true;
    const cache = options?.cache ?? false;
    const region = options?.region ?? this.client.region;
    this.client.logger?.trace(`Fetching live game ${id} with options: `, { force, cache, region });
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
          const participantChamps = await this.client.champions.fetchByKeys(data.participants.map((p) => p.championId));
          const bannedChamps = await this.client.champions.fetchByKeys(data.bannedChampions.map((b) => b.championId));
          if (this.client.summonerSpells.cache.size === 0) await this.client.summonerSpells.fetchByName('Flash');
          const runeTrees = await this.client.runes.fetchAll();
          const game = new CurrentGame(this.client, data, bannedChamps.concat(participantChamps), runeTrees);
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
  async fetchFeatured(options?: FetchOptions) {
    const region = options?.region ?? this.client.region;
    this.client.logger?.trace(`Fetching featured games with options: `, { region });
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
        if (this.client.summonerSpells.cache.size === 0) await this.client.summonerSpells.fetchByName('Flash');
        const runeTrees = await this.client.runes.fetchAll();
        const games = [];
        for (const game of data.gameList) {
          const participantChamps = await this.client.champions.fetchByKeys(game.participants.map((p) => p.championId));
          const bannedChamps = await this.client.champions.fetchByKeys(game.bannedChampions.map((b) => b.championId));
          games.push(new CurrentGame(this.client, game, bannedChamps.concat(participantChamps), runeTrees));
        }
        resolve(games);
      }
    });
  }
}
