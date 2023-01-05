import type { DivisionType, QueueType, TierType } from '../LeagueConstants';

/**
 * The league entry data as returned by the API.
 */
export interface LeagueEntryData {
  leagueId: string;
  summonerId: string;
  summonerName: string;
  queueType: QueueType;
  tier: TierType;
  rank: DivisionType;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries?: {
    losses: number;
    progress: string;
    target: number;
    wins: number;
  };
}
