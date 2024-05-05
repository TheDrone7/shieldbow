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
   * @param playerId - The unique player ID (PUUID) of a participant in the game.
   * @param options - The basic fetching options.
   * @returns The live game.
   */
  async fetch(playerId: string, options?: FetchOptions): Promise<LiveGame> {
    const opts = parseFetchOptions(this.client, 'spectator', options);

    this.client.logger?.trace(`Fetching live game for player: ${playerId}`);
    const url = '/lol/spectator/v5/active-games/by-summoner/' + playerId;

    try {
      const data = await this.client.request<ILiveGame>(url, {
        regional: false,
        method: 'currentGameInfoByPuuid',
        debug: 'PUUID: ' + playerId,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched live game for player: ${playerId}`);
      this.client.logger?.trace(`Now fetching related data`);

      const champions = await this.client.champions.fetchByKeys(data.participants.map((p) => p.championId));
      const bannedChampions = await this.client.champions.fetchByKeys(data.bannedChampions.map((b) => b.championId));
      const spells = await this.client.summonerSpells.fetchAll();
      const runeTrees = await this.client.runes.fetchAll();
      const statRunes = this.client.runes.statRunes;

      return new LiveGame(
        this.client,
        data,
        [...champions.values(), ...bannedChampions.values()],
        spells,
        runeTrees,
        statRunes
      );
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch live game for player: ${playerId}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a list of featured live games.
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
        data.gameList.map((g) => g.participants.map((p) => p.championId)).flat()
      );
      const bannedChampions = await this.client.champions.fetchByKeys(
        data.gameList.map((g) => g.bannedChampions.map((b) => b.championId)).flat()
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
}
