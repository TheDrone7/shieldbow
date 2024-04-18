import { BaseManager, Region } from '@shieldbow/web';
import { FetchOptions, ISummoner } from 'types';
import { Summoner } from 'structures';
import { Client } from 'client';
import { parseFetchOptions } from 'utilities';

/**
 * The summoner manager - handles all summoner-related API calls.
 */
export class SummonerManager implements BaseManager<Summoner> {
  /**
   * The client that instantiated this manager.
   */
  client: Client;

  /**
   * Create a new summoner manager.
   * @param client - The client that instantiated this manager.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch an summoner by the player's ID - the PUUID (globally unique).
   *
   * @param id - The player's ID - the PUUID.
   * @param options - The options for fetching.
   * @returns The fetched summoner.
   */
  async fetch(id: string, options?: FetchOptions): Promise<Summoner> {
    const opts = parseFetchOptions(this.client, 'summoner', options);

    this.client.logger?.trace(`Fetching summoner with PUUID: ${id}`);
    const url = '/lol/summoner/v4/summoners/by-puuid/' + id;

    try {
      const cached = await this.checkInternal(id, opts);
      if (cached) return cached;

      const data = await this.client.request<ISummoner>(url, {
        regional: false,
        method: 'summonerByPuuid',
        debug: 'PUUID: ' + id,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched summoner with PUUID: ${id}, processing`);
      return this.processData(data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch summoner with PUUID: ${id}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch an summoner by the summoner ID (regionally unique).
   *
   * @param id - The summoner ID.
   * @param options - The options for fetching.
   * @returns The fetched summoner.
   */
  async fetchBySummonerId(id: string, options?: FetchOptions): Promise<Summoner> {
    const opts = parseFetchOptions(this.client, 'summoner', options);

    this.client.logger?.trace(`Fetching summoner with summoner ID: ${id}`);
    const url = `/lol/summoner/v4/summoners/${id}`;

    try {
      const cached = await this.findInternal(id, opts);
      if (cached) return cached;

      const data = await this.client.request<ISummoner>(url, {
        regional: false,
        method: 'summonerBySummonerId',
        debug: `Summoner ID: ${id}`,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched summoner with summoner ID: ${id}, processing`);
      return this.processData(data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch summoner with summoner ID: ${id}`);
      return Promise.reject(error);
    }
  }

  private async findInternal(sId: string, opts: FetchOptions): Promise<Summoner | undefined> {
    const { ignoreCache, ignoreStorage } = opts;
    const region = opts.region ?? this.client.region;

    const cached = this.client.cache.find<Summoner>(
      (a) => a.id === sId && a.id !== a.playerId && a.level !== undefined
    );
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (!toIgnoreCache && cached) {
      this.client.logger?.trace(`Found summoner with summoner ID: ${sId} in cache`);
      return cached;
    } else if (toIgnoreCache) this.client.logger?.trace(`Cache ignored for summoner with summoner ID: '${sId}'`);
    else this.client.logger?.trace(`Summoner with summoner ID: ${sId} not found in cache`);

    try {
      const stored = await this.client.storage.find<ISummoner & { region: Region }>(
        'summoners',
        (a) => a.id === sId && a.region === region
      );
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (!toIgnoreStorage && stored) {
        this.client.logger?.trace(`Found summoner with summoner ID: ${sId} in storage`);
        return this.processData(stored, opts);
      } else if (toIgnoreStorage) this.client.logger?.trace(`Storage ignored for summoner with summoner ID: '${sId}'`);
      else this.client.logger?.trace(`Summoner with summoner ID: ${sId} not found in storage`);
      throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Summoner with summoner ID: ${sId} not found in storage`);
      this.client.logger?.trace(error);
      return undefined;
    }
  }

  private async checkInternal(id: string, opts: FetchOptions): Promise<Summoner | undefined> {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<Summoner>(`summoner:${id}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (!toIgnoreCache && cached) {
      this.client.logger?.trace(`Found summoner with PUUID: ${id} in cache`);
      return cached;
    } else if (toIgnoreCache) this.client.logger?.trace(`Cache ignored for summoner with PUUID: '${id}'`);
    else this.client.logger?.trace(`Summoner with PUUID: ${id} not found in cache`);

    try {
      const stored = await this.client.storage.load<ISummoner>('summoners', id);
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (toIgnoreStorage || !stored) throw new Error('Storage ignored');
      this.client.logger?.trace(`Found summoner with PUUID: ${id} in storage`);
      return this.processData(stored, opts);
    } catch (error) {
      this.client.logger?.trace(`Summoner with PUUID: ${id} not found in storage`);
      this.client.logger?.trace(error);
      return undefined;
    }
  }

  private async processData(data: ISummoner, opts: FetchOptions): Promise<Summoner> {
    const { cache, store } = opts;

    const region = opts.region ?? this.client.region;

    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing summoner with PUUID: ${data.puuid}`);
      await this.client.storage?.save('summoners', data.puuid, { ...data, region });
    }

    const summoner = new Summoner(this.client, region, data);

    const toCache = typeof cache === 'function' ? cache(summoner) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching summoner with PUUID: ${data.puuid}`);
      this.client.cache.set(`summoner:${data.puuid}`, summoner);
    }

    return summoner;
  }
}
