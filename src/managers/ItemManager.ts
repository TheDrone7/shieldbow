import type { Client } from '../client';
import type { BaseManager, ItemData } from '../types';
import { Item } from '../data';
import Collection from '@discordjs/collection';
import { StorageManager } from './index';
import path from 'path';

export class ItemManager implements BaseManager {
  /**
   * A collection of the items cached in the memory.
   */
  readonly cache: Collection<string, Item>;
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  private readonly _itemData?: StorageManager;

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

  async fetch(id: any, options: { force: boolean } = { force: false }) {
    return new Promise<Item>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else if (this.client.version === 'null') reject('Please initialize the client first.');
      else {
        const items = <{ [id: string]: ItemData }>await this._fetchLocalItems().catch(reject);
        for (const key of Object.keys(items)) {
          const item = new Item(this.client, key, items[key]);
          this.cache.set(key, item);
        }
        if (this.cache.has(id)) resolve(this.cache.get(id)!);
        else reject('There is no item with that ID');
      }
    });
  }

  /**
   * Find an item by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   * @param name The name of the item to look for.
   */
  async findByName(name: string) {
    if (!this.cache.has('1001')) await this.fetch('1001');
    return this.cache.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }
}
