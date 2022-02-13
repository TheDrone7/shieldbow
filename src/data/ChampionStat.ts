export class ChampionStat {
  readonly base: number;
  readonly increment: number;
  constructor(base: number, increment: number) {
    this.base = base;
    this.increment = increment;
  }

  at(level: number): number {
    if (level < 1) throw Error('Level cannot be less than 1');
    return this.base + (level - 1) * this.increment;
  }
}
