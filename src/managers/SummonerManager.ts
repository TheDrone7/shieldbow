import type { BaseManager, FetchOptions, SummonerData } from '../types';
import type { Client } from '../client';
import { Collection } from '@discordjs/collection';
import { Account, Summoner } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A summoner manager - to fetch and manage all the summoner data.
 */
export class SummonerManager implements BaseManager<Summoner> {
  /**
   * The summoners cached in the memory.
   *
   * Only use this if you absolutely must.
   * Prioritize using
   * {@link SummonerManager.fetch | fetch},
   * {@link SummonerManager.fetchBySummonerName | fetchBySummonerName} or
   * {@link SummonerManager.fetchByPlayerId | fetchByPlayerId}
   * instead.
   */
  readonly cache: Collection<string, Summoner>;
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;

  /**
   * Creates a new summoner manager.
   * @param client - The client that instantiated this manager.
   */
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Summoner>();
  }

  /**
   * Fetch a summoner by its summoner ID.
   *
   * @param id - The summoner ID of the summoner.
   * @param options - The basic fetching options.
   */
  async fetch(id: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summoner', options);
    const { ignoreCache, cache, region } = opts;
    this.client.logger?.trace(`Fetching summoner by ID ${id} with options: `, opts);
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.has(id) && !ignoreCache) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/' + id, {
            region: region!,
            regional: false,
            name: 'Summoner by ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data, region!);
          if (cache) this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }

  /**
   * Fetch a summoner by its unique PUUID.
   *
   * @param playerId - The PUUID of the summoner or associated RIOT account.
   * @param options - The basic fetching options.
   */
  async fetchByPlayerId(playerId: string | Account, options?: FetchOptions) {
    const id = typeof playerId === 'string' ? playerId : playerId.playerId;
    const opts = parseFetchOptions(this.client, 'summoner', options);
    const { ignoreCache, cache, region } = opts;
    this.client.logger?.trace(`Fetching summoner by PUUID ${playerId} with options: `, opts);
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.playerId === id) && !ignoreCache)
        resolve(this.cache.find((s) => s.playerId === id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-puuid/' + id, {
            region: region!,
            regional: false,
            name: 'Summoner by player ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data, region!);
          if (cache) this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }

  /**
   * Fetch a summoner by its summoner name.
   *
   * @param name - The summoner name of the summoner to fetch.
   * @param options - The basic fetching options.
   */
  async fetchBySummonerName(name: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summoner', options);
    const { ignoreCache, cache, region } = opts;
    this.client.logger?.trace(`Fetching summoner by name '${name}' with options: `, opts);
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.name === name) && !ignoreCache) resolve(this.cache.find((s) => s.name === name)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-name/' + encodeURIComponent(name), {
            region: region!,
            regional: false,
            name: 'Summoner by summoner name',
            params: `ID: ${name}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data, region!);
          if (cache) this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }
}
