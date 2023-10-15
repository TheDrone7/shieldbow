import { IDataDragonChampionInfo } from 'types';

/**
 * Represents the info of a champion.
 */
export class ChampionInfo {
  /**
   * The attack rating of the champion.
   */
  readonly attack: number;
  /**
   * The defense rating of the champion.
   */
  readonly defense: number;
  /**
   * The magic rating of the champion.
   */
  readonly magic: number;
  /**
   * The difficulty rating of the champion.
   */
  readonly difficulty: number;

  /**
   * Creates a new ChampionInfo object.
   * @param dDragon - The Data Dragon champion info data.
   */
  constructor(dDragon: IDataDragonChampionInfo) {
    this.attack = dDragon.attack;
    this.defense = dDragon.defense;
    this.magic = dDragon.magic;
    this.difficulty = dDragon.difficulty;
  }
}
