import type { Client } from '../client';
import type { CurrentGameData, GameMap, GameMode, GameType, Queue } from '../types';
import Collection from '@discordjs/collection';
import { CurrentGameTeam } from './CurrentGameTeam';

export class CurrentGame {
  readonly id: number;
  readonly type: GameType;
  readonly startTimestamp: number;
  readonly map: GameMap;
  readonly length: number;
  readonly platform: string;
  readonly mode: GameMode;
  readonly queue: Queue;
  readonly teams: Collection<'red' | 'blue', CurrentGameTeam>;
  constructor(client: Client, data: CurrentGameData) {
    this.id = data.gameId;
    this.type = client.gameTypes.find((t) => t.gametype === data.gameType)!;
    this.startTimestamp = data.gameStartTime;
    this.map = client.maps.find((m) => m.mapId === data.mapId)!;
    this.length = data.gameLength;
    this.platform = data.platformId;
    this.mode = client.gameModes.find((m) => m.gameMode === data.gameMode)!;
    this.queue = client.queues.find((q) => q.queueId === data.gameQueueConfigId)!;
    this.teams = new Collection<'red' | 'blue', CurrentGameTeam>();
    this.teams.set(
      'blue',
      new CurrentGameTeam(
        client,
        data.bannedChampions.filter((c) => c.teamId === 100),
        data.participants.filter((p) => p.teamId === 100)
      )
    );
    this.teams.set(
      'red',
      new CurrentGameTeam(
        client,
        data.bannedChampions.filter((c) => c.teamId === 200),
        data.participants.filter((p) => p.teamId === 200)
      )
    );
  }
}
