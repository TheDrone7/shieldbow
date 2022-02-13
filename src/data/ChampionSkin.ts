import type { Champion } from './index';

export class ChampionSkin {
  readonly champ: Champion;
  readonly id: number;
  readonly name: string;
  readonly internalId: string;
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
