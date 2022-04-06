import type { LeagueEntryData } from './LeagueEntry';

export interface LeagueListData {
  leagueId: string;
  entries: LeagueEntryData[];
  tier: string;
  name: string;
  queue: string;
}
