import type { LeagueEntryData } from './LeagueEntry';
import type { QueueType, TierType } from './LeagueConstants';

export interface LeagueListData {
  leagueId: string;
  entries: LeagueEntryData[];
  tier: TierType;
  name: string;
  queue: QueueType;
}
