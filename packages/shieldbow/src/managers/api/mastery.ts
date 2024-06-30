import { Champion } from '@shieldbow/web';
import { ChampionMastery, Summoner, Account } from 'structures';
import { parseFetchOptions } from 'utilities';
import { Client } from 'client';
import { IChampionMastery, FetchOptions } from 'types';
import { Collection } from '@discordjs/collection';

/**
 * The champion mastery manager - handles all champion mastery related API calls.
 */
export class ChampionMasteryManager {
  /**
   * The client that instantiated this instance.
   */
  readonly client: Client;

  /**
   * Create a new ChampionMasteryManager instance.
   * @param client - The client that instantiated this instance.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch a specific champion's mastery data for a summoner.
   * @param player - The player ID (puuid) of the summoner. Can also be a {@link Summoner} or {@link Account} instance.
   * @param id - The champion's ID or numerical key. Can also be a {@link Champion} instance.
   * @param options - The options for the fetch.
   */
  async fetch(
    player: Account | Summoner | string,
    champion: Champion | string | number,
    options?: FetchOptions
  ): Promise<ChampionMastery> {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const puuid = typeof player === 'string' ? player : player.playerId;
    const region = typeof player === 'string' ? opts.region ?? this.client.region : player.region;

    this.client.logger?.trace(`Fetching champion mastery for PUUID ${puuid} on ${champion}`);
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
    const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/by-champion/${champ.key}`;

    try {
      const cached = await this.checkInternal(puuid, champ, opts);
      if (cached) return cached;

      const data = await this.client.request<IChampionMastery>(url, {
        regional: false,
        method: 'championMasteryByChampion',
        debug: `PUUID: ${puuid}, Champion: ${champ.key} (${champ.name})`,
        region
      });

      this.client.logger?.trace(`Fetched champion mastery for ${puuid} on ${champ.name}, processing.`);
      return this.processData(puuid, data, champ, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch champion mastery for ${puuid} on ${champ.name}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all champion masteries for a summoner. (Ignores the cache and storage)
   *
   * @param player - The player ID (puuid) of the summoner. Can also be a {@link Summoner} or {@link Account} instance.
   * @param options - The basic fetching options.
   * @returns A collection of champion masteries.
   */
  async fetchAll(
    player: string | Summoner | Account,
    options?: FetchOptions
  ): Promise<Collection<string, ChampionMastery>> {
    const result = new Collection<string, ChampionMastery>();
    const opts = parseFetchOptions(this.client, 'championMastery', options);

    const puuid = typeof player === 'string' ? player : player.playerId;
    const region = typeof player === 'string' ? opts.region ?? this.client.region : player.region;

    this.client.logger?.trace(`Fetching all champion masteries for ${puuid}`);
    const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;

    try {
      const data = await this.client.request<IChampionMastery[]>(url, {
        regional: false,
        method: 'championMasteryAll',
        debug: `PUUID: ${puuid}`,
        region
      });

      this.client.logger?.trace(`Fetched all champion masteries for ${puuid}, processing.`);
      for (const mastery of data) {
        const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
        if (!champ) {
          this.client.logger?.warn(`Champion ${mastery.championId} was not found, skipping...`);
          continue;
        }
        const processed = await this.processData(puuid, mastery, champ, opts);
        result.set(champ.id, processed);
      }
    } catch (error) {
      return Promise.reject(error);
    }

    return result;
  }

  /**
   * Fetch the top champion masteries for the summoner.
   * @param player - The player ID (puuid) of the summoner. Can also be a {@link Summoner} or {@link Account} instance.
   * @param count - The number of masteries to fetch.
   * @param options - The basic fetching options.
   *
   * @returns An array of champion masteries (sorted by mastery level and points)
   */
  async fetchTop(
    player: string | Summoner | Account,
    count: number = 3,
    options?: FetchOptions
  ): Promise<ChampionMastery[]> {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const puuid = typeof player === 'string' ? player : player.playerId;
    const region = typeof player === 'string' ? opts.region ?? this.client.region : player.region;

    this.client.logger?.trace(`Fetching top champion masteries for ${puuid}`);
    const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${count}`;

    try {
      const cached = await this.checkAllInternal(puuid, opts);
      if (cached && cached.length >= count) {
        cached.sort((a, b) => {
          if (a.level === b.level) return b.totalPoints - a.totalPoints;
          else return b.level - a.level;
        });
        return cached.slice(0, count);
      }

      const data = await this.client.request<IChampionMastery[]>(url, {
        regional: false,
        method: 'championMasteryTop',
        debug: `PUUID: ${puuid}`,
        region
      });

      this.client.logger?.trace(`Fetched top champion masteries for ${puuid}, processing.`);
      const result: ChampionMastery[] = [];
      for (const mastery of data) {
        const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
        if (!champ) {
          this.client.logger?.warn(`Champion ${mastery.championId} was not found, skipping...`);
          continue;
        }
        const processed = await this.processData(puuid, mastery, champ, opts);
        result.push(processed);
      }

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch the nth highest champion mastery for the summoner.
   * @param player - The player ID (puuid) of the summoner. Can also be a {@link Summoner} or {@link Account} instance.
   * @param n - The rank of the mastery to fetch (n = 1, default, means the highest mastery).
   * @param options - The basic fetching options.
   * @returns The champion mastery.
   */
  async fetchHighest(
    player: string | Summoner | Account,
    n: number = 1,
    options?: FetchOptions
  ): Promise<ChampionMastery> {
    try {
      const top = await this.fetchTop(player, n, options);
      return top[n - 1];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch the total mastery score for a player. (Ignores the cache and storage)
   * @param player - The player ID (puuid) of the summoner. Can also be a {@link Summoner} or {@link Account} instance.
   * @param options - The basic fetching options.
   * @returns The total mastery score.
   */
  async fetchScore(player: string | Summoner | Account, options?: FetchOptions): Promise<number> {
    const opts = parseFetchOptions(this.client, 'championMastery', options);

    const puuid = typeof player === 'string' ? player : player.playerId;
    const region = typeof player === 'string' ? opts.region ?? this.client.region : player.region;

    this.client.logger?.trace(`Fetching total mastery score for ${puuid}`);
    const url = `/lol/champion-mastery/v4/scores/by-puuid/${puuid}`;

    try {
      const data = await this.client.request<number>(url, {
        regional: false,
        method: 'championMasteryScore',
        debug: `PUUID: ${puuid}`,
        region
      });

      this.client.logger?.trace(`Fetched total mastery score for ${puuid}, returning.`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Check if a champion mastery exists for the player in the cache or storage.
   * @param puuid - The player ID (puuid) of the summoner.
   * @param opts - The options for checking.
   * @returns An array of champion masteries if found, otherwise undefined.
   */
  private async checkAllInternal(puuid: string, opts: FetchOptions) {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = await this.client.cache.filter<ChampionMastery>(
      (cm) =>
        cm instanceof ChampionMastery &&
        cm.playerId === puuid &&
        cm.totalPoints !== undefined &&
        cm.champion !== undefined
    );
    const toIgnoreCache =
      cached.length > 0 && typeof ignoreCache === 'function' ? cached.some((c) => ignoreCache(c)) : !!ignoreCache;
    if (cached.length > 0 && !toIgnoreCache) return cached;

    try {
      const stored = (await this.client.storage.loadAll(`champion-mastery-${puuid}`)) as IChampionMastery[];

      const toIgnoreStorage =
        stored.length > 0 && typeof ignoreStorage === 'function'
          ? stored.some((s) => ignoreStorage(s))
          : !!ignoreStorage;
      if (stored.length > 0 && !toIgnoreStorage) {
        const result = [];
        for (const mastery of stored) {
          const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
          if (!champ) {
            this.client.logger?.warn(`Champion ${mastery.championId} was not found, skipping...`);
            continue;
          }
          const processed = await this.processData(puuid, mastery, champ, opts);
          result.push(processed);
        }
        return result;
      } else throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Champion mastery for ${puuid} not found in storage`);
      return undefined;
    }
  }

  /**
   * Check if a champion mastery exists in the cache or storage.
   * @param puuid - The player ID (puuid) of the summoner.
   * @param champ - The champion to check for.
   * @param opts - The options for checking.
   * @returns The champion mastery if found, otherwise undefined.
   */
  private async checkInternal(puuid: string, champ: Champion, opts: FetchOptions) {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<ChampionMastery>(`mastery-${puuid}-${champ.key}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (cached && !toIgnoreCache) return cached;

    try {
      const stored = await this.client.storage.load<IChampionMastery>(
        `champion-mastery-${puuid}`,
        champ.key.toString()
      );

      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (stored && !toIgnoreStorage) return this.processData(puuid, stored, champ, opts);
      else throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Champion mastery for ${puuid} on ${champ.name} not found in storage`);
      return undefined;
    }
  }

  /**
   * Process the data fetched from the API as per the options.
   * @param puuid - The player ID (puuid) of the summoner.
   * @param data - The data fetched from the API.
   * @param champ - The champion this mastery is for.
   * @param opts - The options for processing.
   * @returns The processed data.
   */
  private async processData(puuid: string, data: IChampionMastery, champ: Champion, opts: FetchOptions) {
    const { store, cache } = opts;
    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing champion mastery for ${puuid} on ${champ.name}`);
      await this.client.storage.save(`champion-mastery-${puuid}`, champ.key.toString(), data);
    }

    const mastery = new ChampionMastery(this.client, opts.region ?? this.client.region, champ, data);
    const toCache = typeof cache === 'function' ? cache(mastery) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching champion mastery for ${puuid} on ${champ.name}`);
      this.client.cache.set(`mastery-${puuid}-${champ.key}`, mastery);
    }

    return mastery;
  }
}
