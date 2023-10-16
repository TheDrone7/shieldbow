import { IDataDragonChampionSkin, IMerakiChampionSkin } from 'types';

/**
 * Represents the price of a skin for a champion.
 */
export interface ChampionSkinPricing {
  /**
   * The price of the skin in RP.
   */
  readonly rp: number;
  /**
   * The price of the skin (if on sale) in RP.
   */
  readonly sale: number;
}

/**
 * Represents a chroma for a champion skin.
 */
export interface ChampionSkinChroma {
  /**
   * The name of the chroma.
   */
  name: string;
  /**
   * The ID of the chroma.
   */
  id: number;
  /**
   * The URL of the chroma.
   */
  url: string;
  /**
   * The rarity of the chroma.
   */
  rarity: {
    /**
     * The rarity of the chroma.
     */
    rarity: number;
    /**
     * The region of the chroma.
     */
    region: string;
  }[];
}

/**
 * Represents a skin for a champion.
 */
export class ChampionSkin {
  /**
   * The ID of the skin.
   */
  readonly id: string;
  /**
   * The number of the skin.
   */
  readonly num: number;
  /**
   * The name of the skin.
   */
  readonly name: string;
  /**
   * The chromas for the skin.
   */
  readonly chromas: ChampionSkinChroma[];
  /**
   * The availability of the skin.
   */
  readonly availability: string;
  /**
   * Whether the skin is the base skin for the champion.
   */
  readonly isBase: boolean;
  /**
   * Whether the skin is eligible for loot.
   */
  readonly lootEligible: boolean;
  /**
   * The pricing of the skin.
   */
  readonly pricing: ChampionSkinPricing;
  /**
   * The rarity of the skin.
   */
  readonly rarity: string;
  /**
   * The lore of the skin.
   */
  readonly lore: string;
  /**
   * The release date of the skin.
   */
  readonly release: Date;
  /**
   * The URL of the splash art for the skin.
   */
  readonly splashUrl: string;
  /**
   * The URL of the tile for the skin.
   */
  readonly tileUrl: string;
  /**
   * The URL of the load screen for the skin.
   */
  readonly loadScreenUrl: string;
  /**
   * The URL of the vintage load screen for the skin.
   */
  readonly loadScreenVintageUrl?: string;
  /**
   * The URL of the uncentered splash art for the skin.
   */
  readonly uncenteredSplashUrl: string;

  /**
   * Creates a new champion skin.
   * @param dDragon - The Data Dragon champion skin data.
   * @param meraki - The Meraki champion skin data.
   */
  constructor(dDragon: IDataDragonChampionSkin, meraki?: IMerakiChampionSkin) {
    this.id = dDragon.id;
    this.num = dDragon.num;
    this.name = dDragon.name;
    this.chromas =
      meraki?.chromas
        .filter((c) => !!c)
        .map((c) => ({
          name: c.name,
          id: c.id,
          url: c.chromaPath,
          rarity: c.rarities
        })) || [];
    this.availability = meraki?.availability ?? '';
    this.isBase = meraki?.isBase ?? false;
    this.lootEligible = meraki?.lootEligible ?? false;
    this.pricing = {
      rp: meraki?.cost ?? -1,
      sale: meraki?.sale ?? -1
    };
    this.rarity = meraki?.rarity ?? 'common';
    this.lore = meraki?.lore ?? '';
    this.release = new Date(meraki?.release ?? Date.now());
    this.splashUrl = meraki?.splashPath ?? '';
    this.tileUrl = meraki?.tilePath ?? '';
    this.loadScreenUrl = meraki?.loadScreenPath ?? '';
    this.loadScreenVintageUrl = meraki?.loadScreenVintagePath || undefined;
    this.uncenteredSplashUrl = meraki?.uncenteredSplashPath ?? '';
  }
}
