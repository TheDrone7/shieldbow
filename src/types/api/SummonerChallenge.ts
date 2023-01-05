import type { TierType } from '../LeagueConstants';

/**
 * The raw overview of a summoner's challenge data.
 */
export interface TotalChallengePointsData {
  level: TierType;
  current: number;
  max: number;
  percentile: number;
}

/**
 * The category names for challenge categories.
 */
export type CategoryName = 'IMAGINATION' | 'TEAMWORK' | 'EXPERTISE' | 'COLLECTION' | 'VETERANCY';

/**
 * The raw challenge category data.
 */
export interface ChallengeCategoryData {
  level: TierType;
  current: number;
  max: number;
  percentile: number;
}

/**
 * The raw challenge progression data.
 */
export interface ChallengeProgressionData {
  challengeId: number;
  percentile: number;
  level: TierType;
  value: number;
  achievedTime: number;
}

/**
 * The raw challenge preferences data.
 */
export interface ChallengePreferencesData {
  bannerAccent: string;
  title: string;
  challengeIds: number[];
}

/**
 * The raw challenge data for a summoner.
 */
export interface SummonerChallengeData {
  totalPoints: TotalChallengePointsData;
  categoryPoints: { [key in CategoryName]: ChallengeCategoryData };
  challenges: ChallengeProgressionData[];
  preferences: ChallengePreferencesData;
}
