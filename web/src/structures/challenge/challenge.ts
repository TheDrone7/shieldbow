import { Collection } from '@discordjs/collection';
import { IDDragonChallenge, TierType } from 'types';

/**
 * Represents a challenge in league of legends
 */
export class Challenge {
  /**
   * The challenge's id
   */
  readonly id: number;
  /**
   * The challenge's name
   */
  readonly name: string;
  /**
   * The challenge's (short) description
   */
  readonly description: string;
  /**
   * The challenge's (detailed / long) description
   */
  readonly details: string;
  /**
   * Whether the challenge has a leaderboard
   */
  readonly hasLeaderboard: boolean;
  /**
   * The challenge's icons' URLs, mapped by tier
   */
  readonly icons: Collection<Exclude<TierType, 'EMERALD'>, string>;
  /**
   * The challenge's thresholds, mapped by tier
   *
   * This is the value you need to achieve to reach the tier
   */
  readonly thresholds: Collection<Exclude<TierType, 'EMERALD'>, number>;
  /**
   * Whether the challenge has rewards
   */
  readonly hasRewards: boolean = false;
  /**
   * The title you are rewarded when you meet the requirements.
   * Paired with `rewardTier`.
   *
   * (Only available if `hasRewards` is true)
   */
  readonly rewardedTitle?: string;
  /**
   * The tier you need to reach to get the rewarded title.
   * Paired with `rewardedTitle`.
   *
   * (Only available if `hasRewards` is true)
   */
  readonly rewardTier?: Exclude<TierType, 'EMERALD'>;

  /**
   * Creates a new challenge
   * @param data - The challenge's raw data from DataDragon
   */
  constructor(data: IDDragonChallenge) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.details = data.shortDescription;
    this.hasLeaderboard = data.hasLeaderboard;
    this.icons = new Collection<Exclude<TierType, 'EMERALD'>, string>();
    this.thresholds = new Collection<Exclude<TierType, 'EMERALD'>, number>();

    for (const [key, value] of Object.entries(data.levelToIconPath))
      this.icons.set(key as Exclude<TierType, 'EMERALD'>, value);
    for (const [key, value] of Object.entries(data.threshold)) {
      this.thresholds.set(key as Exclude<TierType, 'EMERALD'>, value.value);

      // TODO: So far, the only rewards seem to be titles
      // TODO: Needs to be kept an eye upon.
      if (value.rewards) {
        this.hasRewards = true;
        this.rewardedTitle = value.rewards[0].title;
        this.rewardTier = key as Exclude<TierType, 'EMERALD'>;
      }
    }
  }
}
