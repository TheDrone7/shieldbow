import type { Client } from '../../client';
import type { GameMap, ItemData } from '../../types';
import type { Champion } from '../index';

/**
 * The item's gold value information.
 */
export interface ItemGoldValue {
  /**
   * The base value for this item.
   * This does not include the value of this item's components.
   */
  base: number;
  /**
   * The total gold value for this item.
   * This includes the value of this item's components.
   */
  total: number;
  /**
   * The selling price of this item.
   */
  sell: number;
}

/**
 * A representation of an in-game item.
 */
export class Item {
  /**
   * The 4-digit unique ID (numerical ID as a string) of the item.
   */
  readonly id: string;
  /**
   * The displayed name of this item.
   */
  readonly name: string;
  /**
   * A short-description of this object.
   * `plaintext` attribute in the data dragon file.
   */
  readonly description: string;
  /**
   * More detailed description of the item.
   * Raw details contain some html-like tags.
   * This is the raw details from the data dragon API.
   *
   * See {@link Item.details | details} if you want to see it with the tags processed out.
   */
  readonly rawDetails: string;
  /**
   * Whether this item is a consumable.
   *
   * Consumables give you temporary buffs or vision after consumption.
   */
  readonly consumable: boolean;
  /**
   * Whether this item is automatically consumed if you do not have an available item slot.
   */
  readonly consumeOnFull: boolean;
  /**
   * If this has a value, it means this item can be stacked in the same item slot.
   * The value indicates the quantity of this item you can store in one slot.
   */
  readonly stacks?: number;
  /**
   * Whether this item is listed in the in-game store.
   */
  readonly inStore: boolean;
  /**
   * Whether this item can be bought from the store.
   */
  readonly hideFromAll: boolean;
  /**
   * If this field is defined, then this item can only be bought/owned by this champion.
   */
  readonly requiredChampionId?: string;
  /**
   * A link to the image assigned to this item in-game.
   */
  readonly image: string;
  /**
   * The value of this item in terms of in-game gold.
   */
  readonly goldValue: ItemGoldValue;
  /**
   * Some tags assigned to this item.
   */
  readonly tags: string[];
  /**
   * The list of maps on which you can buy this item.
   */
  readonly availability: GameMap[];
  /**
   * A list of stats this item provides.
   * To learn more about these stats, {@link https://developer.riotgames.com/docs/lol#data-dragon_items | documentation}
   */
  readonly stats: {
    [key: string]: number;
  };
  /**
   * The kind of item this is in-game.
   * By default, all items are set to be `Basic`.
   * There might be some issues with items that do not have their `depth` set in the data dragon JSON.
   */
  readonly kind: 'Basic' | 'Epic' | 'Legendary' | 'Mythic';
  private readonly client: Client;
  private readonly fromIds: string[];
  private readonly intoIds: string[];
  private readonly specialRecipeId?: string;

  /**
   * Create a new item instance.
   * @param client - The client requesting the data.
   * @param id - The ID of the item.
   * @param data - The raw item data from data dragon.
   */
  constructor(client: Client, id: string, data: ItemData) {
    client.logger?.trace(`Parsing item data (id: ${id})`);
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
    this.image = `${client.cdnBase}${client.version}/img/item/${id}.png`;
    this.goldValue = data.gold;
    this.tags = data.tags;
    this.availability = client.maps.filter((m) => data.maps[m.mapId.toString()]);
    this.stats = data.stats;
    this.kind = this.parseDepth(data.depth || 1);
    this.requiredChampionId = data.requiredChampion;
  }

  /**
   * More detailed description of the item.
   * This is the processed details.
   * With all the HTML-like tags removed.
   *
   * See {@link Item.rawDetails | rawDetails} if you want the raw data.
   */
  get details() {
    return this.rawDetails
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }

  /**
   * If this is not undefined, then this item can only be bought/owned by this champion.
   */
  async requiredChampion(): Promise<Champion> {
    if (!this.requiredChampionId) return Promise.reject('This item is not champion-specific.');
    return this.client.champions.fetch(this.requiredChampionId);
  }

  /**
   * The components of this item.
   * You need to buy these item and spend additional gold to get this item.
   */
  async from() {
    const fromItems = await this.client.items.fetchMany(this.fromIds);
    return this.fromIds.map((id) => fromItems.get(id)!);
  }

  /**
   * A collection of items the current item is a component of.
   */
  async into() {
    const intoItems = await this.client.items.fetchMany(this.intoIds);
    return this.intoIds.map((id) => intoItems.get(id)!);
  }

  /**
   * If this is defined, you cannot buy this item from the store.
   * Instead, you need to buy the `specialRecipe` item and complete a quest to get it.
   */
  async specialRecipe(): Promise<Item | undefined> {
    return this.specialRecipeId ? this.client.cache.get<Item>(this.specialRecipeId) : undefined;
  }

  private parseDepth(depth: number) {
    if (this.rawDetails.includes('Mythic Passive')) return 'Mythic';
    const itemTypes = ['Basic', 'Epic', 'Legendary'] as const;
    return itemTypes[depth - 1];
  }
}
