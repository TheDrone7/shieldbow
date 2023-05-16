import type { Client } from '../client';
import type { BaseManager, FetchOptions, TournamentData, TournamentPlayerFullData, TournamentTeamData } from '../types';
import { Tournament, TournamentPlayer, TournamentTeam } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A clash manager - to fetch and store clash tournaments and related data.
 *
 * Requires API key with access to `clash-v1` API.
 */
export class ClashManager implements BaseManager<Tournament> {
  /**
   * The client this clash manager belongs to.
   */
  readonly client: Client;

  /**
   * Creates a new clash manager.
   * @param client - The client this clash manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch a clash tournament by its ID.
   * @param id - The ID of the clash tournament.
   * @param options - The basic fetch options.
   */
  async fetch(id: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.debug(`Fetching clash tournament data for tournament ID: ${id} with options: `, opts);

    if (!ignoreCache) {
      this.client.logger?.trace(`Checking cache for clash tournament`);
      const exists = await this.client.cache.has(`clash:${id}`);
      if (exists) return this.client.cache.get<Tournament>(`clash:${id}`)!;
    }

    if (!ignoreStorage) {
      this.client.logger?.trace(`Checking storage for clash tournament`);
      const storage = this.client.storage.fetch<TournamentData>('clash', id.toString());
      const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
      if (stored) {
        this.client.logger?.trace(`Tournament found, parsing data and returning...`);
        const tournament = new Tournament(stored);
        if (cache) await this.client.cache.set(`clash:${id}`, tournament);
        return tournament;
      }
    }

    try {
      const response = await this.client.api.request(`/lol/clash/v1/tournaments/${id}`, {
        region: region!,
        api: 'CLASH',
        method: 'getTournamentById',
        regional: false,
        params: `Tournament ID: ${id}`
      });
      this.client.logger?.trace(`Fetching tournament from the API.`);
      const tournament = new Tournament(response.data);
      this.client.logger?.trace(`Tournament fetched, processing and returning...`);
      if (cache) await this.client.cache.set(`clash:${id}`, tournament);
      if (store) await this.client.storage.save(response.data, 'clash', id.toString());
      return tournament;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all upcoming and active clash tournaments.
   *
   * @param options - The basic fetch options (always fetches from the API, skipping cache and storage).
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { cache, store, region } = opts;
    this.client.logger?.debug(`Fetching all clash tournaments data with options: `, opts);

    try {
      const response = await this.client.api.request(`/lol/clash/v1/tournaments`, {
        region: region!,
        api: 'CLASH',
        method: 'getTournaments',
        regional: false,
        params: `No parameters`
      });
      this.client.logger?.trace(`Tournaments fetched, processing and returning...`);
      const tournaments: Tournament[] = [];
      for (const tournament of response.data) {
        const t = new Tournament(tournament);
        tournaments.push(t);
        if (cache) await this.client.cache.set(`clash:${t.id}`, t);
        if (store) await this.client.storage.save(tournament, 'clash', t.id.toString());
      }
      return tournaments;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a clash tournament by participating team's ID.
   * @param teamId - The ID of the team.
   * @param options - The basic fetch options (always fetches from API, skipping cache and storage).
   */
  async fetchByTeamId(teamId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { cache, store, region } = opts;
    this.client.logger?.debug(`Fetching clash tournament with team ${teamId} with options: `, opts);

    try {
      const response = await this.client.api.request(`/lol/clash/v1/tournaments/by-team/${teamId}`, {
        region: region!,
        api: 'CLASH',
        method: 'getTournamentByTeam',
        regional: false,
        params: `Team ID: ${teamId}`
      });
      this.client.logger?.trace(`Clash tournament fetched, processing and returning...`);
      const tournament = new Tournament(response.data);
      if (cache) await this.client.cache.set(`clash:${tournament.id}`, tournament);
      if (store) await this.client.storage.save(response.data, `clash`, tournament.id.toString());
      return tournament;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Fetch a team participating in a clash tournament by the team ID.
   * @param teamId - The ID of the team.
   * @param options - The basic fetch options.
   */
  async fetchTeam(teamId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.debug(`Fetching clash team ${teamId} with options: `, opts);
    try {
      if (!ignoreCache) {
        this.client.logger?.trace(`Checking cache for clash team`);
        const exists = await this.client.cache.has(`clash-team:${teamId}`);
        if (exists) return this.client.cache.get<TournamentTeam>(`clash-team:${teamId}`)!;
      }

      if (!ignoreStorage) {
        this.client.logger?.trace(`Checking storage for clash team`);
        const storage = this.client.storage.fetch<TournamentTeamData>('clash-team', teamId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          this.client.logger?.trace(`Team found, parsing data and returning...`);
          const team = new TournamentTeam(this.client, stored);
          if (cache) await this.client.cache.set(`clash-team:${teamId}`, team);
          return team;
        }
      }

      const response = await this.client.api.request(`/lol/clash/v1/teams/${teamId}`, {
        region: region!,
        api: 'CLASH',
        method: 'getTeamById',
        regional: false,
        params: `Team ID: ${teamId}`
      });
      this.client.logger?.trace(`Team fetched, parsing data and returning...`);
      const team = new TournamentTeam(this.client, response.data);
      if (cache) await this.client.cache.set(`clash-team:${teamId}`, team);
      if (store) await this.client.storage.save(response.data, 'clash-team', teamId);
      return team;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch participation info of a summoner in clash tournaments by the summoner ID.
   * @param summonerId - The ID of the summoner.
   * @param options - The basic fetch options.
   */
  async fetchPlayer(summonerId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);
    const { ignoreCache, ignoreStorage, cache, region, store } = opts;
    this.client.logger?.debug(`Fetching clash player ${summonerId} with options: `, opts);

    try {
      if (!ignoreCache) {
        this.client.logger?.trace(`Checking cache for clash player`);
        const exists = await this.client.cache.has(`clash-player:${summonerId}`);
        if (exists) return this.client.cache.get<TournamentPlayer[]>(`clash-player:${summonerId}`)!;
      }

      if (!ignoreStorage) {
        this.client.logger?.trace(`Checking storage for clash player`);
        const storage = this.client.storage.fetch<TournamentPlayerFullData[]>('clash-player', summonerId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          this.client.logger?.trace(`Player found, parsing data and returning...`);
          const players = stored.map((p) => new TournamentPlayer(this.client, p.teamId, p));
          if (cache) await this.client.cache.set(`clash-player:${summonerId}`, players);
          return players;
        }
      }

      this.client.logger?.trace(`Fetching player from API...`);
      const response = await this.client.api.request(`/lol/clash/v1/players/by-summoner/${summonerId}`, {
        region: region!,
        api: 'CLASH',
        method: 'getPlayersBySummoner',
        regional: false,
        params: `Summoner ID: ${summonerId}`
      });

      this.client.logger?.trace(`Player fetched, parsing data and returning...`);
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
