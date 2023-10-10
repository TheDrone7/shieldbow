import { IImage } from './image';

/**
 * Raw Summoner Spell Data from Data Dragon
 */
export interface IDDragonSummonerSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: {};
  effect: (null | number[])[];
  effectBurn: (null | string)[];
  vars: [];
  key: string;
  summonerLevel: number;
  modes: string[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: IImage;
  resource: string;
}
