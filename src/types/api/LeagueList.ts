import type { LeagueEntryData } from './LeagueEntry';
import type { QueueType, TierType } from '../LeagueConstants';

/**
 * The league list data as returned by the API.
 */
export interface LeagueListData {
  leagueId: string;
  entries: LeagueEntryData[];
  tier: TierType;
  name: string;
  queue: QueueType;
}
