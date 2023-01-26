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
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenge', options);
    const { cache, store, region } = opts;
    this.client.logger?.trace(`Fetching all challenges data with options: `, opts);
    try {
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
      const data = <ChallengeConfigData[]>cResponse.data;
      const percentiles = <{ [i: string]: { [key in TierType | 'NONE']: number } }>pResponse.data;
      for (const challenge of data) {
        const percentile = percentiles[challenge.id.toString()];
        const c = new Challenge(this.client, challenge, percentile);
        if (cache) await this.client.cache.set(`challenge:${c.id}`, c);
        if (store) await this.client.storage.save({ challenge, percentile }, `challenge`, c.id.toString());
        result.set(c.id, c);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
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

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`challenge:${id}`);
        if (exists) return this.client.cache.get<Challenge>(`challenge:${id}`);
      }

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<{
          challenge: ChallengeConfigData;
          percentile: { [key in TierType | 'NONE']: number };
        }>('challenge', id.toString());
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const result = new Challenge(this.client, stored.challenge, stored.percentile);
          if (cache) await this.client.cache.set(`challenge:${id}`, result);
          return result;
        }
      }

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
      const data = <ChallengeConfigData>cResponse.data;
      const percentile = <{ [key in TierType | 'NONE']: number }>pResponse.data;
      const challenge = new Challenge(this.client, data, percentile);
      if (cache) await this.client.cache.set(`challenge:${id}`, challenge);
      if (store) await this.client.storage.save({ challenge: data, percentile }, 'challenge', id.toString());
      return Promise.resolve(challenge);
    } catch (e) {
      return Promise.reject(e);
    }
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

    try {
      const key = `challenge-leaderboard:${id}:${level}`;
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`${key}:${region}`);
        if (exists) return Promise.resolve(await this.client.cache.get<ChallengeRank[]>(`${key}:${region}`)!);
      }

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<ChallengeRankData[]>(key, region!);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const result = stored.map((data) => new ChallengeRank(this.client, data, level));
          if (cache) await this.client.cache.set(`${key}:${region}`, result);
          return Promise.resolve(result);
        }
      }

      const response = await this.client.api.makeApiRequest(
        `/lol/challenges/v1/challenges/${id}/leaderboards/by-level/${level}?limit=${limit}`,
        {
          region: region!,
          regional: false,
          name: 'Challenge leaderboard by level',
          params: `Challenge ID: ${id}, Level: ${level}`
        }
      );
      const data = <ChallengeRankData[]>response.data;
      const result = data.map((d) => new ChallengeRank(this.client, d, level));
      if (cache) await this.client.cache.set(`${key}:${region}`, result);
      if (store) await this.client.storage.save(data, key, region!);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
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

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`challenge-progression:${playerId}`);
        if (exists)
          return Promise.resolve(await this.client.cache.get<SummonerChallenge>(`challenge-progression:${playerId}`)!);
      }

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<SummonerChallengeData>('challenge-progression', playerId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const result = new SummonerChallenge(this.client, stored);
          if (cache) await this.client.cache.set(`challenge-progression:${playerId}`, result);
          return Promise.resolve(result);
        }
      }

      const response = await this.client.api.makeApiRequest(`/lol/challenges/v1/player-data/${playerId}`, {
        region: region!,
        regional: false,
        name: 'Challenge progression by summoner ID',
        params: `Summoner ID: ${playerId}`
      });
      const data = <SummonerChallengeData>response.data;
      const result = new SummonerChallenge(this.client, data);
      if (cache) await this.client.cache.set(`challenge-progression:${playerId}`, result);
      if (store) await this.client.storage.save(data, 'challenge-progression', playerId);
      return Promise.resolve(result);
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
