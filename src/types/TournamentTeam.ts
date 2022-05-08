import type { TournamentPlayerData } from './TournamentPlayer';

export interface TournamentTeamData {
  id: string;
  tournamentId: number;
  name: string;
  iconId: number;
  tier: number;
  captain: string;
  abbreviation: string;
  players: TournamentPlayerData[];
}
