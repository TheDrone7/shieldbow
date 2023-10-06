/**
 * A champion's stat.
 */
export class ChampionStat {
  /**
   * The base value of the stat.
   */
  readonly base: number;
  /**
   * The growth (per level) value of the stat.
   */
  readonly growth: number;

  /**
   * Creates a new champion stat.
   * @param base - The base value of the stat.
   * @param growth - The growth (per level) value of the stat.
   */
  constructor(base: number, growth: number) {
    this.base = base;
    this.growth = growth;
  }

  /**
   * Calculates the stat at the given level.
   *
   * @param level - The level to get the stat at.
   * @returns The stat at the given level.
   */
  at(level: number): number {
    return this.base + this.growth * (level - 1);
  }
}
