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

    if (!options.ignoreStorage) {
      this.client.logger?.trace('Fetching items from storage');
      // This needs to be slightly modified to work with the new storage system.
      const data = this.client.storage.fetch<{ data: { [id: string]: ItemData } }>(storagePath, 'items');
      const result = data instanceof Promise ? await data.catch(() => undefined) : data;
      if (result) return result;
    }

    try {
      this.client.logger?.trace('Fetching items from DDragon');
      const response = await this.client.http.get(`${this.client.version}/data/${this.client.locale}/item.json`);
      if (response.status !== 200) return Promise.reject('Unable to fetch items from Data dragon');
      else {
        if (options.store) await this.client.storage.save({ data: response.data.data }, storagePath, 'items');
        return response.data.data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all items.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'items', options);
    const { cache } = opts;
    this.client.logger?.trace('Fetching all items');
    try {
      const items = <{ [id: string]: ItemData }>await this._fetchLocalItems(opts);
      const result = new Collection<string, Item>();
      for (const key of Object.keys(items)) {
        const item = new Item(this.client, key, items[key]);
        result.set(key, item);
        if (cache) await this.client.cache.set(`item:${key}`, item);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
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

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`item:${key}`);
        if (exists) return this.client.cache.get<Item>(`item:${key}`);
      }

      const items = await this.fetchAll(opts);
      if (items && items.has(key)) return items.get(key)!;
      else return Promise.reject('There is no item with that ID');
    } catch (error) {
      return Promise.reject(error);
    }
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
    try {
      const result = new Collection<string, Item>();
      for (const key of keys) {
        const item = await this.fetch(key, opts);
        if (item) result.set(key, item);
        if (cache) await this.client.cache.set(`item:${key}`, item);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
