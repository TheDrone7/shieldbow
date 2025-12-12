import { IMatchParticipant } from 'types';

/**
 * A representation of the gold stats of a participant in a match.
 */
export class ParticipantGold {
  /**
   * The amount of gold earned by the participant.
   */
  readonly earned: number;
  /**
   * The amount of gold spent by the participant.
   */
  readonly spent: number;
  /**
   * The amount of gold remaining at the end of the game (not spent).
   */
  readonly remaining: number;

  /**
   * Creates a new participant gold instance.
   * @param data - The raw match participant data.
   */
  constructor(data: IMatchParticipant) {
    this.earned = data.goldEarned;
    this.spent = data.goldSpent;
    this.remaining = data.goldEarned - data.goldSpent;
  }
}
