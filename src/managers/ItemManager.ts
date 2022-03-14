import type { Client } from '../client';
import type { BaseManager, ItemData } from '../types';
import { Item } from '../structures';
import Collection from '@discordjs/collection';
import { StorageManager } from './index';
import path from 'path';

/**
 * An item manager - to fetch and manage all item data.
 */
export class ItemManager implements BaseManager<Item> {
  /**
   * A collection of the items cached in the memory.
   */
  readonly cache: Collection<string, Item>;
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  private readonly _itemData?: StorageManager;

  /**
   * Create a new item manager.
   *
   * @param client The client this manager belongs to.
   * @param cacheSettings The basic caching settings.
   */
  constructor(client: Client, cacheSettings: { enable: boolean; root: string }) {
    this.client = client;
    this.cache = new Collection<string, Item>();
    if (cacheSettings.enable) this._itemData = new StorageManager(client, 'dDragon/items', cacheSettings.root);
  }

  private async _fetchLocalItems() {
    if (this._itemData)
      this._itemData.pathName = path.join('dDragon', this.client.version, this.client.language, 'items');
    return new Promise(async (resolve, reject) => {
      const data = this._itemData?.fetch('items');
      if (data) resolve(data);
      else {
        const response = await this.client.http.get(`${this.client.version}/data/${this.client.language}/item.json`);
        if (response.status !== 200) reject('Unable to fetch items from Data dragon');
        else {
          this._itemData?.store('items', response.data.data);
          resolve(response.data.data);
        }
      }
    });
  }

  private async _fetchAll() {
    return new Promise(async (resolve, reject) => {
      const items = <{ [id: string]: ItemData }>await this._fetchLocalItems().catch(reject);
      for (const key of Object.keys(items)) {
        const item = new Item(this.client, key, items[key]);
        this.cache.set(key, item);
      }
      resolve(this.cache);
    });
  }

  /**
   * Fetch an item by its 4-digit ID. The ID must be a string of 4 digits (not a number)
   *
   * @param key The ID of the item to fetch.
   * @param options The basic fetching options.
   */
  async fetch(key: string, options: { force: boolean } = { force: false }) {
    return new Promise<Item>(async (resolve, reject) => {
      if (this.cache.has(key) && !options.force) resolve(this.cache.get(key)!);
      else if (this.client.version === 'null') reject('Please initialize the client first.');
      else {
        await this._fetchAll();
        if (this.cache.has(key)) resolve(this.cache.get(key)!);
        else reject('There is no item with that ID');
      }
    });
  }

  /**
   * Find an item by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name The name of the item to look for.
   */
  async findByName(name: string) {
    if (!this.cache.size) await this._fetchAll();
    return this.cache.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }
}
