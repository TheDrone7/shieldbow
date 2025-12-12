import { IMatchParticipant } from 'types';

/**
 * A representation of the multi-kill statistics for a participant in a League of Legends match.
 */
export class ParticipantMultiKills {
  /**
   * The number of double kills the participant has achieved in the match.
   */
  readonly doubleKills: number;
  /**
   * The largest multi kill achieved by the participant in the match.
   * This is the number of kills achieved in a single multi kill.
   *
   * For example, if the participant achieved a penta kill, this would be 5.
   */
  readonly largestMultiKill: number;
  /**
   * The number of penta kills the participant has achieved in the match.
   */
  readonly pentaKills: number;
  /**
   * The number of quadra kills the participant has achieved in the match.
   */
  readonly quadraKills: number;
  /**
   * The number of triple kills the participant has achieved in the match.
   */
  readonly tripleKills: number;
  /**
   * The number of unreal kills the participant has achieved in the match.
   * These were similar to other multi-kills, but with more than 5 kills in a row (6-7).
   *
   * @deprecated - This is a deprecated feature in League of Legends.
   */
  readonly unrealKills: number;

  /**
   * Creates a new instance of the ParticipantMultiKills class.
   * @param data - The raw match participant data from the API.
   */
  constructor(data: IMatchParticipant) {
    this.doubleKills = data.doubleKills;
    this.largestMultiKill = data.largestMultiKill;
    this.pentaKills = data.pentaKills;
    this.quadraKills = data.quadraKills;
    this.tripleKills = data.tripleKills;
    this.unrealKills = data.unrealKills ?? 0; // This is a deprecated feature in League of Legends.
  }
}
