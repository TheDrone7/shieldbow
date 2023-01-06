import type { Client } from '../client';
import type { BaseManager, FetchOptions, ItemData } from '../types';
import { Item } from '../structures';
import { parseFetchOptions } from '../util';
import { Collection } from '@discordjs/collection';

/**
 * An item manager - to fetch and manage all item data.
 */
export class ItemManager implements BaseManager<Item> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new item manager.
   *
   * @param client - The client this manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  private async _fetchLocalItems(options: FetchOptions) {
    const storagePath = ['items', this.client.patch, this.client.locale].join(':');
    return new Promise(async (resolve, reject) => {
      let result;
      if (!options.ignoreStorage) {
        this.client.logger?.trace('Fetching items from storage');
        // This needs to be slightly modified to work with the new storage system.
        const data = this.client.storage.fetch<{ data: { [id: string]: ItemData } }>(storagePath, 'items');
        result = data instanceof Promise ? await data.catch(() => undefined) : data;
      }
      if (result) resolve(result.data);
      else {
        this.client.logger?.trace('Fetching items from DDragon');
        const response = await this.client.http.get(`${this.client.version}/data/${this.client.locale}/item.json`);
        if (response.status !== 200) reject('Unable to fetch items from Data dragon');
        else {
          if (options.store) await this.client.storage.save({ data: response.data.data }, storagePath, 'items');
          resolve(response.data.data);
        }
      }
    });
  }

  /**
   * Fetch all items.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'items', options);
    const { cache } = opts;
    this.client.logger?.trace('Fetching all items');
    return new Promise<Collection<string, Item>>(async (resolve, reject) => {
      const items = <{ [id: string]: ItemData }>await this._fetchLocalItems(opts).catch(reject);
      const result = new Collection<string, Item>();
      for (const key of Object.keys(items)) {
        const item = new Item(this.client, key, items[key]);
        result.set(key, item);
        if (cache) await this.client.cache.set(`item:${key}`, item);
      }
      resolve(result);
    });
  }

  /**
   * Fetch an item by its 4-digit ID. The ID must be a string of 4 digits (not a number)
   *
   * @param key - The ID of the item to fetch.
   * @param options - The basic fetching options.
   */
  async fetch(key: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'items', options);
    const { ignoreCache } = opts;
    this.client.logger?.trace(`Fetching item ${key}`);
    return new Promise<Item>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`item:${key}`);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(`item:${key}`)!);
      else {
        const items = await this.fetchAll(opts).catch(reject);
        if (items && items.has(key)) resolve(items.get(key)!);
        else reject('There is no item with that ID');
      }
    });
  }

  /**
   * Find an item by its name.
   *
   * @deprecated Please use {@link ItemManager.fetchByName | fetchByName} instead.
   * @param name - The name of the item to look for.
   */
  async findByName(name: string) {
    return this.fetchByName(name);
  }

  /**
   * Fetch an item by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name - The name of the item to look for.
   * @param options - The basic fetching options.
   */
  async fetchByName(name: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'items', options);
    const item = await this.client.cache.find<Item>((item) => item.name.toLowerCase().includes(name.toLowerCase()));
    if (item) return item;
    const items = await this.fetchAll(opts);
    return items.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }

  async fetchMany(keys: string[], options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'items', options);
    const { cache } = opts;
    this.client.logger?.trace(`Fetching items ${keys.join(', ')}`);
    return new Promise<Collection<string, Item>>(async (resolve, reject) => {
      const result = new Collection<string, Item>();
      for (const key of keys) {
        const item = await this.fetch(key, opts).catch(reject);
        if (item) result.set(key, item);
        if (cache) await this.client.cache.set(`item:${key}`, item);
      }
      resolve(result);
    });
  }
}
