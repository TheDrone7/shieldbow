import type { Client } from '../client';
import type { ItemData, MapData } from '../types';
import type { Champion } from './index';

export class Item {
  client: Client;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly rawDetails: string;
  readonly consumable: boolean;
  readonly consumeOnFull: boolean;
  readonly stacks?: number;
  readonly fromIds: string[];
  readonly intoIds: string[];
  readonly specialRecipeId?: string;
  readonly inStore: boolean;
  readonly hideFromAll: boolean;
  private _requiredChampion?: Champion;
  readonly image: string;
  readonly goldValue: {
    base: number;
    total: number;
    sell: number;
  };
  readonly tags: string[];
  readonly availability: MapData[];
  readonly stats: {
    [key: string]: number;
  };
  readonly kind: 'Basic' | 'Epic' | 'Legendary' | 'Mythic';

  constructor(client: Client, id: string, data: ItemData) {
    this.client = client;
    this.id = id;
    this.name = data.name;
    this.description = data.plaintext;
    this.rawDetails = data.description;
    this.consumable = data.consumed || false;
    this.consumeOnFull = data.consumeOnFull || false;
    this.stacks = data.stacks;
    this.fromIds = data.from || [];
    this.intoIds = data.into || [];
    this.specialRecipeId = data.specialRecipe?.toString();
    this.inStore = data.inStore ?? true;
    this.hideFromAll = data.hideFromAll || false;
    this.image = `${client.base}${client.version}/img/item/${id}.png`;
    this.goldValue = data.gold;
    this.tags = data.tags;
    this.availability = client.maps.filter((m) => data.maps[m.mapId.toString()]);
    this.stats = data.stats;
    this.kind = this.parseDepth(data.depth || 1);

    if (data.requiredChampion)
      client.champions.fetch(data.requiredChampion).then((c) => {
        this._requiredChampion = c;
      });
  }

  get requiredChampion() {
    return this._requiredChampion;
  }

  private parseDepth(depth: number) {
    if (this.rawDetails.includes('Mythic Passive')) return 'Mythic';
    const itemTypes = ['Basic', 'Epic', 'Legendary'] as const;
    return itemTypes[depth - 1];
  }
}
