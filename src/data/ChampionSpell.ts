import type { SpellData } from '../types';
import type { Champion } from './index';

export class ChampionSpell {
  private readonly champ: Champion;

  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly tooltip: string;
  readonly icon: string;
  readonly maxRank: number;
  readonly cooldown: string;
  readonly cooldownByLevel: number[];
  readonly cost: string;
  readonly costByLevel: number[];
  readonly costType: string;

  constructor(champ: Champion, data: SpellData) {
    this.champ = champ;

    this.id = data.id;
    this.name = data.name;
    this.description = data.description.replace(/<\/?[^>]+(>|$)/g, '').replace(/\.(?=\w\D)/g, '.\n\n');
    this.icon = `${this.champ.client.base}${this.champ.client.version}/img/spell/${data.image.full}`;
    this.maxRank = data.maxrank;
    this.cooldown = data.cooldownBurn;
    this.cooldownByLevel = data.cooldown;
    this.costByLevel = data.cost;
    this.costType = data.costType.replace(/{{\s*abilityresourcename\s*}}/g, champ.barType);
    this.cost = (data.resource || '').replace(/{{\s*cost\s*}}/g, this.champ.barType).replace(/{{\s*abilityresourcename\s*}}/g, champ.barType);

    this.tooltip = data.tooltip.replace(/<\/?[^>]+(>|$)/g, '').replace(/\.(?=\w\D)/g, '.\n\n');
  }
}
