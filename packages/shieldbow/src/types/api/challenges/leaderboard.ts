import { ChallengeTier } from './literal';

/**
 * The level (tier) to filter the challenge leaderboard by.
 */
export type ChallengeApexLevel = ChallengeTier | 'HIGHEST' | 'LOWEST' | 'HIGHEST_NOT_LEADERBOARD_ONLY';

/**
 * Further fetching options for challenge leaderboard.
 */
export interface ChallengeLeaderboardOptions {
  limit?: number;
}

/**
 * A challenge leaderboard entry.
 */
export interface IChallengeLeaderboardEntry {
  puuid: string;
  value: number;
  position: number;
}
