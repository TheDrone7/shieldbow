import { INextSeasonMilestone, MasteryGrade } from 'types';

/**
 * Represents a champion mastery milestone in league of legends.
 */
export class ChampionMasteryMilestone {
  /**
   * The grades required to achieve this milestone.
   */
  readonly requiredGrades: Record<MasteryGrade, number>;
  /**
   * The number of marks rewarded for achieving this milestone.
   */
  readonly rewardMarks: number;
  /**
   * Whether this milestone is a bonus milestone.
   *
   * Bonus milestones are repeating milestones for farming mastery marks.
   */
  readonly isBonus: boolean;
  /**
   * The type of extra reward given for achieving this milestone.
   *
   * This is usually undefined but can be a string like "HEXTECH_CHEST" for some milestones.
   */
  readonly extraReward?: string;
  /**
   * The value of the extra reward given for achieving this milestone.
   *
   * Some sort of string (looks to be a UUID but no clear meaning yet | 29-06-2024)
   */
  readonly extraRewardValue?: string;
  /**
   * The maximum number of extra rewards that can be earned for achieving this milestone.
   */
  readonly maximumExtraReward?: number;

  /**
   * Creates a new ChampionMasteryMilestone instance.
   * @param data - The raw milestone data.
   */
  constructor(data: INextSeasonMilestone) {
    this.requiredGrades = data.requireGradeCounts;
    this.rewardMarks = data.rewardMarks;
    this.isBonus = data.bonus;
    this.extraReward = data.rewardConfig?.rewardType;
    this.extraRewardValue = data.rewardConfig?.rewardValue;
    this.maximumExtraReward = data.rewardConfig?.maximumReward;
  }
}
