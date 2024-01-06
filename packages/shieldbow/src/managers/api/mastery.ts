import { BaseManager, Champion } from '@shieldbow/web';
import { ChampionMastery, Summoner } from 'structures';
import { parseFetchOptions } from 'utilities';
import { Client } from 'client';
import { IChampionMastery, FetchOptions } from 'types';

/**
 * The champion mastery manager - handles all champion mastery related API calls.
 */
export class ChampionMasteryManager implements BaseManager<ChampionMastery> {
  /**
   * The client that instantiated this instance.
   */
  readonly client: Client;
  /**
   * The summoner this manager belongs to.
   */
  readonly summoner: Summoner;
  #totalScore: number;

  /**
   * Create a new ChampionMasteryManager instance.
   * @param client - The client that instantiated this instance.
   */
  constructor(client: Client, summoner: Summoner) {
    this.client = client;
    this.summoner = summoner;
    this.#totalScore = 0;
  }

  /**
   * The total mastery score of the summoner.
   *
   * This is not a specific champion's mastery score.
   * It is the sum of all champion mastery levels.
   */
  get totalScore(): number {
    return this.#totalScore;
  }

  /**
   * Fetch a specific champion's mastery data for the summoner.
   * @param id - The champion's ID or numerical key. Can also be a {@link Champion} instance.
   * @param options - The options for the fetch.
   */
  async fetch(champion: Champion | string | number, options?: FetchOptions): Promise<ChampionMastery> {
    const opts = parseFetchOptions(this.client, 'championMastery', options);

    this.client.logger?.trace(`Fetching champion mastery for ${this.summoner.name} on ${champion}`);
    this.client.logger?.trace('Checking if champion exists.');

    let champ: Champion | undefined;

    if (typeof champion === 'string') champ = await this.client.champions.fetch(champion).catch(() => undefined);
    else if (typeof champion === 'number')
      champ = await this.client.champions.fetchByKey(champion).catch(() => undefined);
    else champ = champion;

    if (!champ) {
      this.client.logger?.trace(`Champion ${champion} does not exist.`);
      return Promise.reject('Invalid champion provided.');
    }

    this.client.logger?.trace(`Champion '${champ.name}' found, fetching mastery.`);
    const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${this.summoner.playerId}/by-champion/${champ.key}`;

    try {
      const cached = await this.checkInternal(champ, opts);
      if (cached) return cached;

      const data = await this.client.request<IChampionMastery>(url, {
        regional: true,
        method: 'championMasteryByChampion',
        debug: `PUUID: ${this.summoner.playerId}, Champion: ${champ.key} (${champ.name})`,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched champion mastery for ${this.summoner.name} on ${champ.name}, processing.`);
      return this.processData(data, champ, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch champion mastery for ${this.summoner.name} on ${champ.name}`);
      return Promise.reject(error);
    }
  }

  /**
   * Check if a champion mastery exists in the cache or storage.
   * @param champ - The champion to check for.
   * @param opts - The options for checking.
   * @returns The champion mastery if found, otherwise undefined.
   */
  private async checkInternal(champ: Champion, opts: FetchOptions) {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<ChampionMastery>(`mastery-${this.summoner.playerId}-${champ.key}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (cached && !toIgnoreCache) return cached;

    try {
      const stored = await this.client.storage.load<IChampionMastery>(
        `champion-mastery-${this.summoner.playerId}`,
        champ.key.toString()
      );

      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (stored && !toIgnoreStorage) return this.processData(stored, champ, opts);
      else throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Champion mastery for ${this.summoner.name} on ${champ.name} not found in storage`);
      return undefined;
    }
  }

  /**
   * Process the data fetched from the API as per the options.
   * @param data - The data fetched from the API.
   * @param champ - The champion this mastery is for.
   * @param opts - The options for processing.
   * @returns The processed data.
   */
  private async processData(data: IChampionMastery, champ: Champion, opts: FetchOptions) {
    const { store, cache } = opts;
    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing champion mastery for ${this.summoner.name} on ${champ.name}`);
      await this.client.storage.save(`champion-mastery-${this.summoner.playerId}`, champ.key.toString(), data);
    }

    const mastery = new ChampionMastery(this.client, opts.region ?? this.client.region, champ, data);
    const toCache = typeof cache === 'function' ? cache(mastery) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching champion mastery for ${this.summoner.name} on ${champ.name}`);
      this.client.cache.set(`mastery-${this.summoner.playerId}-${champ.key}`, mastery);
    }

    return mastery;
  }
}
