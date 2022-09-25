import type { ImageData } from './index';
import type { ChampionSkinData, MerakiSkin } from './ChampionSkin';
import type { SpellData } from './ChampionSpell';

/**
 * A representation of the champion data returned by meraki analytics.
 * These are used in the LoL wiki.
 */
export interface MerakiChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  attackType: string;
  releaseDate: string;
  releasePatch: string;
  price: {
    blueEssence: number;
    rp: number;
    saleRp: number;
  };
  skins: MerakiSkin[];
}

/**
 * A representation of the champion rating data returned by Data Dragon.
 */
export interface ChampionRating {
  /**
   * The attack rating of the champion (0 - 10).
   */
  attack: number;
  /**
   * The defense rating of the champion (0 - 10).
   */
  defense: number;
  /**
   * The magic rating of the champion (0 - 10).
   */
  magic: number;
  /**
   * The difficulty rating of the champion (0 - 10).
   */
  difficulty: number;
}

/**
 * The data about a champion's passive.
 */
export interface ChampionPassive {
  /**
   * The name of the champion's passive ability.
   */
  name: string;
  /**
   * A link to the icon used in game to represent this champion's passive ability.
   */
  icon: string;
  /**
   * A short textual description of this champion's passive ability.
   */
  description: string;
}

/**
 * The pricing data of a champion.
 */
export interface ChampionPricing {
  /**
   * The amount of blue essence required to buy this champion.
   */
  be: number;
  /**
   * The amount of RP required to buy this champion.
   */
  rp: number;
  /**
   * If more than 0, this champion is available for a less RP, the amount being the value of this field.
   */
  sale: number;
}

/**
 * A representation of the champion data returned by Data Dragon.
 */
export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ImageData;
  skins: ChampionSkinData[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: ChampionRating;
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
