import { IMatchParticipant } from 'types';

/**
 * A representation of the minions related stats of a match participant.
 */
export class ParticipantMinions {
  /**
   * The number of neutral minions killed by the participant.
   *
   * This includes jungle monsters and other neutral monsters such as pets or neutral objectives.
   */
  readonly neutralKilled: number;
  /**
   * The number of lane minions killed by the participant.
   */
  readonly laneKilled: number;
  /**
   * The total creep score of the participant as shown in the game.
   *
   * This is the sum of lane minions and neutral minions killed.
   */
  readonly totalCreepScore: number;
  /**
   * The number of neutral minions killed by the participant in their own team's jungle.
   */
  readonly allyJungle: number;
  /**
   * The number of neutral minions killed by the participant in the enemy team's jungle.
   */
  readonly enemyJungle: number;

  /**
   * Creates a new instance of the ParticipantMinions class.
   * @param data - The raw match participant data from the API.
   */
  constructor(data: IMatchParticipant) {
    this.neutralKilled = data.neutralMinionsKilled;
    this.laneKilled = data.totalMinionsKilled;
    this.totalCreepScore = data.totalMinionsKilled + data.neutralMinionsKilled;
    this.allyJungle = data.totalAllyJungleMinionsKilled;
    this.enemyJungle = data.totalEnemyJungleMinionsKilled;
  }
}
