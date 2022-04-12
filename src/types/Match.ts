import type { ParticipantData } from './Participant';
import type { TeamData } from './Team';

export interface MatchData {
  metadata: {
    dataVersion: string;
    matchId: string;
    participants: string[];
  };
  info: {
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
    participants: ParticipantData[];
    platformId: string;
    queueId: number;
    teams: TeamData[];
    tournamentCode: string;
  };
}
