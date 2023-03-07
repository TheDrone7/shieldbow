import type { Locales, TierType } from '../index';

/**
 * The raw challenge name/description data.
 */
export interface LocalizedChallengeData {
  name: string;
  description: string;
  shortDescription: string;
}

/**
 * The raw challenge name/description data mapped by locale.
 */
export type LocalizedChallengeNameData = {
  [key in Locales]: LocalizedChallengeData;
};

/**
 * The raw challenge config data.
 */
export interface ChallengeConfigData {
  id: number;
  localizedNames: LocalizedChallengeNameData;
  state: 'ENABLED' | 'DISABLED';
  leaderboard: boolean;
  thresholds: {
    [key in TierType]: number;
  };
}
