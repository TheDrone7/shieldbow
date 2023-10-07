import { GameMap, IDDragonItem } from 'types';
import { Image } from './image';
import { Client } from 'client';

/**
 * Represents an item in League of Legends.
 */
export class Item {
  /**
   * The name of the item.
   */
  readonly name: string;
  /**
   * The raw description of the item.
   */
  readonly rawDescription: string;
  /**
   * The plain text description of the item.
   */
  readonly plaintext: string;
  /**
   * The IDs of the items that this item builds into.
   */
  readonly into: string[];
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
   * Creates a new Item object.
   * @param client - The client that created the item.
   * @param item - The raw item data from data dragon.
   */
  constructor(client: Client, item: IDDragonItem) {
    this.name = item.name;
    this.rawDescription = item.description;
    this.plaintext = item.plaintext;
    this.into = item.into;
    this.image = new Image(client, item.image);
    this.basePrice = item.gold.base;
    this.isPurchasable = item.gold.purchasable;
    this.totalPrice = item.gold.total;
    this.sellPrice = item.gold.sell;
    this.tags = item.tags;
    this.maps = client.maps.filter((map) => item.maps[map.mapId.toString()]);
    this.stats = item.stats;
  }
}
