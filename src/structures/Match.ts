import type { Client } from '../client';
import type { GameMap, GameMode, GameType, MatchData, Queue } from '../types';

export class Match {
  readonly id: string;
  readonly version: string;
  readonly createdTimestamp: number;
  readonly startTimestamp: number;
  readonly duration: number;
  readonly endTimestamp: number;
  readonly gameId: number;
  readonly gameMode: GameMode;
  readonly gameName: string;
  readonly gameType: GameType;
  readonly gameVersion: string;
  readonly mapId: GameMap;
  readonly platformId: string;
  readonly queueId: Queue;
  readonly tournamentCode: string;
  constructor(client: Client, data: MatchData) {
    this.id = data.metadata.matchId;
    this.version = data.metadata.dataVersion;
    this.createdTimestamp = data.info.gameCreation;
    this.startTimestamp = data.info.gameStartTimestamp;
    this.duration = data.info.gameDuration;
    this.endTimestamp = data.info.gameEndTimestamp;
    this.gameId = data.info.gameId;
    this.gameMode = client.gameModes.find((m) => m.gameMode === data.info.gameMode)!;
    this.gameName = data.info.gameName;
    this.gameType = client.gameTypes.find((t) => t.gametype === data.info.gameType)!;
    this.gameVersion = data.info.gameVersion;
    this.mapId = client.maps.find((m) => m.mapId === data.info.mapId)!;
    this.platformId = data.info.platformId;
    this.queueId = client.queues.find((q) => q.queueId === data.info.queueId)!;
    this.tournamentCode = data.info.tournamentCode;
  }
}
