import { IMiniSeries } from 'types';

/**
 * @deprecated (DEPRECATED) - This was removed in second split of 2023.
 *
 * A class representing the promotion series progression of a summoner in ranked.
 */
export class MiniSeries {
  /**
   * The number of losses.
   */
  readonly losses: number;
  /**
   * The progression of the summoner in a string format.
   *
   * Example: 'LLWNN'
   *
   * L = loss,
   * W = win,
   * N = no data (not played)
   */
  readonly progress: string;
  /**
   * The number of wins the summoner needs to progress.
   */
  readonly target: number;
  /**
   * The number of wins the summoner currently has.
   */
  readonly wins: number;

  /**
   * Creates a new mini series class.
   * @param data - The raw miniseries data from the API.
   */
  constructor(data: IMiniSeries) {
    this.losses = data.losses;
    this.progress = data.progress;
    this.target = data.target;
    this.wins = data.wins;
  }
}
