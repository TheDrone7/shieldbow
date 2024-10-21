/**
 * The raw match team ban data from the API.
 */
export interface IMatchTeamBan {
  championId: number;
  pickTurn: number;
}

/**
 * The valid team objectives.
 */
export type TeamObjective = 'baron' | 'champion' | 'dragon' | 'horde' | 'inhibitor' | 'riftHerald' | 'tower';

/**
 * The raw match team objective stats from the API.
 */
export interface IMatchTeamObjective {
  first: boolean;
  kills: number;
}

/**
 * The raw match team data from the API.
 */
export interface IMatchTeam {
  teamId: number;
  win: boolean;
  bans: IMatchTeamBan[];
  objectives: Record<TeamObjective, IMatchTeamObjective>;
}
