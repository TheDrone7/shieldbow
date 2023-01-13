import type { BaseManager, CurrentGameData, FetchOptions } from '../types';
import type { Client } from '../client';
import { CurrentGame } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A current game manager - to fetch and manage the live games.
 */
export class CurrentGameManager implements BaseManager<CurrentGame> {
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;

  /**
   * Creates a new current game manager.
   * @param client - The client that instantiated the manager.
   */
  constructor(client: Client) {
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
    const opts = parseFetchOptions(this.client, 'currentGame', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching live game ${id} with options: `, opts);
    return new Promise<CurrentGame>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`spectator:${id}`);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(`spectator:${id}`)!);
      else {
        const storage = this.client.storage.fetch<CurrentGameData>('spectator', id);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) {
          const champs = await this.client.champions.fetchByKeys(stored.participants.map((p) => p.championId));
          const banned = await this.client.champions.fetchByKeys(stored.bannedChampions.map((b) => b.championId));
          const runeTrees = await this.client.runes.fetchAll();
          const spells = await this.client.summonerSpells.fetchAll();
          const result = new CurrentGame(this.client, stored, banned.concat(champs), runeTrees, spells);
          if (cache) await this.client.cache.set(`spectator:${id}`, result);
          resolve(result);
        } else {
          const response = await this.client.api
            .makeApiRequest('/lol/spectator/v4/active-games/by-summoner/' + id, {
              region: region!,
              regional: false,
              name: 'Current match by summoner ID',
              params: 'Summoner ID: ' + id
            })
            .catch(reject);
          if (response) {
            const data = <CurrentGameData>response.data;
            const champs = await this.client.champions.fetchByKeys(data.participants.map((p) => p.championId));
            const banned = await this.client.champions.fetchByKeys(data.bannedChampions.map((b) => b.championId));
            const runeTrees = await this.client.runes.fetchAll();
            const spells = await this.client.summonerSpells.fetchAll();
            const game = new CurrentGame(this.client, data, champs.concat(banned), runeTrees, spells);
            if (cache) await this.client.cache.set(`spectator:${id}`, game);
            if (store) await this.client.storage.save(data, 'spectator', id);
            resolve(game);
          }
        }
      }
    });
  }

  /**
   * Fetch a list of featured games.
   * These games are not cached.
   *
   * @param options - The basic fetching options (does not fetch from storage or cache).
   */
  async fetchFeatured(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'currentGame', options);
    const { region, cache, store } = opts;
    this.client.logger?.trace(`Fetching featured games with options: `, opts);
    return new Promise<CurrentGame[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest('/lol/spectator/v4/featured-games', {
          region: region!,
          regional: false,
          name: 'Featured matches',
          params: 'no params'
        })
        .catch(reject);
      if (response) {
        const data = <{ gameList: CurrentGameData[] }>response.data;
        const runeTrees = await this.client.runes.fetchAll();
        const spells = await this.client.summonerSpells.fetchAll();
        const games = [];
        for (const game of data.gameList) {
          const participantChamps = await this.client.champions.fetchByKeys(game.participants.map((p) => p.championId));
          const bannedChamps = await this.client.champions.fetchByKeys(game.bannedChampions.map((b) => b.championId));
          games.push(new CurrentGame(this.client, game, bannedChamps.concat(participantChamps), runeTrees, spells));
          if (cache) await this.client.cache.set(`spectator:${game.gameId}`, games[games.length - 1]);
          if (store) await this.client.storage.save(game, 'spectator', game.gameId.toString());
        }
        resolve(games);
      }
    });
  }
}
