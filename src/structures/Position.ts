import type { PositionData } from '../types';

export class Position {
  readonly x: number;
  readonly y: number;

  constructor(data: PositionData) {
    this.x = data.x;
    this.y = data.y;
  }
}
