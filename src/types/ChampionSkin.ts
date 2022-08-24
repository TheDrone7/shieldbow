/**
 * A representation of the champion skin data returned by Data Dragon.
 */
export interface ChampionSkinData {
  id: string;
  name: string;
  num: number;
  chromas: boolean;
}

/**
 * A representation of a champion's skin data returned by meraki analytics.
 * These are used in the LoL wiki.
 */

export interface MerakiSkinChroma {
  name: string;
  id: number;
  chromaPath: string;
}

export interface MerakiSkin {
  name: string;
  id: number;
  isBase: boolean;
  cost: number;
  sale: number;
  rarity: string;
  availability: string;
  chromas: (MerakiSkinChroma | null)[];
  lore: string;
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  loadScreenPath: string;
  loadScreenVintagePath: string;
  newEffects: boolean;
  newAnimations: boolean;
  newRecall: boolean;
  newVoice: boolean;
  newQuotes: boolean;
}

/**
 * A representation of a champion's skin's pricing from meraki analytics.
 */
export interface SkinPricing {
  /**
   * The RP amount required to buy this skin.
   */
  rp: number;
  /**
   * If more than 0, the skin can be bought for less RP, the amount being the value of this field.
   */
  sale: number;
}

/**
 * A representation of a champion's skin's chroma from meraki analytics.
 */
export interface SkinChroma {
  /**
   * The name of the chroma
   */
  name: string;
  /**
   * The unique ID of the chroma.
   */
  id: number;
  /**
   * A link to the preview image for this chroma.
   */
  image: string;
}
