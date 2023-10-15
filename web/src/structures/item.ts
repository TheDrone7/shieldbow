import { GameMap, IDDragonItem, IMerakiItem, IMerakiItemStats } from 'types';
import { Client } from 'client';
import { Champion, Image } from '.';

/**
 * Represents an item in League of Legends.
 */
export class Item {
  /**
   * The ID of the item.
   */
  readonly id: string;
  /**
   * The client that created the item.
   */
  private readonly client: Client;
  /**
   * The name of the item.
   */
  readonly name: string;
  /**
   * The plain-text short description of the item.
   */
  readonly description: string;
  /**
   * The raw details of the item (HTML-version, detailed description).
   */
  readonly rawDetails: string;
  /**
   * The IDs of the items that this item builds into.
   */
  readonly intoIds: string[];
  /**
   * The IDs of the component items for this item.
   */
  readonly fromIds: string[];
  /**
   * Whether or not the item is consumed on use.
   */
  readonly consumable: boolean;
  /**
   * Whether or not the item is consumed when buying while the player has 7 items already (including trinket).
   */
  readonly consumeOnFull: boolean;
  /**
   * The ID of the item that is required to buy this item.
   *
   * (In case of items such as Muramana, which requires Manamune)
   */
  readonly specialRecipeId?: number;
  /**
   * The number of stacks the item can have. (If any)
   */
  readonly stacks?: number;
  /**
   * Whether or not the item is listed in the store (not reliable, use isPurchasable instead).
   */
  readonly inStore: boolean;
  /**
   * Whether or not the item is hidden from all item lists.
   */
  readonly hideFromAll: boolean;
  /**
   * The ID of the champion who can own this item.
   *
   * (In case of things like Kalista's Black Spear)
   */
  readonly requiredChampionId?: string;
  /**
   * The image of the item.
   */
  readonly image: Image;
  /**
   * Whether or not the item is purchasable.
   */
  readonly isPurchasable: boolean;
  /**
   * The base price of the item.
   *
   * This price excludes price of any components of the item.
   */
  readonly basePrice: number;
  /**
   * The total price of the item.
   *
   * This price includes the price of all components of the item.
   */
  readonly totalPrice: number;
  /**
   * The price of the item when sold.
   */
  readonly sellPrice: number;
  /**
   * The tags of the item.
   */
  readonly tags: string[];
  /**
   * The maps that the item is available on.
   */
  readonly maps: GameMap[];
  /**
   * The stats provided by this item.
   */
  readonly stats: {
    [id: string]: number;
  };
  /**
   * The stats provided by this item, as provided by meraki analytics.
   *
   * This is provided as it is much nicer to use than the raw stats from data dragon.
   */
  readonly merakiStats: IMerakiItemStats;

  /**
   * The kind of item.
   */
  readonly kind: 'Basic' | 'Epic' | 'Legendary' | 'Mythic';

  /**
   * Creates a new Item object.
   * @param client - The client that created the item.
   * @param item - The raw item data from data dragon.
   */
  constructor(client: Client, id: string, item: IDDragonItem, meraki?: IMerakiItem) {
    this.client = client;
    this.id = id;
    this.name = item.name;
    this.rawDetails = item.description;
    this.description = item.plaintext;
    this.image = new Image(client, item.image);
    this.basePrice = item.gold.base;
    this.isPurchasable = item.gold.purchasable;
    this.totalPrice = item.gold.total;
    this.sellPrice = item.gold.sell;
    this.tags = item.tags;
    this.maps = client.maps.filter((map) => item.maps[map.mapId.toString()]);
    this.stats = item.stats;
    this.intoIds = item.into || [];
    this.fromIds = item.from || [];
    this.consumable = item.consumed ?? false;
    this.consumeOnFull = item.consumeOnFull ?? false;
    this.stacks = item.stacks;
    this.inStore = item.inStore ?? true;
    this.hideFromAll = item.hideFromAll ?? false;
    this.requiredChampionId = item.requiredChampion;
    this.kind = this.parseDepth(item.depth);
    this.specialRecipeId = item.specialRecipe;
    this.merakiStats = meraki?.stats!;
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
    console.log(this.intoIds);
    const intoItems = await this.client.items.fetchMany(this.intoIds);
    console.log(intoItems.map((i) => i.name).join(','));
    return this.intoIds.map((id) => intoItems.get(id)!);
  }

  /**
   * If this is defined, you cannot buy this item from the store.
   * Instead, you need to buy the `specialRecipe` item and complete a quest to get it.
   */
  async specialRecipe(): Promise<Item | undefined> {
    return this.specialRecipeId ? this.client.items.fetch(this.specialRecipeId.toString()) : undefined;
  }

  /**
   * Parses depth and description to determine the kind of item.
   *
   * @param depth - The raw depth from data dragon.
   * @returns The kind of item.
   */
  private parseDepth(depth: number | undefined): 'Basic' | 'Epic' | 'Legendary' | 'Mythic' {
    if (this.rawDetails.includes('Mythic Passive')) return 'Mythic';
    else if (depth === 3) return 'Legendary';
    else if (depth === 2) return 'Epic';
    else return 'Basic';
  }
}
