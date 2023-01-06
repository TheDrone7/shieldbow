import type {
  BaseManager,
  ChallengeConfigData,
  ChallengeRankData,
  FetchOptions,
  SummonerChallengeData,
  TierType
} from '../types';
import { Challenge, ChallengeRank, SummonerChallenge } from '../structures';
import { Collection } from '@discordjs/collection';
import type { Client } from '../client';
import { parseFetchOptions } from '../util';

/**
 * A challenge manager - to fetch and manage all the challenges' data.
 */
export class ChallengeManager implements BaseManager<Challenge> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch all challenges.
   * @param options - The basic fetching options (force is ignored here).
   */
  fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenge', options);
    const { cache, store, region } = opts;
    this.client.logger?.trace(`Fetching all challenges data with options: `, opts);
    return new Promise<Collection<number, Challenge>>(async (resolve, reject) => {
      const result = new Collection<number, Challenge>();
      const cResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/config`, {
        region: region!,
        regional: false,
        name: 'All challenges config',
        params: ''
      });
      const pResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/percentiles`, {
        region: region!,
        regional: false,
        name: 'All challenges percentiles',
        params: ''
      });
      if (cResponse.status !== 200) reject(cResponse);
      else if (pResponse.status !== 200) reject(pResponse);
      else {
        const data = <ChallengeConfigData[]>cResponse.data;
        const percentiles = <{ [i: string]: { [key in TierType | 'NONE']: number } }>pResponse.data;
        for (const challenge of data) {
          const c = new Challenge(this.client, challenge, percentiles[challenge.id.toString()]);
          if (cache) await this.client.cache.set(`challenge:${c.id}`, c);
          if (store) await this.client.storage.save(c, `challenge`, c.id.toString());
          result.set(c.id, c);
        }
        resolve(result);
      }
    });
  }

  /**
   * Fetch a challenge by the challenge ID.
   *
   * @param id - The ID of the challenge you want to find.
   * @param options - The basic fetching options.
   */
  async fetch(id: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenge', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching challenge data for ID: ${id} with options: `, opts);
    return new Promise<Challenge>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`challenge:${id}`);
      if (!ignoreCache && exists) resolve(await this.client.cache.get(`challenge:${id}`)!);
      else {
        const storage = this.client.storage.fetch<Challenge>('challenge', id.toString());
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) resolve(stored);
        else {
          const cResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/${id}/config`, {
            region: region!,
            regional: false,
            name: 'Challenge config by ID',
            params: `Challenge ID: ${id}`
          });
          const pResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/${id}/percentiles`, {
            region: region!,
            regional: false,
            name: 'Challenge percentiles by ID',
            params: `Challenge ID: ${id}`
          });
          if (cResponse.status !== 200) reject(cResponse);
          else if (pResponse.status !== 200) reject(pResponse);
          else {
            const data = <ChallengeConfigData>cResponse.data;
            const percentiles = <{ [key in TierType | 'NONE']: number }>pResponse.data;
            const challenge = new Challenge(this.client, data, percentiles);
            if (cache) await this.client.cache.set(`challenge:${id}`, challenge);
            if (store) await this.client.storage.save(challenge, 'challenge', id.toString());
            resolve(challenge);
          }
        }
      }
    });
  }

  /**
   * Fetch the leader board of a challenge.
   * @param id - The ID of the challenge whose leaderboard you want to find.
   * @param level - The tier of the leaderboard.
   * @param options - The basic fetching options, with an additional limit option. Limit (or count) is 200 by default.
   */
  async fetchLeaderboard(
    id: number,
    level: 'MASTER' | 'GRANDMASTER' | 'CHALLENGER',
    options?: FetchOptions & { limit: number }
  ) {
    const opts = parseFetchOptions(this.client, 'challenge', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    const limit = options?.limit ?? 200;
    this.client.logger?.trace(`Fetching leaderboard for challenge ID: ${id}, level: ${level} with options: `, opts);
    return new Promise<ChallengeRank[]>(async (resolve, reject) => {
      const key = `challenge-leaderboard:${id}:${level}`;
      const exists = await this.client.cache.has(`${key}:${region}`);
      if (!ignoreCache && exists) resolve(await this.client.cache.get(`${key}:${region}`)!);
      else {
        const storage = this.client.storage.fetch<ChallengeRank[]>(key, region!);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) resolve(stored);
        else {
          const response = await this.client.api.makeApiRequest(
            `/lol/challenges/v1/challenges/${id}/leaderboards/by-level/${level}?limit=${limit}`,
            {
              region: region!,
              regional: false,
              name: 'Challenge leaderboard by level',
              params: `Challenge ID: ${id}, Level: ${level}`
            }
          );
          if (response.status !== 200) reject(response);
          else {
            const data = <ChallengeRankData[]>response.data;
            const result = data.map((rank) => new ChallengeRank(this.client, rank, level));
            if (cache) await this.client.cache.set(`${key}:${region}`, result);
            if (store) await this.client.storage.save(result, key, region!);
            resolve(result);
          }
        }
      }
    });
  }

  /**
   * Fetch the progress of a summoner in the challenges.
   * @param playerId - The player ID (puuid) of the summoner whose progress you want to find.
   * @param options - The basic fetching options.
   */
  async fetchSummonerProgression(playerId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenge', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching challenges progression for summoner ID: ${playerId} with options: `, opts);
    return new Promise<SummonerChallenge>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`challenge-progression:${playerId}`);
      if (!ignoreCache && exists) resolve(await this.client.cache.get(`challenge-progression:${playerId}`)!);
      else {
        const storage = this.client.storage.fetch<SummonerChallenge>('challenge-progression', playerId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) resolve(stored);
        else {
          const response = await this.client.api.makeApiRequest(`/lol/challenges/v1/player-data/${playerId}`, {
            region: region!,
            regional: false,
            name: 'Challenge progression by summoner ID',
            params: `Summoner ID: ${playerId}`
          });
          if (response.status !== 200) reject(response);
          else {
            const data = <SummonerChallengeData>response.data;
            const result = new SummonerChallenge(this.client, data);
            if (cache) await this.client.cache.set(`challenge-progression:${playerId}`, result);
            if (store) await this.client.storage.save(result, `challenge-progression`, playerId);
            resolve(result);
          }
        }
      }
    });
  }
}
