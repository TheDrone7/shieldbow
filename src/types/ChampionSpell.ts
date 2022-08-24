import type { ImageData } from './Image';

/**
 * A representation of the champion spell data returned by Data Dragon.
 */
export interface SpellData {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: {
    label: string[];
    effect: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: {};
  effect: (null | number[])[];
  effectBurn: (null | string)[];
  vars: {
    key: string;
    link: string;
    coeff: string;
  }[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: ImageData;
  resource: string;
}

/**
 * A representation of the champion spell data returned by Community Dragon.
 */
export interface SpellDamageData {
  [id: string]: any;
}
