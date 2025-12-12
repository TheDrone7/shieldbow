import { IImage } from '../image';

/**
 * Data dragon champion skin structure.
 */
export interface IDataDragonChampionSkin {
  chromas: boolean;
  id: string;
  name: string;
  num: number;
}

/**
 * Data dragon champion info structure.
 */
export interface IDataDragonChampionInfo {
  attack: number;
  defense: number;
  difficulty: number;
  magic: number;
}

/**
 * Data dragon champion stats structure.
 */
export interface IDataDragonChampionStats {
  armor: number;
  armorperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackrange: number;
  attackspeed: number;
  attackspeedperlevel: number;
  crit: number;
  critperlevel: number;
  hp: number;
  hpperlevel: number;
  hpregen: number;
  hpregenperlevel: number;
  movespeed: number;
  mp: number;
  mpperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
}

/**
 * Data dragon champion spell leveltip structure.
 */
export interface IDataDragonChampionSpellLeveltip {
  effect: string[];
  label: string[];
}

/**
 * Data dragon champion spell structure.
 */
export interface IDataDragonChampionSpell {
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
  leveltip?: IDataDragonChampionSpellLeveltip;
  maxammo: string;
  maxrank: number;
  name: string;
  range: number[];
  rangeBurn: string;
  resource: string;
  tooltip: string;
  vars: [];
}

/**
 * Data dragon champion passive structure.
 */
export interface IDataDragonChampionPassive {
  description: string;
  image: IImage;
  name: string;
}

/**
 * Data dragon champion structure.
 */
export interface IDataDragonChampion {
  allytips: string[];
  blurb: string;
  enemytips: string[];
  id: string;
  image: IImage;
  info: IDataDragonChampionInfo;
  key: string;
  lore: string;
  name: string;
  partype: string;
  passive: IDataDragonChampionPassive;
  recommended: [];
  skins: IDataDragonChampionSkin[];
  spells: IDataDragonChampionSpell[];
  stats: IDataDragonChampionStats;
  tags: string[];
  title: string;
}
