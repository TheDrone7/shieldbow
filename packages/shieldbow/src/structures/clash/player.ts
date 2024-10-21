import { Client } from 'client';
import { ClashPlayerPosition, ClashPlayerRole, IClashTeamPlayer } from 'types';

/**
 * Represents a player in a clash tournament.
 */
export class ClashPlayer {
  #client: Client;
  /**
   * The summoner ID of the player.
   */
  readonly summonerId: string;
  /**
   * The ID of the team the player is in.
   */
  readonly teamId: string;
  /**
   * The position of the player in the team.
   */
  readonly position: ClashPlayerPosition;
  /**
   * The role of the player in the team.
   */
  readonly role: ClashPlayerRole;
  /**
   * Creates a new instance of the ClashPlayer class.
   * @param client - The shieldbow client.
   * @param data - The raw data of the player from the API.
   * @param teamId - The ID of the team the player is in.
   */
  constructor(client: Client, data: IClashTeamPlayer, teamId: string) {
    this.#client = client;
    this.summonerId = data.summonerId;
    this.teamId = teamId;
    this.position = data.position;
    this.role = data.role;
  }

  /**
   * Fetches the summoner of the player.
   */
  async fetchSummoner() {
    return this.#client.summoners.fetchBySummonerId(this.summonerId);
  }
}
