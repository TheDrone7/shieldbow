import { DivisionType, QueueType, TierType } from 'types';

/**
 * The raw mini series data from the API.
 */
export interface IMiniSeries {
  losses: number;
  progress: string;
  target: number;
  wins: number;
}

/**
 * The raw league item data from the API.
 */
export interface ILeagueItem {
  freshBlood: boolean;
  wins: number;
  summonerName: string;
  miniSeries?: IMiniSeries;
  inactive: boolean;
  veteran: boolean;
  hotStreak: boolean;
  rank: DivisionType;
  leaguePoints: number;
  losses: number;
  summonerId: string;
}

/**
 * The raw league list data from the API.
 */
export interface ILeagueList {
  leagueId: string;
  tier: TierType;
  entries: ILeagueItem[];
  queue: QueueType;
  name: string;
}

/**
 * The raw league entry data from the API.
 */
export interface ILeagueEntry {
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
  miniSeries?: IMiniSeries;
}
