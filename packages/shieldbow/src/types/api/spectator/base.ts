/**
 * Raw data from the spectator-v5 API for a live game participant (featured game).
 */
export interface ISpectatorParticipant {
  puuid: string;
  summonerId: string;
  teamId: number;
  spell1Id: number;
  spell2Id: number;
  championId: number;
  profileIconId: number;
  riotId: string;
  bot: boolean;
}

/**
 * Raw data from the spectator-v5 API for a live game observer.
 */
export interface ISpectatorObserver {
  encryptionKey: string;
}

/**
 * Raw data from the spectator-v5 API for a banned champion in a live game.
 */
export interface ISpectatorBannedChampion {
  championId: number;
  teamId: number;
  pickTurn: number;
}

/**
 * Raw data from the spectator-v5 API for a live game (featured game).
 */
export interface ISpectatorGame {
  gameId: number;
  mapId: number;
  gameMode: string;
  gameType: string;
  gameQueueConfigId: number;
  participants: ISpectatorParticipant[];
  observers: ISpectatorObserver;
  platformId: string;
  bannedChampions: ISpectatorBannedChampion[];
  gameLength: number;
}
