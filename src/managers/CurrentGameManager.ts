import type { BaseManager, CurrentGameData, FetchOptions } from '../types';
import type { Client } from '../client';
import { CurrentGame } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A current game manager - to fetch and manage the live games.
 *
 * Requires API key with access to `spectator-v4` API.
 */
export class CurrentGameManager implements BaseManager<CurrentGame> {
  /**
   * The client this current game manager belongs to.
   */
  readonly client: Client;

  /**
   * Creates a new current game manager.
   * @param client - The client this current game manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetches the live game for the given summoner ID.
   *
   * @param id - The summoner ID to fetch the live game for.
   * @param options - The basic fetching options.
   */
  async fetch(id: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'currentGame', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching live game ${id} with options: `, opts);

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`spectator:${id}`);
        if (exists) return this.client.cache.get<CurrentGame>(`spectator:${id}`);
      }

      const runeTrees = await this.client.runes.fetchAll();
      const spells = await this.client.summonerSpells.fetchAll();

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<CurrentGameData>('spectator', id);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const champs = await this.client.champions.fetchByKeys(stored.participants.map((p) => p.championId));
          const banned = await this.client.champions.fetchByKeys(stored.bannedChampions.map((b) => b.championId));
          const result = new CurrentGame(this.client, stored, banned.concat(champs), runeTrees, spells);
          if (cache) await this.client.cache.set(`spectator:${id}`, result);
          return result;
        }
      }

      const response = await this.client.api.request('/lol/spectator/v4/active-games/by-summoner/' + id, {
        region: region!,
        regional: false,
        api: 'SPECTATOR',
        method: 'getCurrentGameInfoBySummoner',
        params: 'Summoner ID: ' + id
      });

      const data = <CurrentGameData>response.data;
      const champs = await this.client.champions.fetchByKeys(data.participants.map((p) => p.championId));
      const banned = await this.client.champions.fetchByKeys(data.bannedChampions.map((b) => b.championId));
      const game = new CurrentGame(this.client, data, champs.concat(banned), runeTrees, spells);
      if (cache) await this.client.cache.set(`spectator:${id}`, game);
      if (store) await this.client.storage.save(data, 'spectator', id);
      return game;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a list of featured games.
   *
   * @param options - The basic fetching options (does not fetch from storage or cache).
   */
  async fetchFeatured(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'currentGame', options);
    const { region, cache, store } = opts;
    this.client.logger?.trace(`Fetching featured games with options: `, opts);

    try {
      const response = await this.client.api.request('/lol/spectator/v4/featured-games', {
        region: region!,
        regional: false,
        api: 'SPECTATOR',
        method: 'getFeaturedGames',
        params: 'no params'
      });
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
      return games;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
