import { ChallengeTier, IPlayerChallengeProgression } from 'types';

/**
 * The progression of a lol challenge by a player.
 */
export class PlayerChallengeProgress {
  /**
   * The ID of the challenge.
   */
  challengeId: number;
  /**
   * The percentile of the playerbase above the player for the challenge.
   */
  percentile: number;
  /**
   * The position (ranking) of the player in the challenge.
   *
   * Only available if the player is in apex tiers.
   * (unconfirmed)
   */
  position?: number;
  /**
   * The number of players in the same tier as the player.
   *
   * Only available if the player is in apex tiers.
   * (unconfirmed)
   */
  playersInTier?: number;
  /**
   * The tier of the challenge that the player has progressed to.
   */
  tier: ChallengeTier;
  /**
   * The value of the challenge's requirement that the player has achieved.
   */
  value: number;
  /**
   * The timestamp that the player achieved the current tier of the challenge.
   * If the player has not achieved any tier in the challenge (NONE), this will be 0.
   */
  achievedTime: number;

  /**
   * Creates a new instance of PlayerChallengeProgress.
   * @param data - The data to create the instance with.
   */
  constructor(data: IPlayerChallengeProgression) {
    this.challengeId = data.challengeId;
    this.percentile = data.percentile;
    this.position = data.position;
    this.playersInTier = data.playersInLevel;
    this.tier = data.level;
    this.value = data.value;
    this.achievedTime = data.achievedTime ?? 0;
  }

  /**
   * The date that the player achieved the current tier of the challenge.
   */
  get achievedAt() {
    return new Date(this.achievedTime);
  }

  /**
   * The percentage of the playerbase above the player for the challenge.
   */
  get progress() {
    return this.percentile * 100;
  }
}
