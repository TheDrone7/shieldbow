import type { Client } from 'client';
import { IDDragonItem, IMerakiItem, Item, ItemManager as WebIM } from '@shieldbow/web';
import type { FetchOptions } from 'types';
import { parseFetchOptions } from 'utilities';
import { Collection } from '@discordjs/collection';

/**
 * An item manager - to fetch and manage all item data.
 */
export class ItemManager extends WebIM {
  /**
   * The client this item manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new item manager.
   *
   * @param client - The client this item manager belongs to.
   */
  constructor(client: Client) {
    super(client);
    this.client = client;
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
      const items = <{ [id: string]: IDDragonItem }>await this._fetchItemsFromDDragon(opts);
      const merakiItems = <{ [id: string]: IMerakiItem }>await this._fetchItemsFromMerakiWithOpts(opts);
      const result = new Collection<string, Item>();
      for (const key of Object.keys(items)) {
        const item = new Item(this.client, key, items[key], merakiItems[key]);
        result.set(key, item);
        const toCache = typeof cache === 'function' ? cache(item) : cache;
        if (toCache) {
          this.client.logger?.trace(`Caching item ${key}`);
          await this.client.cache.set(`item:${key}`, item);
        }
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
      if (ignoreCache !== true) {
        const item = await this.client.cache.get<Item>(`item:${key}`);
        const toIgnoreCache = typeof ignoreCache === 'function' && item !== undefined ? ignoreCache(item) : ignoreCache;
        if (!toIgnoreCache && item !== undefined) return item;
      }

      const items = await this.fetchAll(opts);
      if (items && items.has(key)) return items.get(key)!;
      else return Promise.reject('There is no item with that ID');
    } catch (error) {
      return Promise.reject(error);
    }
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
    const item = await this.client.cache.find<Item>(
      (item) => item.isPurchasable !== undefined && item.name.toLowerCase().includes(name.toLowerCase())
    );
    if (item) {
      const toIgnoreCache = typeof opts.ignoreCache === 'function' ? opts.ignoreCache(item) : !!opts.ignoreCache;
      if (!toIgnoreCache) return item;
    }
    const items = await this.fetchAll(opts);
    return items.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Fetch multiple items at once.
   *
   * @param keys - The keys of the items to fetch.
   * @param options - The basic fetching options.
   */
  async fetchMany(keys: string[], options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'items', options);
    this.client.logger?.trace(`Fetching items ${keys.join(', ')}`);
    try {
      const result = new Collection<string, Item>();
      for (const key of keys) {
        const item = await this.fetch(key, opts);
        if (item) result.set(key, item);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  protected async _fetchItemsFromDDragon(options: FetchOptions) {
    const { store, ignoreStorage } = options;
    try {
      this.client.logger?.trace('Checking storage for ddragon items.');
      const items = await this.client.storage.load<{ [key: string]: IDDragonItem }>(
        `ddragon-${this.client.version}`,
        'items'
      );
      const toIgnoreStorage = typeof ignoreStorage === 'function' ? ignoreStorage(items) : ignoreStorage;
      if (!toIgnoreStorage) return items;
      else throw new Error('Ignore storage');
    } catch (err) {
      this.client.logger?.trace('Fetching items from DDragon');
      const response = await this.client.fetch<{ data: unknown }>(
        this.client.generateUrl('item.json', 'dDragon', !!options.noVersion)
      );
      this.client.logger?.trace('Items fetched from DDragon');
      const toStore = typeof store === 'function' ? store(response.data) : store;
      if (toStore) {
        this.client.logger?.trace('Storing items to storage.');
        await this.client.storage.save(`ddragon-${this.client.version}`, 'items', response.data);
      }
      return response.data;
    }
  }

  private async _fetchItemsFromMerakiWithOpts(options: FetchOptions) {
    const { store, ignoreStorage } = options;
    try {
      this.client.logger?.trace('Checking storage for meraki items.');
      const items = await this.client.storage.load<{ [id: string]: IMerakiItem }>(
        `meraki-${this.client.version}`,
        'items'
      );
      const toIgnoreStorage = typeof ignoreStorage === 'function' ? ignoreStorage(items) : ignoreStorage;
      if (!toIgnoreStorage) return items;
      else throw new Error('Ignore storage');
    } catch (err) {
      const response = await this._fetchItemsFromMeraki().catch(() => undefined);
      if (!response) return Promise.reject('Failed to fetch items from Meraki');
      const toStore = typeof store === 'function' ? store(response) : store;
      if (toStore) {
        this.client.logger?.trace('Storing meraki items to storage.');
        await this.client.storage.save(`meraki-${this.client.version}`, 'items', response);
      }
      return response;
    }
  }

  protected async _fetchItemsFromMeraki() {
    try {
      this.client.logger?.trace('Fetching items from Meraki');
      const response = await this.client.fetch(this.client.generateMerakiUrl('item'));
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
