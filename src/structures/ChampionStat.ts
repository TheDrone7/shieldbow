/**
 * A representation of the champion's base stats.
 */
export class ChampionStat {
  /**
   * The base value of the stat - the value at level 1.
   */
  readonly base: number;
  /**
   * The value at which this stat increases every level (the scaling).
   */
  readonly increment: number;
  constructor(base: number, increment: number) {
    this.base = base;
    this.increment = increment;
  }

  /**
   * A utility to calculate the base value of this stat at a certain level.
   * @param level - The level at which the base value of this stat is needed.
   */
  at(level: number): number {
    if (level < 1) throw Error('Level cannot be less than 1');
    return this.base + (level - 1) * this.increment;
  }
}
