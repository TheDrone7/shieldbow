import type { BaseManager, FetchOptions, SummonerData } from '../types';
import type { Client } from '../client';
import { Account, Summoner } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A summoner manager - to fetch and manage all the summoner data.
 */
export class SummonerManager implements BaseManager<Summoner> {
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
  }

  /**
   * Fetch a summoner by its summoner ID.
   *
   * @param id - The summoner ID of the summoner.
   * @param options - The basic fetching options.
   */
  async fetch(id: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summoner', options);
    const { ignoreCache, ignoreStorage, store, cache, region } = opts;
    this.client.logger?.trace(`Fetching summoner by ID ${id} with options: `, opts);
    if (!ignoreCache) {
      const exists = await this.client.cache.has(`summoner:${id}`);
      if (exists) return Promise.resolve(await this.client.cache.get<Summoner>(`summoner:${id}`)!);
    }

    if (!ignoreStorage) {
      const storage = this.client.storage.fetch<SummonerData>('summoner', id);
      const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
      if (stored) {
        const summoner = new Summoner(this.client, stored, region!);
        if (cache) await this.client.cache.set(`summoner:${id}`, summoner);
        return Promise.resolve(summoner);
      }
    }

    try {
      const response = await this.client.api.makeApiRequest('/lol/summoner/v4/summoners/' + id, {
        region: region!,
        regional: false,
        name: 'Summoner by ID',
        params: `ID: ${id}`
      });
      if (response) {
        const data = <SummonerData>response.data;
        const summoner = new Summoner(this.client, data, region!);
        if (cache) await this.client.cache.set(`summoner${id}`, summoner);
        if (store) await this.client.storage.save(data, 'summoner', summoner.id);
        return Promise.resolve(summoner);
      }
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.reject('Unknown error. This should never happen.');
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
    const { ignoreCache, ignoreStorage, store, cache, region } = opts;
    this.client.logger?.trace(`Fetching summoner by PUUID ${id} with options: `, opts);

    if (!ignoreCache) {
      const cached = await this.client.cache.find<Summoner>((s) => s.playerId === id);
      if (cached) return Promise.resolve(cached);
    }

    if (!ignoreStorage) {
      const storage = this.client.storage.search<SummonerData>(`summoner`, { puuid: id });
      const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
      if (stored && stored.length > 0) {
        const summoner = new Summoner(this.client, stored[0], region!);
        if (cache) await this.client.cache.set(`summoner:${summoner.id}`, summoner);
        return Promise.resolve(summoner);
      }
    }

    try {
      const response = await this.client.api.makeApiRequest('/lol/summoner/v4/summoners/by-puuid/' + id, {
        region: region!,
        regional: false,
        name: 'Summoner by player ID',
        params: `ID: ${id}`
      });
      if (response) {
        const data = <SummonerData>response.data;
        const summoner = new Summoner(this.client, data, region!);
        if (store) await this.client.storage.save(data, 'summoner', summoner.id);
        if (cache) await this.client.cache.set(`summoner:${summoner.id}`, summoner);
        return Promise.resolve(summoner);
      }
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.reject('Unknown error. This should never happen.');
  }

  /**
   * Fetch a summoner by its summoner name.
   *
   * @param name - The summoner name of the summoner to fetch.
   * @param options - The basic fetching options.
   */
  async fetchBySummonerName(name: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'summoner', options);
    const { ignoreCache, ignoreStorage, store, cache, region } = opts;
    this.client.logger?.trace(`Fetching summoner by name '${name}' with options: `, opts);
    if (!ignoreCache) {
      const cached = await this.client.cache.find<Summoner>((s) => s.name === name);
      if (cached) return Promise.resolve(cached);
    }

    if (!ignoreStorage) {
      const storage = this.client.storage.search<SummonerData>(`summoner`, { name });
      const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
      if (stored && stored.length > 0) {
        const summoner = new Summoner(this.client, stored[0], region!);
        if (cache) await this.client.cache.set(`summoner:${summoner.id}`, summoner);
        return Promise.resolve(summoner);
      }
    }

    try {
      const response = await this.client.api.makeApiRequest(
        '/lol/summoner/v4/summoners/by-name/' + encodeURIComponent(name),
        {
          region: region!,
          regional: false,
          name: 'Summoner by summoner name',
          params: `Name: ${name}`
        }
      );
      if (response) {
        const data = <SummonerData>response.data;
        const summoner = new Summoner(this.client, data, region!);
        if (store) await this.client.storage.save(data, 'summoner', summoner.id);
        if (cache) await this.client.cache.set(`summoner:${summoner.id}`, summoner);
        return Promise.resolve(summoner);
      }
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.reject('Unknown error. This should never happen.');
  }
}
