import type { BaseManager, FetchOptions, MatchByPlayerOptions, MatchData, MatchTimelineData } from '../types';
import { Match, type Summoner, MatchTimeline } from '../structures';
import { Collection } from '@discordjs/collection';
import type { Client } from '../client';

/**
 * A match manager - to fetch and manage matches.
 */
export class MatchManager implements BaseManager<Match> {
  /**
   * The collection of cached matches.
   *
   * Only use this if you absolutely must.
   * Prioritize using
   * {@link MatchManager.fetch | fetch} and
   * {@link MatchManager.fetchMatchListByPlayer | fetchMatchListByPlayer}
   * instead.
   */
  readonly cache: Collection<string, Match>;
  /**
   * The collection of cached match timelines.
   *
   * Only use this if you absolutely must.
   * Prioritize using {@link MatchManager.fetchMatchTimeline | fetchMatchTimeline} instead.
   */
  readonly timelineCache: Collection<string, MatchTimeline>;
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;

  /**
   * Creates a new match manager.
   * @param client - The client that instantiated the manager.
   */
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Match>();
    this.timelineCache = new Collection<string, MatchTimeline>();
  }

  /**
   * Fetch a match by its ID.
   * @param id - The ID of the match
   * @param options - The basic fetch options
   */
  fetch(id: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Match>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/match/v5/matches/${id}`, {
            region,
            regional: true,
            name: 'Get Match By Match ID',
            params: 'Match ID: ' + id
          })
          .catch(reject);
        if (response) {
          const data = <MatchData>response.data;
          await this.client.champions.fetchByKeys(data.info.participants.map((p) => p.championId));

          if (this.client.items.cache.size === 0) await this.client.items.fetch('1001');
          if (this.client.summonerSpells.cache.size === 0) await this.client.summonerSpells.fetchByName('Flash');
          if (this.client.runes.cache.size === 0) await this.client.runes.fetch('Domination');
          const match = new Match(this.client, data);
          if (cache) this.cache.set(id, match);
          resolve(match);
        }
      }
    });
  }

  /**
   * Fetch a match timeline by the match ID.
   *
   * @param matchId - The ID of the match
   * @param options - The basic fetch options
   */
  fetchMatchTimeline(matchId: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<MatchTimeline>(async (resolve, reject) => {
      if (this.timelineCache.has(matchId) && !force) resolve(this.timelineCache.get(matchId)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/match/v5/matches/${matchId}/timeline`, {
            region,
            regional: true,
            name: 'Get Match Timeline By Match ID',
            params: 'Match ID: ' + matchId
          })
          .catch(reject);
        if (response) {
          const data = <MatchTimelineData>response.data;
          const timeline = new MatchTimeline(this.client, data);
          if (cache) this.timelineCache.set(matchId, timeline);
          resolve(timeline);
        }
      }
    });
  }

  /**
   * Fetch a list of match IDs by a player ID.
   *
   * @param player - The summoner or their player ID whose matches need to be fetched.
   * @param options - The options for filtering the matches.
   */
  fetchMatchListByPlayer(player: Summoner | string, options?: MatchByPlayerOptions) {
    return new Promise<string[]>(async (resolve, reject) => {
      const playerId = typeof player === 'string' ? player : player.playerId;
      const region = typeof player === 'string' ? this.client.region : player.region;

      // The base is not used here, it is only there to prevent INVALID URL errors.
      const url = new URL('/lol/match/v5/matches/by-puuid/' + playerId + '/ids', 'https://na1.api.riotgames.com');
      if (options?.startTime) url.searchParams.set('startTime', options.startTime.toString());
      if (options?.endTime) url.searchParams.set('endTime', options.endTime.toString());
      if (options?.queue) url.searchParams.set('queue', options.queue.toString());
      if (options?.type) url.searchParams.set('type', options.type);
      if (options?.start) url.searchParams.set('start', options.start.toString());
      if (options?.count) url.searchParams.set('count', options.count.toString());
      const response = await this.client.api
        .makeApiRequest(url.pathname + url.search, {
          region,
          regional: true,
          name: 'Get Match List By Player ID',
          params: 'Player ID: ' + playerId
        })
        .catch(reject);
      if (response) {
        const data = <string[]>response.data;
        resolve(data);
      }
    });
  }
}
