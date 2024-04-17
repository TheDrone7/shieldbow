import { Locale } from '@shieldbow/web';
import { ChallengeState, ChallengeTracking } from './literal';

/**
 * The localized data for the challenge config.
 */
export interface ILocalizedChallengeConfig {
  description: string;
  name: string;
  shortDescription: string;
}

/**
 * The data for the challenge config.
 */
export interface IChallengeConfig {
  id: number;
  localizedNames: Record<Locale, ILocalizedChallengeConfig>;
  state: ChallengeState;
  tracking?: ChallengeTracking;
  startTimestamp?: number;
  endTimestamp?: number;
  leaderboard: boolean;
  thresholds: Record<string, number>;
}
