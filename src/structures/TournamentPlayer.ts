import type { Client } from '../client';
import type { TournamentPlayerData } from '../types';

/**
 * A representation of a player in a clash tournament.
 */
export class TournamentPlayer {
  private readonly client: Client;
  /**
   * The ID of the team this player is on.
   */
  readonly teamId: string;
  /**
   * The summoner ID of this player.
   */
  readonly summonerId: string;
  /**
   * The role this player will be performing in the team - CAPTAIN or MEMBER.
   */
  readonly role: 'CAPTAIN' | 'MEMBER';
  /**
   * The position this player will be playing in the team.
   */
  readonly position: 'UNSELECTED' | 'FILL' | 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';

  /**
   * Creates a new tournament player instance.
   * @param client - The client that requested this data.
   * @param teamId - The ID of the team this player is on.
   * @param data - The raw player data from the API.
   */
  constructor(client: Client, teamId: string, data: TournamentPlayerData) {
    this.client = client;
    this.teamId = teamId;
    this.summonerId = data.summonerId;
    this.role = data.role;
    this.position = data.position;
  }

  /**
   * Use {@link SummonerManager.fetch} to fetch the summoner for this player.
   */
  get summoner() {
    return this.client.summoners.fetch(this.summonerId);
  }
}
