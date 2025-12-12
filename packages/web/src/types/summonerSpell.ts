import { IImage } from './image';

/**
 * Raw Summoner Spell Data from Data Dragon
 */
export interface IDDragonSummonerSpell {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  description: string;
  effect: (null | number[])[];
  effectBurn: (null | string)[];
  id: string;
  image: IImage;
  key: string;
  maxammo: string;
  maxrank: number;
  modes: string[];
  name: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  summonerLevel: number;
  tooltip: string;
  vars: [];
}
