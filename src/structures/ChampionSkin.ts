import type { Champion } from './index';
import type { MerakiSkin } from '../types/';

/**
 * A representation of a champion's skin (visual modification).
 */
export class ChampionSkin {
  /**
   * The champion this skin belongs to.
   */
  readonly champ: Champion;
  /**
   * The numerical ID of this skin.
   */
  readonly id: number;
  /**
   * The name of the skin displayed in game. U
   */
  readonly name: string;
  /**
   * The ID this skin is identified by internally (the game).
   */
  readonly internalId: string;
  /**
   * Whether the skin has chromas or not.
   */
  readonly chromas: {
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
  }[];
  /**
   * The availability of this skin - Available or Legacy.
   */
  readonly availability: string;
  /**
   * Whether the skin is the base skin.
   */
  readonly isBase: boolean;
  /**
   * The in-game price of the skin.
   */
  readonly price: {
    /**
     * The RP amount required to buy this skin.
     */
    rp: number;
    /**
     * If more than 0, the skin can be bought for less RP, the amount being the value of this field.
     */
    sale: number;
  };
  /**
   *  How rare is this skin - 'Epic', 'Legendary', etc.
   */
  readonly rarity: string;
  /**
   * The lore of the champion in the world of this skin line.
   */
  readonly lore: string;
  /**
   * The default splash art for the skin.
   */
  readonly splashArt: string;
  /**
   * The splash art for the skin zoomed in on the champion to make it centered.
   */
  readonly centeredSplashArt: string;
  /**
   * The loading screen image.
   */
  readonly loadingScreen: string;
  /**
   * The loading screen image with skin border (if available).
   */
  readonly vintageLoadingScreen?: string;

  constructor(champ: Champion, data: { id: string; name: string; num: number; chromas: boolean }, meraki: MerakiSkin) {
    this.champ = champ;
    this.id = data.num;
    this.name = data.name;
    this.availability = meraki.availability;
    this.isBase = meraki.isBase;
    this.price = { rp: meraki.cost, sale: meraki.sale };
    this.rarity = meraki.rarity;
    this.lore = meraki.lore;
    this.splashArt = meraki.uncenteredSplashPath;
    this.centeredSplashArt = meraki.splashPath;
    this.loadingScreen = meraki.loadScreenPath;
    this.vintageLoadingScreen = meraki.loadScreenVintagePath || undefined;
    this.internalId = data.id;
    this.chromas = meraki.chromas
      .filter((c?: { id: number, name: string, chromaPath: string } | null) => c)
      .map((c: { id: number, name: string, chromaPath: string }) => ({ id: c.id, name: c.name, image: c.chromaPath }));
  }
}
