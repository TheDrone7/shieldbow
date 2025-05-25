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
export type TeamObjective =
  | 'atakhan'
  | 'baron'
  | 'champion'
  | 'dragon'
  | 'horde'
  | 'inhibitor'
  | 'riftHerald'
  | 'tower';

/**
 * The valid team feats.
 */
export type TeamFeat = 'EPIC_MONSTER_KILL' | 'FIRST_BLOOD' | 'FIRST_TURRET';

/**
 * The raw match team objective stats from the API.
 */
export interface IMatchTeamObjective {
  first: boolean;
  kills: number;
}

/**
 * The raw match team feat data from the API.
 */
export interface IMatchTeamFeat {
  featState: number;
}

/**
 * The raw match team data from the API.
 */
export interface IMatchTeam {
  teamId: number;
  win: boolean;
  bans: IMatchTeamBan[];
  objectives: Record<TeamObjective, IMatchTeamObjective>;
  feats: Record<TeamFeat, IMatchTeamFeat>;
}
