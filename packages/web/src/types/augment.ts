/**
 * Community Dragon's cherry (arena) augment interface.
 */
export interface IAugment {
  apiName: string;
  calculations: {};
  dataValues: Record<string, number>;
  desc: string;
  iconLarge: string;
  iconSmall: string;
  id: number;
  name: string;
  rarity: number;
  tooltip: string;
}
