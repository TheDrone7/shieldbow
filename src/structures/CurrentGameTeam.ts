import type { Client } from '../client';
import type { CurrentGameBanData, CurrentGameParticipantData } from '../types';
import type { Champion } from './Champion';
import { CurrentGameParticipant } from './CurrentGameParticipant';

/**
 * A class representing a team in a live game.
 */
export class CurrentGameTeam {
  /**
   * The team's ID.
   */
  readonly id: number;
  /**
   * The team's side.
   */
  readonly side: 'red' | 'blue';
  /**
   * The champions banned by this team.
   */
  readonly bans: {
    champion: Champion;
    turn: number;
  }[];
  /**
   * The team's participants.
   */
  readonly participants: CurrentGameParticipant[];
  constructor(client: Client, bans: CurrentGameBanData[], participants: CurrentGameParticipantData[]) {
    this.id = participants[0].teamId;
    this.side = this.id === 100 ? 'blue' : 'red';
    this.bans = bans.map((b) => ({
      champion: client.champions.cache.find((c) => c.key === b.championId)!,
      turn: b.pickTurn
    }));
    this.participants = participants.map((p) => new CurrentGameParticipant(client, p));
  }
}
