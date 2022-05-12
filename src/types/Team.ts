import type { TeamBanData } from './ChampionBan';

/**
 * The individual objective data as returned by the API.
 */
export interface TeamObjectiveData {
  first: boolean;
  kills: number;
}

/**
 * The match team objective data as returned by the API.
 */
export interface TeamObjectivesData {
  baron: TeamObjectiveData;
  champion: TeamObjectiveData;
  dragon: TeamObjectiveData;
  inhibitor: TeamObjectiveData;
  riftHerald: TeamObjectiveData;
  tower: TeamObjectiveData;
}

/**
 * The match team data as returned by the API.
 */
export interface TeamData {
  bans: TeamBanData[];
  objectives: TeamObjectivesData;
  teamId: number;
  win: boolean;
}
