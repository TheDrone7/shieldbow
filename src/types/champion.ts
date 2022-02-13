import type { ImageData } from './index';

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

export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ImageData;
  skins: {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
  }[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: {
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
  };
  spells: SpellData[];
  passive: {
    name: string;
    description: string;
    image: ImageData;
  };
}
