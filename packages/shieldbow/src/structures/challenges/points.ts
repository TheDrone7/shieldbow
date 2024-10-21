import { ChallengeTier, IPlayerChallengesTotal } from 'types';

/**
 * Represents a player's challenge points overview.
 *
 * (Total challenge points or category challenge points).
 */
export class ChallengePoints {
  /**
   * The tier that the player has progressed to.
   */
  readonly tier: ChallengeTier;
  /**
   * The current amount of points the player has.
   */
  readonly current: number;
  /**
   * The maximum amount of points the player can earn.
   */
  readonly max: number;
  /**
   * The percentile of top players that the current player is a part of.
   *
   * ("The player is in the top {percentile} percentile of players.", 0-1)
   */
  readonly percentile: number;

  /**
   * Creates a new challenge points overview.
   * @param data - The raw challenge points data from the API.
   */
  constructor(data: IPlayerChallengesTotal) {
    this.tier = data.level;
    this.current = data.current;
    this.max = data.max;
    this.percentile = data.percentile;
  }

  /**
   * The progress of the player in the challenge.
   * (numerical value between 0 and 1, 0.5 = 50% progress)
   */
  get progress(): number {
    return this.current / this.max;
  }

  /**
   * The progress of the player in the challenge.
   * (text format)
   */
  get progressText(): string {
    return `${this.current}/${this.max}`;
  }

  /**
   * The remaining amount of points the player needs to reach the maximum.
   */
  get remaining(): number {
    return this.max - this.current;
  }

  /**
   * The percentage of top players that the current player is a part of.
   *
   * ("The player is in the top {percentage}% of players.", 0-100)
   */
  get percentage(): number {
    return this.percentile * 100;
  }
}
