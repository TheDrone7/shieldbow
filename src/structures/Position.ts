import type { PositionData } from '../types';

/**
 * A representation of a position in the game.
 */
export class Position {
  /**
   * The x coordinate of the position.
   */
  readonly x: number;
  /**
   * The y coordinate of the position.
   */
  readonly y: number;

  constructor(data: PositionData) {
    this.x = data.x;
    this.y = data.y;
  }
}
