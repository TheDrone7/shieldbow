import type { CurrentGameBanData } from './ChampionBan';
import type { CurrentGameParticipantData } from './CurrentGameParticipant';

/**
 * The Current game data as returned by the API.
 */
export interface CurrentGameData {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: CurrentGameBanData[];
  gameQueueConfigId: number;
  observers: { encryptionKey: string };
  participants: CurrentGameParticipantData[];
}
