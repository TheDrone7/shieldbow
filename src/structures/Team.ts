import type { Client } from '../client';
import type { ParticipantData, TeamData, TeamObjectivesData } from '../types';
import type { Champion } from './Champion';
import { Participant } from './Participant';

/**
 * A representation of a team in a match.
 */
export class Team {
  /**
   * The ID of the team.
   */
  readonly id: number;
  /**
   * The champions banned by the team.
   */
  readonly bans: {
    /**
     * The numerical order in which the champion was banned.
     */
    order: number;
    /**
     * The banned champion.
     */
    champion: Champion;
  }[];
  /**
   * The objectives secured by the team.
   */
  readonly objectives: TeamObjectivesData;
  /**
   * Whether the team won the match.
   */
  readonly win: boolean;
  /**
   * The participants in the team.
   */
  readonly participants: Participant[];
  constructor(client: Client, data: TeamData, participants: ParticipantData[]) {
    this.id = data.teamId;
    this.bans = data.bans.map((b) => ({
      order: b.pickTurn,
      champion: client.champions.findByKey(b.championId)!
    }));
    this.objectives = data.objectives;
    this.participants = participants.map((p) => new Participant(client, p));
    this.win = data.win;
  }
}
