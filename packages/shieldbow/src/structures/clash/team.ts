import { Client } from 'client';
import { ClashPlayer } from './player';
import { IClashTeam } from 'types';

/**
 * Represents a team in a clash tournament.
 */
export class ClashTeam {
  #client: Client;
  /**
   * The ID of the team.
   */
  readonly id: string;
  /**
   * The ID of the tournament the team is in.
   */
  readonly tournamentId: number;
  /**
   * The name of the team.
   */
  readonly name: string;
  /**
   * The ID of the team's icon.
   */
  readonly iconId: number;
  /**
   * The tier of the team.
   *
   * This is different from solo queue tiers, this is the clash tier of the team.
   */
  readonly tier: number;
  /**
   * The summoner ID of the team captain.
   */
  readonly captainId: string;
  /**
   * The abbreviated name of the team.
   */
  readonly abbreviation: string;
  /**
   * The players in the team.
   */
  readonly players: ClashPlayer[];

  /**
   * Creates a new instance of the ClashTeam class.
   * @param client - The shieldbow client.
   * @param data - The raw data of the team from the API.
   */
  constructor(client: Client, data: IClashTeam) {
    this.#client = client;
    this.id = data.id;
    this.tournamentId = data.tournamentId;
    this.name = data.name;
    this.iconId = data.iconId;
    this.tier = data.tier;
    this.captainId = data.captain;
    this.abbreviation = data.abbreviation;
    this.players = data.players.map((player) => new ClashPlayer(client, player, this.id));
  }

  /**
   * Fetches the captain of the team.
   */
  async fetchCaptain() {
    return this.#client.summoners.fetchBySummonerId(this.captainId);
  }
}
