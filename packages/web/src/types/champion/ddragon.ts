import { IImage } from '../image';

/**
 * Data dragon champion skin structure.
 */
export interface IDataDragonChampionSkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

/**
 * Data dragon champion info structure.
 */
export interface IDataDragonChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

/**
 * Data dragon champion stats structure.
 */
export interface IDataDragonChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

/**
 * Data dragon champion spell structure.
 */
export interface IDataDragonChampionSpell {
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
  effect: number[];
  effectBurn: string[];
  vars: [];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: IImage;
  resource: string;
}

/**
 * Data dragon champion passive structure.
 */
export interface IDataDragonChampionPassive {
  name: string;
  description: string;
  image: IImage;
}

/**
 * Data dragon champion structure.
 */
export interface IDataDragonChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  image: IImage;
  skins: IDataDragonChampionSkin[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: IDataDragonChampionInfo;
  stats: IDataDragonChampionStats;
  spells: IDataDragonChampionSpell[];
  passive: IDataDragonChampionPassive;
  recommended: [];
}
