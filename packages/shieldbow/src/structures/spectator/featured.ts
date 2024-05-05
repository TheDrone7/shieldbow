import { Champion, GameMap, Queue, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { ISpectatorGame } from 'types';
import { BannedChampion } from './banned';
import { SpectatorParticipant } from './participant';
import { Collection } from '@discordjs/collection';

/**
 * Represents a featured live game.
 */
export class FeaturedGame {
  /**
   * The ID of the game.
   */
  readonly gameId: number;
  /**
   * The map on which the game is being played.
   */
  readonly map: GameMap;
  /**
   * The mode of the game.
   */
  readonly mode: string;
  /**
   * The type of the game.
   */
  readonly type: string;
  /**
   * The type of queue for the game.
   */
  readonly queue: Queue;
  /**
   * The participants in the game.
   */
  readonly participants: SpectatorParticipant[];
  /**
   * The observer of the game.
   */
  readonly observerEncryptionKey: string;
  /**
   * The platform ID of the game.
   */
  readonly platformId: string;
  /**
   * The banned champions in the game.
   */
  readonly bannedChampions: BannedChampion[];
  /**
   * The length of the game (in seconds).
   */
  readonly length: number;

  /**
   * Creates a new featured game.
   * @param client - The client this featured game was fetched by.
   * @param data - The raw data for the featured game.
   * @param champions - The champions to use for the participants and bans.
   * @param spells - A collection of all summoner spells.
   */
  constructor(client: Client, data: ISpectatorGame, champions: Champion[], spells: Collection<string, SummonerSpell>) {
    this.gameId = data.gameId;
    this.map = client.maps.find((m) => m.mapId === data.mapId)!;
    this.mode = data.gameMode;
    this.type = data.gameType;
    this.queue = client.queues.find((m) => m.queueId === data.gameQueueConfigId)!;
    this.observerEncryptionKey = data.observers.encryptionKey;
    this.platformId = data.platformId;
    this.length = data.gameLength;
    this.participants = data.participants.map(
      (participant) =>
        new SpectatorParticipant(client, participant, spells, champions.find((c) => c.key === participant.championId)!)
    );
    this.bannedChampions = data.bannedChampions.map(
      (champion) =>
        new BannedChampion(
          champion,
          champions.find((c) => c.key === champion.championId)
        )
    );
  }
}
