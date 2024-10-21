import { IMatchTeam } from './team';
import { IMatchParticipant } from './participant';

/**
 * The raw match metadata from the API.
 */
export interface IMatchMetadata {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

/**
 * The raw match info from the API.
 */
export interface IMatchInfo {
  endOfGameResult?: string;
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameId: number;
  gameMode: string;
  gameName: string;
  gameStartTimestamp: number;
  gameType: string;
  gameVersion: string;
  mapId: number;
  participants: IMatchParticipant[];
  platformId: string;
  queueId: number;
  teams: IMatchTeam[];
  tournamentCode?: string;
}

/**
 * The raw match data from the API.
 */
export interface IMatch {
  readonly metadata: IMatchMetadata;
  readonly info: IMatchInfo;
}
