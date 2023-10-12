import { TierType } from './tier';

/**
 * Raw data for a challenge's icons
 */
export type ChallengeLevelToIconPath = {
  [key in Exclude<TierType, 'EMERALD'>]: string;
};

/**
 * Raw data for a challenge's thresholds
 */
export interface IThresholdReward {
  category: string;
  quantity: number;
  title: string;
}

/**
 * Raw data for a challenge's thresholds
 */
export interface IThresholdDetails {
  value: number;
  rewards?: IThresholdReward[];
}

/**
 * Raw data for a challenge's thresholds
 */
export type ChallengeThreshold = {
  [key in Exclude<TierType, 'EMERALD'>]: IThresholdDetails;
};

/**
 * Raw data for a challenge
 */
export interface IDDragonChallenge {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  hasLeaderboard: boolean;
  levelToIconPath: ChallengeLevelToIconPath;
  threshold: ChallengeThreshold;
}
