import { Champion } from '@shieldbow/web';
import { ISpectatorBannedChampion } from 'types';

/**
 * Represents a banned champion in a live game.
 */
export class BannedChampion {
  /**
   * The champion that was banned.
   */
  readonly champion: Champion;
  /**
   * The ID of the champion that was banned.
   *
   * This is a fallback to {@link BannedChampion.champion | champion}.
   */
  readonly championId: number;
  /**
   * The ID team that banned the champion.
   */
  readonly teamId: number;
  /**
   * The turn in which the champion was banned.
   */
  readonly turn: number;

  /**
   * Creates a new BannedChampion.
   * @param data - The raw data from the spectator-v5 API.
   */
  constructor(data: ISpectatorBannedChampion, champion: Champion) {
    this.champion = champion;
    this.championId = data.championId;
    this.teamId = data.teamId;
    this.turn = data.pickTurn;
  }

  /**
   * The name/color of the team that banned the champion.
   *
   * This only works for game modes that have two teams.
   * This won't work for game modes like Arena with more than two teams.
   */
  get team() {
    return this.teamId === 100 ? 'blue' : 'red';
  }
}
