import { BaseManager } from '@shieldbow/web';
import { Client } from 'client';
import { FeaturedGame, LiveGame } from 'structures';
import { ILiveGame, FetchOptions, ISpectatorGame } from 'types';
import { parseFetchOptions } from 'utilities';

/**
 * The live game manager - handles all live games-related API calls.
 */
export class LiveGameManager implements BaseManager<FeaturedGame> {
  /**
   * The client that instantiated this manager.
   */
  readonly client: Client;

  /**
   * Create a new LiveGameManager.
   * @param client - The client.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch a live game by the unique player ID (PUUID) of one of its participants.
   * Disabling cache is recommended for this method.
   *
   * @param playerId - The unique player ID (PUUID) of a participant in the game.
   * @param options - The basic fetching options.
   * @returns The live game.
   */
  async fetch(playerId: string, options?: FetchOptions): Promise<LiveGame> {
    const opts = parseFetchOptions(this.client, 'spectator', options);

    this.client.logger?.trace(`Fetching live game for player: ${playerId}`);
    const url = '/lol/spectator/v5/active-games/by-summoner/' + playerId;

    try {
      const cached = await this.checkInternal(playerId, opts);
      if (cached) {
        this.client.logger?.trace(`Fetched live game for player: ${playerId} from cache`);
        return cached;
      }

      const data = await this.client.request<ILiveGame>(url, {
        regional: false,
        method: 'currentGameInfoByPuuid',
        debug: 'PUUID: ' + playerId,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched live game for player: ${playerId}`);

      return this.processGame(playerId, data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch live game for player: ${playerId}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a list of featured live games.
   * These are never cached or stored.
   *
   * @param options - The basic fetching options.
   * @returns The list of featured games.
   */
  async fetchFeatured(options?: FetchOptions): Promise<FeaturedGame[]> {
    const opts = parseFetchOptions(this.client, 'spectator', options);

    this.client.logger?.trace(`Fetching featured games`);
    const url = '/lol/spectator/v5/featured-games';

    try {
      const data = await this.client.request<{ gameList: ISpectatorGame[]; clientRefreshInterval: number }>(url, {
        regional: false,
        method: 'featuredGames',
        debug: '',
        region: opts.region
      });

      this.client.logger?.trace(`Fetched featured games, now processing`);
      const champions = await this.client.champions.fetchByKeys(
        data.gameList
          .map((g) => g.participants.map((p) => p.championId))
          .flat()
          .filter((c) => c > 0)
      );
      const bannedChampions = await this.client.champions.fetchByKeys(
        data.gameList
          .map((g) => g.bannedChampions.map((b) => b.championId))
          .flat()
          .filter((c) => c > 0)
      );
      const spells = await this.client.summonerSpells.fetchAll();

      return data.gameList.map(
        (g) => new FeaturedGame(this.client, g, [...champions.values(), ...bannedChampions.values()], spells)
      );
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch featured games`);
      return Promise.reject(error);
    }
  }

  private async checkInternal(playerId: string, options: FetchOptions) {
    const { ignoreCache, ignoreStorage } = options;

    try {
      const cached = await this.client.cache.get<LiveGame>(`live-game:${playerId}`);
      const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
      if (!toIgnoreCache) {
        this.client.logger?.trace(`Found cached live game for player: ${playerId}`);
        return cached;
      }

      const stored = await this.client.storage.load<ILiveGame>(`live-game`, playerId);
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Found stored live game for player: ${playerId}`);
        return this.processGame(playerId, stored!, options);
      }

      return undefined;
    } catch (err) {
      this.client.logger?.warn(`Live game for player ${playerId} not found.`);
      return undefined;
    }
  }

  private async processGame(playerId: string, data: ILiveGame, options: FetchOptions) {
    const { cache, store } = options;
    this.client.logger?.trace(`Processing live game for player: ${playerId}`);

    const champions = await this.client.champions.fetchByKeys(
      data.participants.map((p) => p.championId).filter((c) => c > 0)
    );
    const bannedChampions = await this.client.champions.fetchByKeys(
      data.bannedChampions.map((b) => b.championId).filter((c) => c > 0)
    );
    const spells = await this.client.summonerSpells.fetchAll();
    const runeTrees = await this.client.runes.fetchAll();
    const statRunes = this.client.runes.statRunes;

    const game = new LiveGame(
      this.client,
      data,
      [...champions.values(), ...bannedChampions.values()],
      spells,
      runeTrees,
      statRunes
    );

    const toStore = typeof store === 'function' ? store(game) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing live game for player: ${playerId}`);
      await this.client.storage.save(`live-game`, playerId, data);
    }

    const toCache = typeof cache === 'function' ? cache(game) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching live game for player: ${playerId}`);
      await this.client.cache.set(`live-game:${playerId}`, game);
    }

    return game;
  }
}
