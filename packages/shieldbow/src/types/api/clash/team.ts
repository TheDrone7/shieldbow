import { IClashPlayer } from './player';

/**
 * The raw data of a player in a team in a Clash tournament.
 */
export type IClashTeamPlayer = Omit<IClashPlayer, 'teamId'>;
/**
 * The raw data of a team in a Clash tournament.
 */
export interface IClashTeam {
  id: string;
  tournamentId: number;
  name: string;
  iconId: number;
  tier: number;
  captain: string;
  abbreviation: string;
  players: IClashTeamPlayer[];
}
