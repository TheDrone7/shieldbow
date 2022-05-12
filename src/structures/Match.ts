import type { Client } from '../client';
import type { GameMap, GameMode, GameType, MatchData, Queue } from '../types';
import Collection from '@discordjs/collection';
import { Team } from './Team';

/**
 * A representation of a league of legends match.
 */
export class Match {
  /**
   * The match ID.
   */
  readonly id: string;
  /**
   * The data version of the match.
   */
  readonly version: string;
  /**
   * The timestamp of creation of the match (before summoners spawn on the rift).
   */
  readonly createdTimestamp: number;
  /**
   * The timestamp of the beginning of the match (when summoners spawn on the rift).
   */
  readonly startTimestamp: number;
  /**
   * The duration of the match (in seconds).
   */
  readonly duration: number;
  /**
   * The timestamp of the end of the match.
   */
  readonly endTimestamp: number;
  /**
   * The ID of the game.
   */
  readonly gameId: number;
  /**
   * The game mode for the match.
   */
  readonly gameMode: GameMode;
  /**
   * The name of the match.
   */
  readonly gameName: string;
  /**
   * The type of game.
   */
  readonly gameType: GameType;
  /**
   * The version of the game.
   */
  readonly gameVersion: string;
  /**
   * The map on which the match was played.
   */
  readonly map: GameMap;
  /**
   * The ID of the platform on which the match was played.
   *
   * Eg: `NA1` or `EUW1`.
   */
  readonly platformId: string;
  /**
   * The queue type of the match.
   */
  readonly queue: Queue;
  /**
   * The tournament code of the match (if it is the part of a tournament).
   */
  readonly tournamentCode: string;
  /**
   * The 2 teams participating in the match.
   *
   * They are mapped by their map sides (`blue` and `red`).
   */
  readonly teams: Collection<'blue' | 'red', Team>;

  /**
   * Creates a new match instance.
   * @param client - The client requesting the data.
   * @param data - The raw match data from the API.
   */
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
    this.map = client.maps.find((m) => m.mapId === data.info.mapId)!;
    this.platformId = data.info.platformId;
    this.queue = client.queues.find((q) => q.queueId === data.info.queueId)!;
    this.tournamentCode = data.info.tournamentCode;
    const blueTeamData = data.info.teams.find((t) => t.teamId === 100)!;
    const redTeamData = data.info.teams.find((t) => t.teamId === 200)!;
    const blueTeamParticipants = data.info.participants.filter((p) => p.teamId === 100);
    const redTeamParticipants = data.info.participants.filter((p) => p.teamId === 200);
    this.teams = new Collection<'blue' | 'red', Team>();
    this.teams.set('blue', new Team(client, blueTeamData, blueTeamParticipants));
    this.teams.set('red', new Team(client, redTeamData, redTeamParticipants));
  }
}
