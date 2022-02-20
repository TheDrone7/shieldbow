import type { Champion } from './index';

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
  readonly chromas: boolean;

  constructor(champ: Champion, data: { id: string; name: string; num: number; chromas: boolean }) {
    this.champ = champ;
    this.id = data.num;
    this.name = data.name;
    this.internalId = data.id;
    this.chromas = data.chromas;
  }

  get splashArt() {
    return `${this.champ.client.base}img/champion/splash/${this.champ.name}_${this.id}.jpg`;
  }

  get loadingScreen() {
    return `${this.champ.client.base}img/champion/loading/${this.champ.name}_${this.id}.jpg`;
  }
}
