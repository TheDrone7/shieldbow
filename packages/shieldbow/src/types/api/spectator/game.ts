import { ISpectatorParticipant, ISpectatorGame } from './base';

/**
 * Raw perks data from the spectator-v5 API for a live participant.
 */
export interface ILiveGameParticipantPerks {
  perkIds: number[];
  perkStyle: number;
  perkSubStyle: number;
}

/**
 * Raw data from the spectator-v5 API for a live participant.
 */
export interface ILiveGameParticipant extends ISpectatorParticipant {
  gameCustomizationObjects: [];
  perks: ILiveGameParticipantPerks;
}

/**
 * Raw data from the spectator-v5 API for a live game.
 */
export interface ILiveGame extends ISpectatorGame {
  participants: ILiveGameParticipant[];
  gameStartTime: number;
}
