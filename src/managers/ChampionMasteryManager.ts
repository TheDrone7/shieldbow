import type { BaseManager, ChampionMasteryData, FetchOptions } from '../types';
import type { Client } from '../client';
import { Collection } from '@discordjs/collection';
import { Champion, ChampionMastery, Summoner } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A champion mastery manager - to fetch and manage all summoner's champion mastery data.
 *
 * Requires API key with access to `champion-mastery-v4` API.
 */
export class ChampionMasteryManager implements BaseManager<ChampionMastery> {
  /**
   * The client this champion mastery manager belongs to.
   */
  readonly client: Client;
  /**
   * The ID of the summoner whose mastery is managed by this manager.
   */
  readonly summoner: Summoner;

  /**
   * Creates a new champion mastery manager.
   *
   * @param client - The client this champion mastery manager belongs to.
   * @param summoner - The summoner this manager belongs to.
   */
  constructor(client: Client, summoner: Summoner) {
    this.client = client;
    this.summoner = summoner;
    this._totalScore = 0;
  }

  private _totalScore: number;

  /**
   * The total mastery score of this summoner.
   */
  get totalScore() {
    return this._totalScore;
  }

  /**
   * Fetch a champion's mastery data for the summoner.
   *
   * @param champion - The champion (or its ID) whose mastery data needs to be fetched.
   * @param options - The basic fetching options.
   */
  async fetch(champion: Champion | string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const { cache, store, ignoreCache, ignoreStorage, region } = opts;
    const id = champion instanceof Champion ? champion.id : champion;
    this.client.logger?.debug(
      `Fetching champion mastery for summoner ID: ${this.summoner.id}, champ: ${id} with options: `,
      opts
    );

    try {
      this.client.logger?.trace(`Fetching champion: ${id} data...`);
      const champ = await this.client.champions.fetch(id, options).catch(() => undefined);
      if (!champ) return Promise.reject('Invalid champion ID');

      this.client.logger?.trace('Champion data found.');
      if (!ignoreCache) {
        this.client.logger?.trace('Fetching champion mastery from cache...');
        const exists = await this.client.cache.has(`champion-mastery:${this.summoner.id}:${champ.id}`);
        if (exists) return this.client.cache.get<ChampionMastery>(`champion-mastery:${this.summoner.id}:${champ.id}`)!;
      }

      if (!ignoreStorage) {
        this.client.logger?.trace('Fetching champion mastery from storage...');
        const storage = this.client.storage.fetch<ChampionMasteryData>(
          `champion-mastery:${this.summoner.id}`,
          champ.id
        );
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const mastery = new ChampionMastery(stored, champ);
          if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, mastery);
          return mastery;
        }
      }

      this.client.logger?.trace('Fetching champion mastery from the API...');
      const response = await this.client.api.request(
        `/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.summoner.id}/by-champion/${champ.key}`,
        {
          region: region!,
          regional: false,
          api: 'CHAMPION_MASTERY',
          method: 'getAllChampionMasteries',
          params: `Summoner ID: ${this.summoner.id}, Champion ID: ${champ.key}`
        }
      );

