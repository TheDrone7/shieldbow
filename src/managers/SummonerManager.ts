import type { BaseManager, SummonerData } from '../types';
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

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Summoner>();
  }

  /**
   * Fetch a summoner by its summoner ID.
   *
   * @param id The summoner ID of the summoner.
   * @param options The basic fetching options.
   */
  fetch(id: string, options: { force: boolean } = { force: false }) {
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/' + id, {
            regional: false,
            name: 'Summoner by ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data);
          this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }

  /**
   * Fetch a summoner by its account ID.
   *
   * @param id The account ID of the summoner to fetch.
   * @param options The basic fetching options.
   */
  fetchByAccountId(id: string, options: { force: boolean } = { force: false }) {
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.accountId === id) && !options.force)
        resolve(this.cache.find((s) => s.accountId === id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-account/' + id, {
            regional: false,
            name: 'Summoner by account ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data);
          this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }

  /**
   * Fetch a summoner by its unique PUUID.
   *
   * @param id The PUUID of the summoner to fetch.
   * @param options The basic fetching options.
   */
  async fetchByPlayerId(id: string, options: { force: boolean } = { force: false }) {
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.playerId === id) && !options.force)
        resolve(this.cache.find((s) => s.playerId === id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-puuid/' + id, {
            regional: false,
            name: 'Summoner by player ID',
            params: `ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data);
          this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }

  /**
   * Fetch a summoner by its summoner name.
   *
   * @param name The summoner name of the summoner to fetch.
   * @param options The basic fetching options.
   */
  async fetchBySummonerName(name: string, options: { force: boolean } = { force: false }) {
    return new Promise<Summoner>(async (resolve, reject) => {
      if (this.cache.find((s) => s.name === name) && !options.force) resolve(this.cache.find((s) => s.name === name)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/summoner/v4/summoners/by-name/' + name, {
            regional: false,
            name: 'Summoner by summoner name',
            params: `ID: ${name}`
          })
          .catch(reject);
        if (response) {
          const data = <SummonerData>response.data;
          const summoner = new Summoner(this.client, data);
          this.cache.set(summoner.id, summoner);
          resolve(summoner);
        }
      }
    });
  }

  /**
   * Fetch a summoner by a RIOT account associated to it.
   *
   * @param account The associated RIOT account.
   * @param options The basic fetching options.
   */
  async fetchByAccount(account: Account, options: { force: boolean } = { force: false }) {
    return this.fetchByPlayerId(account.playerId, options);
  }
}
