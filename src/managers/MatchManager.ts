import type { BaseManager, MatchByPlayerOptions, MatchData } from '../types';
import { Match, type Summoner } from '../structures';
import Collection from '@discordjs/collection';
import type { Client } from '../client';

/**
 * A match manager - to fetch and manage matches.
 */
export class MatchManager implements BaseManager<Match> {
  /**
   * The collection of cached matches.
   */
  readonly cache: Collection<string, Match>;
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Match>();
  }

  /**
   * Fetch a match by its ID.
   * @param id - The ID of the match
   * @param options - The basic fetch options
   */
  fetch(id: string, options: { force: boolean } = { force: false }) {
    return new Promise<Match>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/match/v5/matches/${id}`, {
            regional: true,
            name: 'Get Match By Match ID',
            params: 'Match ID: ' + id
          })
          .catch(reject);
        if (response) {
          const data = <MatchData>response.data;
          const match = new Match(this.client, data);
          this.cache.set(id, match);
          resolve(match);
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
