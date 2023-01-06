import type { BaseManager, ChampionMasteryData, FetchOptions } from '../types';
import type { Client } from '../client';
import { Collection } from '@discordjs/collection';
import { Champion, ChampionMastery, Summoner } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A champion mastery manager - to fetch and manage all summoner's champion mastery data.
 */
export class ChampionMasteryManager implements BaseManager<ChampionMastery> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  /**
   * The ID of the summoner whose mastery is managed by this manager.
   */
  readonly summoner: Summoner;

  private _totalScore: number;

  /**
   * Creates a new champion mastery manager.
   *
   * @param client - The client that instantiated this manager.
   * @param summoner - The summoner this manager belongs to.
   */
  constructor(client: Client, summoner: Summoner) {
    this.client = client;
    this.summoner = summoner;
    this._totalScore = 0;
  }

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
    this.client.logger?.trace(
      `Fetching champion mastery for summoner ID: ${this.summoner.id}, champ: ${id} with options: `,
      opts
    );
    return new Promise<ChampionMastery>(async (resolve, reject) => {
      const champ = await this.client.champions.fetch(id, options).catch(() => undefined);
      const exists = await this.client.cache.has(`champion-mastery:${this.summoner.id}:${champ?.id}`);
      if (!champ) reject('Invalid champion ID');
      else if (exists && !ignoreCache)
        resolve(await this.client.cache.get(`champion-mastery:${this.summoner.id}:${champ.id}`)!);
      else {
        const storage = this.client.storage.fetch<ChampionMasteryData>(
          `champion-mastery:${this.summoner.id}`,
          champ.id
        );
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) {
          const mastery = new ChampionMastery(stored, champ);
          if (cache) await this.client.cache.set(mastery.champion.id, mastery);
          resolve(mastery);
        } else {
          const response = await this.client.api
            .makeApiRequest(
              `/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.summoner.id}/by-champion/${champ.key}`,
              {
                region: region!,
                regional: false,
                name: 'Champion mastery by champion',
                params: `Summoner ID: ${this.summoner.id}, Champion ID: ${champ.key}`
              }
            )
            .catch(reject);
          if (response) {
            const data = <ChampionMasteryData>response.data;
            const mastery = new ChampionMastery(data, champ);
            if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, mastery);
            if (store) await this.client.storage.save(data, `champion-mastery:${this.summoner.id}`, champ.id);
            resolve(mastery);
          }
        }
      }
    });
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
    this.client.logger?.trace(
      `Fetching ${n}th highest mastery for summoner ID: ${this.summoner.id} with options: `,
      opts
    );
    return new Promise<ChampionMastery>(async (resolve, reject) => {
      if (n < 0) reject('The value of `n` must be >= 0.');
      else {
        const exists = (await this.client.cache.keys()).filter((k) =>
          k.startsWith(`champion-mastery:${this.summoner.id}:`)
        );
        const dataList = await (exists.length > n && !ignoreCache
          ? Promise.all(exists.map((k) => this.client.cache.get<ChampionMastery>(k)))
          : <Promise<ChampionMasteryData[]>>this._fetchRawMasteryData(opts).catch(reject));
        const ordered = this._sortMastery(dataList);
        if (ordered.at(n)) {
          const mastery = ordered.at(n)!;
          if (mastery instanceof ChampionMastery) resolve(mastery);
          else {
            const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
            if (!champ) reject('Invalid champion ID');
            else {
              const cMastery = new ChampionMastery(mastery, champ);
              if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, cMastery);
              if (store) await this.client.storage.save(mastery, `champion-mastery:${this.summoner.id}`, champ.id);
              resolve(cMastery);
            }
          }
        } else reject('This summoner does not have mastery points for ' + n + ' champions');
      }
    });
  }

  /**
   * @deprecated use fetchAll instead
   */
  refreshAll() {
    return this.fetchAll();
  }

  /**
   * Fetches all the champions' masteries data for this summoner and store them in the cache.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'championMastery', options);
    const { cache, store } = opts;
    this.client.logger?.trace(`Fetching all champion mastery for summoner ID: ${this.summoner.id} with options: `, {
      region: this.summoner.region
    });
    return new Promise<Collection<string, ChampionMastery>>(async (resolve) => {
      const dataList = await this._fetchRawMasteryData({ ignoreStorage: true, ...opts }).catch(() => []);
      const champs = await this.client.champions.fetchByKeys(dataList.map((c) => c.championId));
      const result = new Collection<string, ChampionMastery>();
      for (const data of dataList) {
        const champ = champs.find((c) => c.key === data.championId)!;
        const mastery = new ChampionMastery(data, champ);
        result.set(champ.id, mastery);
        if (cache) await this.client.cache.set(`champion-mastery:${this.summoner.id}:${champ.id}`, mastery);
        if (store) await this.client.storage.save(data, `champion-mastery:${this.summoner.id}`, champ.id);
      }
      resolve(result);
    });
  }

  /**
   * Get an updated total mastery score for this summoner.
   */
  async updateTotalScore() {
    return new Promise<number>(async (resolve, reject) => {
      this.client.logger?.trace(`Fetching total mastery score for summoner ID: ${this.summoner.id} with options: `, {
        region: this.summoner.region
      });
      const response = await this.client.api
        .makeApiRequest(`/lol/champion-mastery/v4/scores/by-summoner/${this.summoner.id}`, {
          region: this.summoner.region,
          regional: false,
          name: 'Champion mastery score by summoner',
          params: `Summoner ID: ${this.summoner.id}`
        })
        .catch(reject);
      if (response) {
        const score = <number>response.data;
        this._totalScore = score;
        resolve(score);
      }
    });
  }

  /**
   * Fetch raw ChampionMasteryData[] response from API
   */
  private _fetchRawMasteryData(options: FetchOptions) {
    return new Promise<ChampionMasteryData[]>(async (resolve, reject) => {
      let result;
      if (!options.ignoreStorage)
        result = await this.client.storage.search<ChampionMasteryData>(`champion-mastery:${this.summoner.id}`, {});
      if (result && result.length > 0) resolve(result);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.summoner.id}`, {
            region: this.summoner.region,
            regional: false,
            name: 'Champion mastery by summoner',
            params: `Summoner ID: ${this.summoner.id}`
          })
          .catch(reject);
        if (response) {
          const data = <ChampionMasteryData[]>response.data;
          resolve(data);
        }
      }
    });
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
