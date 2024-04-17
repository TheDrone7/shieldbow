import { ChallengeCategory, ChallengeTier } from './literal';

/**
 * The total points of a player's challenges.
 */
export interface IPlayerChallengesTotal {
  level: ChallengeTier;
  current: number;
  max: number;
  percentile: number;
}

/**
 * The progression of a player's challenge.
 */
export interface IPlayerChallengeProgression {
  challengeId: number;
  percentile: number;
  position?: number;
  playersInLevel?: number;
  level: ChallengeTier;
  value: number;
  achievedTime: number;
}

/**
 * The challenge-related preferences of a player's client.
 */
export interface IPlayerClientPreferences {
  bannerAccent: string;
  title: string;
  challengeIds: number[];
  crestBorder: string;
  prestigeCrestBorder: number;
}

/**
 * The raw data of a player's challenges.
 */
export interface IPlayerChallenge {
  totalPoints: IPlayerChallengesTotal;
  categoryPoints: Record<ChallengeCategory, IPlayerChallengesTotal>;
  challenges: IPlayerChallengeProgression[];
  preferences: IPlayerClientPreferences;
}
