import type { BaseManager, FetchOptions, SummonerData } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import { Account, Summoner } from '../structures';

/**
 * A summoner manager - to fetch and manage all the summoner data.
 */
export class SummonerManager implements BaseManager<Summoner> {
  /**
   * The summoners cached in the memory.
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
  fetch(id: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/' + id, {
            region,
            regional: false,
            name: 'Summoner by ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data, region);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.playerId === id) && !force) resolve(this.cache.find((s) => s.playerId === id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-puuid/' + id, {
            region,
            regional: false,
            name: 'Summoner by player ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data, region);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.name === name) && !force) resolve(this.cache.find((s) => s.name === name)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-name/' + encodeURIComponent(name), {
            region,
            regional: false,
            name: 'Summoner by summoner name',
            params: `ID: ${name}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data, region);
          if (cache) this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }
}
