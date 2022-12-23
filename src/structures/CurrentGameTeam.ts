import type { Client } from '../client';
import type { CurrentGameBanData, CurrentGameParticipantData } from '../types';
import type { Champion } from './Champion';
import { CurrentGameParticipant } from './CurrentGameParticipant';

/**
 * Current game's team's champion ban information.
 */
export interface CurrentGameChampionBan {
  /**
   * The banned champion.
   */
  champion: Champion;
  /**
   * The order of the ban.
   */
  turn: number;
}

/**
 * A representation of a team in a live game.
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
  readonly bans: CurrentGameChampionBan[];
  /**
   * The team's participants.
   */
  readonly participants: CurrentGameParticipant[];

  /**
   * Creates a new Current Game Team instance.
   * @param client - The client requesting the data.
   * @param bans - The raw bans data for this team from the API.
   * @param participants - The raw participants data for this team from the API.
   * @param bannedChampions - The champions banned by this team.
   * @param participantsChampions - The champions being played by this team's participants.
   */
  constructor(
    client: Client,
    bans: CurrentGameBanData[],
    participants: CurrentGameParticipantData[],
    bannedChampions: Champion[],
    participantsChampions: Champion[]
  ) {
    this.id = participants[0].teamId;
    this.side = this.id === 100 ? 'blue' : 'red';
    this.bans = bans.map((b) => ({
      champion: bannedChampions.find((c) => c.key === b.championId)!,
      turn: b.pickTurn
    }));
    this.participants = participants.map(
      (p) => new CurrentGameParticipant(client, p, participantsChampions.find((c) => c.key === p.championId)!)
    );
  }
}