      this.client.logger?.trace('Champion mastery fetched from API, parsing, caching, and storing...');
      const data = <ChampionMasteryData>response.data;
      const mastery = new ChampionMastery(data, champ);
      if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, mastery);
      if (store) await this.client.storage.save(data, `champion-mastery:${this.summoner.id}`, champ.id);
      return mastery;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get the nth highest champion mastery for the summoner.
   *
   * @param n - The ranking of the champion in the summoner's champions mastery, defaults to 0 (highest).
   * @param options - The basic fetching options.
   */
  async highest(n: number = 0, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const { cache, ignoreCache, store } = opts;
    this.client.logger?.debug(
      `Fetching ${n}th highest mastery for summoner ID: ${this.summoner.id} with options: `,
      opts
    );
    if (n < 0) return Promise.reject('The value of `n` must be >= 0.');

    try {
      let exists: string[] = [];
      if (!ignoreCache) {
        this.client.logger?.trace('Fetching champion mastery from cache...');
        exists = (await this.client.cache.keys()).filter((k) => k.startsWith(`champion-mastery:${this.summoner.id}:`));
      }

      const dataList = await (exists.length > n
        ? Promise.all(exists.map((k) => this.client.cache.get<ChampionMastery>(k)))
        : <Promise<ChampionMasteryData[]>>this._fetchRawMasteryData(opts, n + 1));

      const ordered = this._sortMastery(dataList);
      if (ordered.at(n)) {
        this.client.logger?.trace('Champion mastery exists, returning...');
        const mastery = ordered.at(n)!;
        if (mastery instanceof ChampionMastery) return mastery;
        else {
          this.client.logger?.trace('Champion mastery found, fetching champion...');
          const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
          if (!champ) return Promise.reject('Invalid champion ID');
          const masteryObj = new ChampionMastery(mastery, champ);
          if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, masteryObj);
          if (store) await this.client.storage.save(mastery, `champion-mastery:${this.summoner.id}`, champ.id);
          return masteryObj;
        }
      } else return Promise.reject('The value of `n` is out of bounds.');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetches the top n champions' mastery data for this summoner.
   * They are already sorted by mastery level.
   *
   * @param n - The number of champions to fetch, defaults to 3.
   * @param options - The basic fetching options.
   */
  async fetchTop(n: number = 3, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const { cache, ignoreCache, store } = opts;
    this.client.logger?.debug(
      `Fetching ${n} highest masteries for summoner ID: ${this.summoner.id} with options: `,
      opts
    );
    if (n < 1) return Promise.reject('The value of `n` must be > 0.');

    try {
      let exists: string[] = [];
      if (!ignoreCache) {
        this.client.logger?.trace('Fetching champion masteries from cache...');
        exists = (await this.client.cache.keys())
          .filter((k) => k.startsWith(`champion-mastery:${this.summoner.id}:`))
          .slice(0, n);
      }

      const dataList = await (exists.length >= n
        ? Promise.all(exists.map((k) => this.client.cache.get<ChampionMastery>(k)))
        : <Promise<ChampionMasteryData[]>>this._fetchRawMasteryData(opts, n));

      const ordered = this._sortMastery(dataList);
      this.client.logger?.trace('Champion masteries fetched, processing and returning...');
      if (ordered.at(0) instanceof ChampionMastery) return ordered as ChampionMastery[];
      const masteries = ordered as ChampionMasteryData[];
      const toReturn: ChampionMastery[] = [];
      for (const mastery of masteries) {
        const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
        if (!champ) return Promise.reject('Invalid champion ID');
        const masteryObj = new ChampionMastery(mastery, champ);
        if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, masteryObj);
        if (store) await this.client.storage.save(mastery, `champion-mastery:${this.summoner.id}`, champ.id);
        toReturn.push(masteryObj as ChampionMastery);
      }
      return toReturn;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetches all the champions' masteries data for this summoner and store them in the cache.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const { cache, store } = opts;
    this.client.logger?.debug(`Fetching champion masteries for summoner ID: ${this.summoner.id} with options: `, opts);
    try {
      const dataList = await this._fetchRawMasteryData({ ignoreStorage: true, ...opts }).catch(() => []);
      this.client.logger?.trace('Masteries fetched, now fetching related champions');
      const champs = await this.client.champions.fetchByKeys(dataList.map((c) => c.championId));
      const result = new Collection<string, ChampionMastery>();
      this.client.logger?.trace('Masteries and champions fetched, processing and returning...');
      for (const data of dataList) {
        const champ = champs.find((c) => c.key === data.championId)!;
        const mastery = new ChampionMastery(data, champ);
        result.set(champ.id, mastery);
        if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, mastery);
        if (store) await this.client.storage.save(data, `champion-mastery:${this.summoner.id}`, champ.id);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get an updated total mastery score for this summoner.
   */
  async updateTotalScore() {
    this.client.logger?.debug(`Fetching total mastery score for summoner ID: ${this.summoner.id} with options: `, {
      region: this.summoner.region
    });
    try {
      const response = await this.client.api.request(
        `/lol/champion-mastery/v4/scores/by-summoner/${this.summoner.id}`,
        {
          region: this.summoner.region,
          regional: false,
          api: 'CHAMPION_MASTERY',
          method: 'getChampionMasteryScore',
          params: `Summoner ID: ${this.summoner.id}`
        }
      );
      this.client.logger?.trace('Total mastery score fetched, processing and returning...');
      const score = <number>response.data;
      this._totalScore = score;
      return score;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch raw ChampionMasteryData[] response from API
   */
  private async _fetchRawMasteryData(options: FetchOptions, n: number = 0) {
    if (!options.ignoreStorage) {
      const result = await this.client.storage.search<ChampionMasteryData>(`champion-mastery:${this.summoner.id}`, {});
      if (result && result.length > 0) return result;
    }

    try {
      const response =
        n < 1
          ? await this.client.api.request(
              `/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.summoner.id}`,
              {
                region: this.summoner.region,
                regional: false,
                api: 'CHAMPION_MASTERY',
                method: 'getAllChampionMasteries',
                params: `Summoner ID: ${this.summoner.id}`
              }
            )
          : await this.client.api.request(
              `/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.summoner.id}/top?count=${n}`,
              {
                region: this.summoner.region,
                regional: false,
                api: 'CHAMPION_MASTERY',
                method: 'getTopChampionMasteries',
                params: `Summoner ID: ${this.summoner.id}, count: ${n}`
              }
            );
      return <ChampionMasteryData[]>response.data;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Sort mastery by level and points
   * Works for raw and parsed masteries
   */
  private _sortMastery(data: ChampionMastery[] | ChampionMasteryData[]) {
    const sorter = (a: ChampionMastery | ChampionMasteryData, b: ChampionMastery | ChampionMasteryData) =>
      ('level' in b ? b.level : b.championLevel) - ('level' in a ? a.level : a.championLevel) ||
      ('points' in b ? b.points : b.championPoints) - ('points' in a ? a.points : a.championPoints);

    return data.sort(sorter);
  }
}
