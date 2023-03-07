import type { TournamentTeamData } from '../../types';
import type { Client } from '../../client';
import { TournamentPlayer } from './TournamentPlayer';

/**
 * A representation of a team in a clash tournament.
 */
export class TournamentTeam {
  /**
   * The ID of the team.
   */
  readonly id: string;
  /**
   * The ID of the tournament this team is participating in.
   */
  readonly tournamentId: number;
  /**
   * The name of the team.
   */
  readonly name: string;
  /**
   * The icon being used to represent the team.
   */
  readonly icon: string;
  /**
   * The tier of the team.
   */
  readonly tier: number;
  /**
   * The summoner ID of the team's captain.
   */
  readonly captainId: string;
  /**
   * The abbreviation for the team's name.
   */
  readonly abbreviation: string;
  /**
   * The list of players in the team.
   */
  readonly players: TournamentPlayer[];

  /**
   * Creates a new tournament team instance.
   * @param client - The client that requested this data.
   * @param data - The raw tournament team data from the API.
   */
  constructor(client: Client, data: TournamentTeamData) {
    this.id = data.id;
    this.tournamentId = data.tournamentId;
    this.name = data.name;
    this.icon = `${client.cdnBase}${client.version}/img/profileicon/${data.iconId}.png`;
    this.tier = data.tier;
    this.captainId = data.captain;
    this.abbreviation = data.abbreviation;
    this.players = data.players.map((player) => new TournamentPlayer(client, this.id, player));
  }
}
