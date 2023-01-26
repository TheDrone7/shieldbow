import type { Client } from '../client';
import type { BaseManager, FetchOptions, TournamentData, TournamentPlayerFullData, TournamentTeamData } from '../types';
import { Tournament, TournamentPlayer, TournamentTeam } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A clash manager - to fetch and store clash tournaments and related data.
 */
export class ClashManager implements BaseManager<Tournament> {
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;
  /**
   * The in-memory cache of tournaments.
   *
   * Only use this if you absolutely must.
   * Prioritize using
   * {@link ClashManager.fetch | fetch},
   * {@link ClashManager.fetchByTeamId | fetchByTeamId} or
   * {@link ClashManager.fetchAll | fetchAll}
   * instead.
   */

  /**
   * Creates a new clash manager.
   * @param client - The client that instantiated the manager.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetches a tournament by its ID.
   * @param id - The ID of the tournament.
   * @param options - The basic fetch options.
   */
  async fetch(id: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching clash tournament data for tournament ID: ${id} with options: `, opts);

    if (!ignoreCache) {
      const exists = await this.client.cache.has(`clash:${id}`);
      if (exists) return this.client.cache.get<Tournament>(`clash:${id}`)!;
    }

    if (!ignoreStorage) {
      const storage = this.client.storage.fetch<TournamentData>('clash', id.toString());
      const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
      if (stored) {
        const tournament = new Tournament(stored);
        if (cache) await this.client.cache.set(`clash:${id}`, tournament);
        return tournament;
      }
    }

    try {
      const response = await this.client.api.makeApiRequest(`/lol/clash/v1/tournaments/${id}`, {
        region: region!,
        name: 'Get tournament by tournament ID',
        regional: false,
        params: `Tournament ID: ${id}`
      });
      const tournament = new Tournament(response.data);
      if (cache) await this.client.cache.set(`clash:${id}`, tournament);
      if (store) await this.client.storage.save(response.data, 'clash', id.toString());
      return tournament;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all upcoming and active tournaments.
   *
   * @param options - The basic fetch options (force is ignored, always true).
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { cache, store, region } = opts;
    this.client.logger?.trace(`Fetching all clash tournaments data with options: `, { cache, region });

    try {
      const response = await this.client.api.makeApiRequest(`/lol/clash/v1/tournaments`, {
        region: region!,
        name: 'Get all upcoming and active tournaments',
        regional: false,
        params: `No parameters`
      });
      const tournaments: Tournament[] = [];
      for (const tournament of response.data) {
        const t = new Tournament(tournament);
        tournament.push(t);
        if (cache) await this.client.cache.set(`clash:${t.id}`, t);
        if (store) await this.client.storage.save(tournament, 'clash', t.id.toString());
      }
      return tournaments;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch tournament by participating team's ID.
   * @param teamId - The ID of the team.
   * @param options - The basic fetch options (always fetches from API).
   */
  async fetchByTeamId(teamId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { cache, store, region } = opts;
    this.client.logger?.trace(`Fetching clash tournament with team ${teamId} with options: `, { cache, region });

    try {
      const response = await this.client.api.makeApiRequest(`/lol/clash/v1/tournaments/by-team/${teamId}`, {
        region: region!,
        name: 'Get tournament by team ID',
        regional: false,
        params: `Team ID: ${teamId}`
      });
      const tournament = new Tournament(response.data);
      if (cache) await this.client.cache.set(`clash:${tournament.id}`, tournament);
      if (store) await this.client.storage.save(response.data, `clash`, tournament.id.toString());
      return tournament;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Fetch a team participating in a tournament by the team ID.
   * @param teamId - The ID of the team.
   * @param options - The basic fetch options.
   */
  async fetchTeam(teamId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching clash team ${teamId} with options: `, opts);
    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`clash-team:${teamId}`);
        if (exists) return this.client.cache.get<TournamentTeam>(`clash-team:${teamId}`)!;
      }

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<TournamentTeamData>('clash-team', teamId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const team = new TournamentTeam(this.client, stored);
          if (cache) await this.client.cache.set(`clash-team:${teamId}`, team);
          return team;
        }
      }

      const response = await this.client.api.makeApiRequest(`/lol/clash/v1/teams/${teamId}`, {
        region: region!,
        name: 'Get team by team ID',
        regional: false,
        params: `Team ID: ${teamId}`
      });
      const team = new TournamentTeam(this.client, response.data);
      if (cache) await this.client.cache.set(`clash-team:${teamId}`, team);
      if (store) await this.client.storage.save(response.data, 'clash-team', teamId);
      return team;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch participation info of a summoner in tournaments by the summoner ID.
   * @param summonerId - The ID of the summoner.
   * @param options - The basic fetch options.
   */
  async fetchPlayer(summonerId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { ignoreCache, ignoreStorage, cache, region, store } = opts;
    this.client.logger?.trace(`Fetching clash player ${summonerId} with options: `, opts);

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`clash-player:${summonerId}`);
        if (exists) return this.client.cache.get<TournamentPlayer[]>(`clash-player:${summonerId}`)!;
      }

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<TournamentPlayerFullData[]>('clash-player', summonerId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const players = stored.map((p) => new TournamentPlayer(this.client, p.teamId, p));
          if (cache) await this.client.cache.set(`clash-player:${summonerId}`, players);
          return players;
        }
      }

      const response = await this.client.api.makeApiRequest(`/lol/clash/v1/players/by-summoner/${summonerId}`, {
        region: region!,
        name: 'Get tournament players by summoner ID',
        regional: false,
        params: `Summoner ID: ${summonerId}`
      });

      const data = <TournamentPlayerFullData[]>response.data;
      const player = data.map((p) => new TournamentPlayer(this.client, p.teamId, p));
      if (cache) await this.client.cache.set(`clash-player:${summonerId}`, player);
      if (store) await this.client.storage.save(data, 'clash-player', summonerId);
      return player;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
