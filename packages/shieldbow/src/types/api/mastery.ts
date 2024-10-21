/**
 * The grades one can earn when playing a champion.
 */
export type MasteryGrade =
  | 'D-'
  | 'D'
  | 'D+'
  | 'C-'
  | 'C'
  | 'C+'
  | 'B-'
  | 'B'
  | 'B+'
  | 'A-'
  | 'A'
  | 'A+'
  | 'S-'
  | 'S'
  | 'S+';

/**
 * The raw reward configuration for a champion mastery.
 * (Received rewards at certain milestones in the mastery system)
 */
export interface IRewardConfig {
  rewardValue: string;
  rewardType: string;
  maximumReward: number;
}

/**
 * The raw next season milestone data received from the Riot API.
 */
export interface INextSeasonMilestone {
  requireGradeCounts: Record<MasteryGrade, number>;
  rewardMarks: number;
  bonus: boolean;
  rewardConfig?: IRewardConfig;
}

/**
 * The raw champion mastery data received from the Riot API.
 */
export interface IChampionMastery {
  puuid: string;
  championPointsUntilNextLevel: number;
  championId: number;
  lastPlayTime: number;
  championLevel: number;
  championPoints: number;
  championPointsSinceLastLevel: number;
  tokensEarned: number;
  markRequiredForNextLevel: number;
  championSeasonMilestone: number;
  milestoneGrades: MasteryGrade[];
  nextSeasonMilestone: INextSeasonMilestone;
}
