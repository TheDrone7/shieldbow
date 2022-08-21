import type { Client } from '../client';
import type { CurrentGameData, GameMap, GameMode, GameType, Queue } from '../types';
import { Collection } from '@discordjs/collection';
import { CurrentGameTeam } from './CurrentGameTeam';

/**
 * A representation of an ongoing game.
 */
export class CurrentGame {
  /**
   * The numerical ID of the game.
   *
   * Combining this with the {@link CurrentGame.platform} gives the full ID of the game.
   * The full ID can be used to fetch all the details of the match after it has ended using {@link MatchManager.fetch}.
   */
  readonly id: number;
  /**
   * The type of game.
   */
  readonly type: GameType;
  /**
   * The time at which the game started.
   */
  readonly startTimestamp: number;
  /**
   * The map on which the game is being played.
   */
  readonly map: GameMap;
  /**
   * The amount of time (in seconds) that has passed since the game started.
   */
  readonly length: number;
  /**
   * The platform (server) on which the game is being played.
   */
  readonly platform: string;
  /**
   * The game mode.
   */
  readonly mode: GameMode;
  /**
   * The type of queue for the game.
   */
  readonly queue: Queue;
  /**
   * A collection of the participating teams.
   */
  readonly teams: Collection<'red' | 'blue', CurrentGameTeam>;
  /**
   * The observer key for the game.
   */
  readonly observerKey: string;

  /**
   * Create a new Current Game instance.
   * @param client - The client that requested this data.
   * @param data - The raw current game data from the API.
   */
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
    this.observerKey = data.observers.encryptionKey;
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

  /**
   * The match ID for fetching the match details after the game is over.
   */
  get matchId(): string {
    return `${this.platform.toUpperCase()}_${this.id}`;
  }
}
