import type {
  BaseManager,
  ChallengeConfigData,
  ChallengeRankData,
  FetchOptions,
  Region,
  SummonerChallengeData,
  TierType
} from '../types';
import { Challenge, ChallengeRank, SummonerChallenge } from '../structures';
import { Collection } from '@discordjs/collection';
import type { Client } from '../client';

export class ChallengeManager implements BaseManager<Challenge> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  /**
   * The challenge info (mapped by challenge ID) stored in the memory.
   */
  readonly cache: Collection<number, Challenge>;
  /**
   * The challenge leaderboards (mapped by region and tier type) stored in the memory.
   */
  readonly leaderBoardCache: Collection<Region, Collection<TierType, ChallengeRank[]>>;
  /**
   * The challenge progressions of a summoner (mapped by summoner ID).
   */
  readonly summonerProgressionCache: Collection<string, SummonerChallenge>;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<number, Challenge>();
    this.leaderBoardCache = new Collection<Region, Collection<TierType, ChallengeRank[]>>();
    this.summonerProgressionCache = new Collection<string, SummonerChallenge>();
  }

  /**
   * Fetch all challenges.
   * @param options - The basic fetching options (force is ignored here).
   */
  fetchAll(options?: FetchOptions) {
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Collection<number, Challenge>>(async (resolve, reject) => {
      const result = new Collection<number, Challenge>();
      const cResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/config`, {
        region,
        regional: false,
        name: 'All challenges config',
        params: ''
      });
      const pResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/percentiles`, {
        region,
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
          if (cache) this.cache.set(c.id, c);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Challenge>(async (resolve, reject) => {
      if (!force && this.cache.has(id)) resolve(this.cache.get(id)!);
      else {
        const cResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/${id}/config`, {
          region,
          regional: false,
          name: 'Challenge config by ID',
          params: `Challenge ID: ${id}`
        });
        const pResponse = await this.client.api.makeApiRequest(`/lol/challenges/v1/challenges/${id}/percentiles`, {
          region,
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
          if (cache) this.cache.set(id, challenge);
          resolve(challenge);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    const limit = options?.limit ?? 200;
    return new Promise<ChallengeRank[]>(async (resolve, reject) => {
      if (!force && this.leaderBoardCache.has(region) && this.leaderBoardCache.get(region)?.has(level))
        resolve(this.leaderBoardCache.get(region)?.get(level)!);
      else {
        const response = await this.client.api.makeApiRequest(
          `/lol/challenges/v1/challenges/${id}/leaderboards/by-level/${level}?limit=${limit}`,
          {
            region,
            regional: false,
            name: 'Challenge leaderboard by level',
            params: `Challenge ID: ${id}, Level: ${level}`
          }
        );
        if (response.status !== 200) reject(response);
        else {
          const data = <ChallengeRankData[]>response.data;
          const result = data.map((rank) => new ChallengeRank(this.client, rank, level));
          if (cache) {
            if (!this.leaderBoardCache.has(region)) this.leaderBoardCache.set(region, new Collection());
            this.leaderBoardCache.get(region)?.set(level, result);
          }
          resolve(result);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<SummonerChallenge>(async (resolve, reject) => {
      if (!force && this.summonerProgressionCache.has(playerId)) resolve(this.summonerProgressionCache.get(playerId)!);
      else {
        const response = await this.client.api.makeApiRequest(`/lol/challenges/v1/player-data/${playerId}`, {
          region,
          regional: false,
          name: 'Challenge progression by summoner ID',
          params: `Summoner ID: ${playerId}`
        });
        if (response.status !== 200) reject(response);
        else {
          const data = <SummonerChallengeData>response.data;
          const result = new SummonerChallenge(this.client, data);
          if (cache) this.summonerProgressionCache.set(playerId, result);
          resolve(result);
        }
      }
    });
  }
}
