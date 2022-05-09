import type { Client } from '../client';
import type { BaseManager, TournamentData, TournamentPlayerFullData } from '../types';
import { Tournament, TournamentPlayer, TournamentTeam } from '../structures';
import Collection from '@discordjs/collection';

/**
 * A clash manager - to fetch and store clash tournaments and related data.
 */
export class ClashManager implements BaseManager<Tournament> {
  /**
   * The in-memory cache of tournaments.
   */
  readonly cache: Collection<number, Tournament>;
  /**
   * The client that instantiated the manager.
   */
  readonly client: Client;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<number, Tournament>();
  }

  /**
   * Fetches a tournament by its ID.
   * @param id - The ID of the tournament.
   * @param options - The basic fetch options.
   */
  fetch(id: number, options: { force: boolean } = { force: false }) {
    return new Promise<Tournament>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/clash/v1/tournaments/${id}`, {
            name: 'Get tournament by tournament ID',
            regional: false,
            params: `Tournament ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const tournament = new Tournament(response.data);
          this.cache.set(id, tournament);
          resolve(tournament);
        }
      }
    });
  }

  /**
   * Fetch all upcoming and active tournaments.
   */
  fetchAll() {
    return new Promise<Tournament[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/tournaments`, {
          name: 'Get all upcoming and active tournaments',
          regional: false,
          params: `No parameters`
        })
        .catch(reject);
      if (response) {
        const tournaments = response.data.map((d: TournamentData) => new Tournament(d));
        tournaments.forEach((t: Tournament) => this.cache.set(t.id, t));
        resolve(tournaments);
      }
    });
  }

  /**
   * Fetch tournament by participating team's ID.
   * @param teamId - The ID of the team.
   */
  fetchByTeamId(teamId: string) {
    return new Promise<Tournament>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/tournaments/by-team/${teamId}`, {
          name: 'Get tournament by team ID',
          regional: false,
          params: `Team ID: ${teamId}`
        })
        .catch(reject);
      if (response) {
        const tournament = new Tournament(response.data);
        this.cache.set(tournament.id, tournament);
        resolve(tournament);
      }
    });
  }

  /**
   * Fetch a team participating in a tournament by the team ID.
   * @param teamId - The ID of the team.
   */
  fetchTeam(teamId: string) {
    return new Promise<TournamentTeam>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/teams/${teamId}`, {
          name: 'Get team by team ID',
          regional: false,
          params: `Team ID: ${teamId}`
        })
        .catch(reject);
      if (response) {
        const team = new TournamentTeam(this.client, response.data);
        resolve(team);
      }
    });
  }

  /**
   * Fetch participation info of a summoner in tournaments by the summoner ID.
   * @param summonerId - The ID of the summoner.
   */
  fetchPlayer(summonerId: string) {
    return new Promise<TournamentPlayer[]>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/clash/v1/players/by-summoner/${summonerId}`, {
          name: 'Get tournament player by summoner ID',
          regional: false,
          params: `Summoner ID: ${summonerId}`
        })
        .catch(reject);
      if (response) {
        const player = response.data.map(
          (p: TournamentPlayerFullData) => new TournamentPlayer(this.client, p.teamId, p)
        );
        resolve(player);
      }
    });
  }
}
