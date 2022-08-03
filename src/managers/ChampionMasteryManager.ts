import type { BaseManager, ChampionMasteryData, FetchOptions } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import { Champion, ChampionMastery, Summoner } from '../structures';

/**
 * A champion mastery manager - to fetch and manage all summoner's champion mastery data.
 */
export class ChampionMasteryManager implements BaseManager<ChampionMastery> {
  /**
   * The cached mastery data for the summoner.
   */
  readonly cache: Collection<string, ChampionMastery>;
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  /**
   * The ID of the summoner whose mastery is managed by this manager.
   */
  readonly summoner: Summoner;

  /**
   * Creates a new champion mastery manager.
   *
   * @param client - The client that instantiated this manager.
   * @param summoner - The summoner this manager belongs to.
   */
  constructor(client: Client, summoner: Summoner) {
    this.client = client;
    this.summoner = summoner;
    this.cache = new Collection<string, ChampionMastery>();
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
   * The cached champion masteries of the summoner as a sorted array.
   *
   * The array is sorted from the highest mastery to lowest.
   * While sorting, the mastery level is prioritized over the number of points.
   */
  get sortedCache() {
    const sorted = this._sortMastery(this.cache) as Collection<string, ChampionMastery>;
    return Array.from(sorted.values());
  }

  /**
   * Fetch a champion's mastery data for the summoner.
   *
   * @param champion - The champion (or its ID) whose mastery data needs to be fetched.
   * @param options - The basic fetching options.
   */
  fetch(champion: Champion | string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.summoner.region;
    const id = champion instanceof Champion ? champion.id : champion;
    return new Promise<ChampionMastery>(async (resolve, reject) => {
      const champ = await this.client.champions.fetch(id).catch(() => undefined);
      if (!champ) reject('Invalid champion ID');
      else if (this.cache.has(champ.id) && !force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest(
            `/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.summoner.id}/by-champion/${champ.key}`,
            {
              region,
              regional: false,
              name: 'Champion mastery by champion',
              params: `Summoner ID: ${this.summoner.id}, Champion ID: ${champ.key}`
            }
          )
          .catch(reject);
        if (response) {
          const data = <ChampionMasteryData>response.data;
          const mastery = new ChampionMastery(this.client, data);
          if (cache) this.cache.set(champ.id, mastery);
          resolve(mastery);
        }
      }
    });
  }

  /**
   * Get the nth highest champion mastery for the summoner.
   * @param n - The ranking of the champion in the summoner's champions mastery, defaults to 0 (highest).
   */
  highest(n: number = 0, options?: FetchOptions) {
    const force = options?.force ?? false;
    return new Promise<ChampionMastery>(async (resolve, reject) => {
      if (n < 0) reject('The value of `n` must be >= 0.');
      else {
        const dataList = (await this._fetchRawMasteryData().catch(reject)) as ChampionMasteryData[];
        const ordered = this._sortMastery(dataList) as ChampionMasteryData[];
        if (ordered.at(n)) {
          const mastery = ordered.at(n)!;
          const champ = await this.client.champions.fetchByKey(mastery.championId).catch(() => undefined);
          if (!champ) reject('Invalid champion ID');
          else if (this.cache.has(champ.id) && !force) resolve(this.cache.get(champ.id)!);
          else resolve(this.fetch(champ, options));
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
   * Fetches all the champions's masteries data for this summoner and store them in the cache.
   */
  fetchAll() {
    return new Promise<Collection<string, ChampionMastery>>(async (resolve, reject) => {
      const dataList = (await this._fetchRawMasteryData().catch(reject)) as ChampionMasteryData[];
      // Fetch all champions that this summoners has any mastery points
      const cacheIds = this.client.champions.cache.map((x) => x.key);
      const championsToFetch = dataList.filter((c) => !cacheIds.includes(c.championId));
      await this.client.champions.fetchByKeys(championsToFetch.map((c) => c.championId));
      for (const data of dataList) {
        const mastery = new ChampionMastery(this.client, data);
        this.cache.set(mastery.champion.id, mastery);
      }
      resolve(this.cache);
    });
  }

  /**
   * Get an updated total mastery score for this summoner.
   */
  updateTotalScore() {
    return new Promise<number>(async (resolve, reject) => {
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
  private _fetchRawMasteryData() {
    return new Promise<ChampionMasteryData[]>(async (resolve, reject) => {
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
    });
  }

  /**
   * Sort mastery by level and points in order M7 -> M6 -> M5.
   * Works for raw and parsed masteries
   */
  private _sortMastery(data: Collection<string, ChampionMastery> | ChampionMasteryData[]) {
    const sorter = (a: ChampionMastery | ChampionMasteryData, b: ChampionMastery | ChampionMasteryData) =>
      ('level' in b ? b.level : b.championLevel) - ('level' in a ? a.level : a.championLevel) ||
      ('points' in b ? b.points : b.championPoints) - ('points' in a ? a.points : a.championPoints);

    return data.sort(sorter);
  }
}
