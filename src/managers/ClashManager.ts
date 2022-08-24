import type { Client } from '../client';
import type { BaseManager, FetchOptions, TournamentData, TournamentPlayerFullData } from '../types';
import { Tournament, TournamentPlayer, TournamentTeam } from '../structures';
import { Collection } from '@discordjs/collection';

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
  readonly cache: Collection<number, Tournament>;
  /**
   * The in-memory cache of the tournament teams.
   *
   * Only use this if you absolutely must.
   * Prioritize using {@link ClashManager.fetchTeam | fetchTeam} instead.
   */
  readonly cachedTeams: Collection<string, TournamentTeam>;
  /**
   * The in-memory cache of the tournament players.
   *
   * Only use this if you absolutely must.
   * Prioritize using {@link ClashManager.fetchPlayer | fetchPlayer} instead.
   */
  readonly cachedPlayers: Collection<string, TournamentPlayer[]>;

  /**
   * Creates a new clash manager.
   * @param client - The client that instantiated the manager.
   */
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<number, Tournament>();
    this.cachedTeams = new Collection<string, TournamentTeam>();
    this.cachedPlayers = new Collection<string, TournamentPlayer[]>();
  }

  /**
   * Fetches a tournament by its ID.
   * @param id - The ID of the tournament.
   * @param options - The basic fetch options.
   */
  fetch(id: number, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Tournament>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/clash/v1/tournaments/${id}`, {
            region,
            name: 'Get tournament by tournament ID',
            regional: false,
            params: `Tournament ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const tournament = new Tournament(response.data);
          if (cache) this.cache.set(id, tournament);
          resolve(tournament);
        }
      }
    });
  }

  /**
   * Fetch all upcoming and active tournaments.
   *
   * @param options - The basic fetch options (force is ignored, always true).
   */
  fetchAll(options?: FetchOptions) {
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Tournament[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/tournaments`, {
          region,
          name: 'Get all upcoming and active tournaments',
          regional: false,
          params: `No parameters`
        })
        .catch(reject);
      if (response) {
        const tournaments = response.data.map((d: TournamentData) => new Tournament(d));
        if (cache) tournaments.forEach((t: Tournament) => this.cache.set(t.id, t));
        resolve(tournaments);
      }
    });
  }

  /**
   * Fetch tournament by participating team's ID.
   * @param teamId - The ID of the team.
   * @param options - The basic fetch options (force is ignored, always true).
   */
  fetchByTeamId(teamId: string, options?: FetchOptions) {
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Tournament>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/tournaments/by-team/${teamId}`, {
          region,
          name: 'Get tournament by team ID',
          regional: false,
          params: `Team ID: ${teamId}`
        })
        .catch(reject);
      if (response) {
        const tournament = new Tournament(response.data);
        if (cache) this.cache.set(tournament.id, tournament);
        resolve(tournament);
      }
    });
  }

  /**
   * Fetch a team participating in a tournament by the team ID.
   * @param teamId - The ID of the team.
   * @param options - The basic fetch options.
   */
  fetchTeam(teamId: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<TournamentTeam>(async (resolve, reject) => {
      if (this.cachedTeams.has(teamId) && !force) resolve(this.cachedTeams.get(teamId)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/clash/v1/teams/${teamId}`, {
            region,
            name: 'Get team by team ID',
            regional: false,
            params: `Team ID: ${teamId}`
          })
          .catch(reject);
        if (response) {
          const team = new TournamentTeam(this.client, response.data);
          if (cache) this.cachedTeams.set(teamId, team);
          resolve(team);
        }
      }
    });
  }

  /**
   * Fetch participation info of a summoner in tournaments by the summoner ID.
   * @param summonerId - The ID of the summoner.
   * @param options - The basic fetch options.
   */
  fetchPlayer(summonerId: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<TournamentPlayer[]>(async (resolve, reject) => {
      if (this.cachedPlayers.has(summonerId) && !force) resolve(this.cachedPlayers.get(summonerId)!);
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/players/by-summoner/${summonerId}`, {
          region,
          name: 'Get tournament player by summoner ID',
          regional: false,
          params: `Summoner ID: ${summonerId}`
        })
        .catch(reject);
      if (response) {
        const data = <TournamentPlayerFullData[]>response.data;
        const player = data.map((p) => new TournamentPlayer(this.client, p.teamId, p));
        if (cache) this.cachedPlayers.set(summonerId, player);
        resolve(player);
      }
    });
  }
}
