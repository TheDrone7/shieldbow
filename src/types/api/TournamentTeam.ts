import type { TournamentPlayerData } from './TournamentPlayer';

/**
 * The clash tournament team data as returned by the API.
 */
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
