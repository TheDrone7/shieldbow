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
    return new Promise<Tournament>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`clash:${id}`);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(`clash:${id}`)!);
      else {
        const storage = this.client.storage.fetch<TournamentData>('clash', id.toString());
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) {
          const tournament = new Tournament(stored);
          if (cache) await this.client.cache.set(`clash:${id}`, tournament);
          resolve(tournament);
        } else {
          const response = await this.client.api
            .makeApiRequest(`/lol/clash/v1/tournaments/${id}`, {
              region: region!,
              name: 'Get tournament by tournament ID',
              regional: false,
              params: `Tournament ID: ${id}`
            })
            .catch(reject);
          if (response) {
            const tournament = new Tournament(response.data);
            if (cache) await this.client.cache.set(`clash:${id}`, tournament);
            if (store) await this.client.storage.save(response.data, 'clash', id.toString());
            resolve(tournament);
          }
        }
      }
    });
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
    return new Promise<Tournament[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/tournaments`, {
          region: region!,
          name: 'Get all upcoming and active tournaments',
          regional: false,
          params: `No parameters`
        })
        .catch(reject);
      if (response) {
        const tournaments: Tournament[] = [];
        for (const tournament of response.data) {
          const t = new Tournament(tournament);
          tournament.push(t);
          if (cache) await this.client.cache.set(`clash:${t.id}`, t);
          if (store) await this.client.storage.save(tournament, 'clash', t.id.toString());
        }
        resolve(tournaments);
      }
    });
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
    return new Promise<Tournament>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/tournaments/by-team/${teamId}`, {
          region: region!,
          name: 'Get tournament by team ID',
          regional: false,
          params: `Team ID: ${teamId}`
        })
        .catch(reject);
      if (response) {
        const tournament = new Tournament(response.data);
        if (cache) await this.client.cache.set(`clash:${tournament.id}`, tournament);
        if (store) await this.client.storage.save(response.data, `clash`, tournament.id.toString());
        resolve(tournament);
      }
    });
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
    return new Promise<TournamentTeam>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`clash-team:${teamId}`);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(`clash-team:${teamId}`)!);
      else {
        const storage = this.client.storage.fetch<TournamentTeamData>('clash-team', teamId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) {
          const team = new TournamentTeam(this.client, stored);
          if (cache) await this.client.cache.set(`clash-team:${teamId}`, team);
          resolve(team);
        } else {
          const response = await this.client.api
            .makeApiRequest(`/lol/clash/v1/teams/${teamId}`, {
              region: region!,
              name: 'Get team by team ID',
              regional: false,
              params: `Team ID: ${teamId}`
            })
            .catch(reject);
          if (response) {
            const team = new TournamentTeam(this.client, response.data);
            if (cache) await this.client.cache.set(`clash-team:${teamId}`, team);
            if (store) await this.client.storage.save(response.data, 'clash-team', teamId);
            resolve(team);
          }
        }
      }
    });
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
    return new Promise<TournamentPlayer[]>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`clash-player:${summonerId}`);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(`clash-player:${summonerId}`)!);
      else {
        const storage = this.client.storage.fetch<TournamentPlayerFullData[]>('clash-player', summonerId);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) {
          const players = stored.map((p) => new TournamentPlayer(this.client, p.teamId, p));
          if (cache) await this.client.cache.set(`clash-player:${summonerId}`, players);
          resolve(players);
        } else {
          const response = await this.client.api
            .makeApiRequest(`/lol/clash/v1/players/by-summoner/${summonerId}`, {
              region: region!,
              name: 'Get tournament players by summoner ID',
              regional: false,
              params: `Summoner ID: ${summonerId}`
            })
            .catch(reject);
          if (response) {
            const data = <TournamentPlayerFullData[]>response.data;
            const player = data.map((p) => new TournamentPlayer(this.client, p.teamId, p));
            if (cache) await this.client.cache.set(`clash-player:${summonerId}`, player);
            if (store) await this.client.storage.save(data, 'clash-player', summonerId);
            resolve(player);
          }
        }
      }
    });
  }
}
