import type { Client } from '../client';
import type { BaseManager, FetchOptions, RuneTreeData } from '../types';
import { Rune, RuneTree } from '../structures';
import { Collection } from '@discordjs/collection';
import { parseFetchOptions } from '../util';

/**
 * A rune trees manager - to fetch and manage rune trees data.
 */
export class RuneTreeManager implements BaseManager<RuneTree> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new rune trees manager.
   * @param client - The client this manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  private async _fetchLocalRunes(options: FetchOptions) {
    const storagePath = ['runes', this.client.patch, this.client.locale].join(':');
    if (!options.ignoreStorage) {
      this.client.logger?.trace(`Fetching runes from local storage`);
      const data = this.client.storage.fetch<RuneTreeData[]>(storagePath, 'runes');
      const result = data instanceof Promise ? await data.catch(() => undefined) : data;
      if (result) return result;
    }
    try {
      this.client.logger?.trace(`Fetching runes from DDragon`);
      const response = await this.client.http.get(
        `${this.client.version}/data/${this.client.locale}/runesReforged.json`
      );
      if (response.status !== 200) return Promise.reject('Unable to fetch runes from Data dragon');
      else {
        if (options.store) await this.client.storage.save(response.data, storagePath, 'runes');
        return response.data;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all rune trees.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'runes', options);
    const { cache } = opts;
    try {
      const runeTrees = <RuneTreeData[]>await this._fetchLocalRunes(opts);
      const result = new Collection<string, RuneTree>();
      for (const tree of runeTrees) {
        const runeTree = new RuneTree(this.client, tree);
        result.set(runeTree.key, runeTree);
        if (cache) await this.client.cache.set(`rune:${runeTree.key}`, runeTree);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all runes.
   * @param options - The basic fetching options.
   */
  async fetchAllRunes(options?: FetchOptions): Promise<Rune[]> {
    try {
      let runeTrees = new Collection<string, RuneTree>();
      const keys = (await this.client.cache.keys()).filter((k) => k.startsWith('rune:'));
      if (keys.length < 5) runeTrees = await this.fetchAll(options);
      else
        for (const key of keys) {
          const runeTree = await this.client.cache.get<RuneTree>(key);
          runeTrees.set(runeTree.key, runeTree);
        }

      return runeTrees.map((t) => t.slots.map((r) => [...r.values()])).flat(2);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a rune tree by its key. The key is the same as the rune tree's name, for example - `Domination`.
   *
   * @param key - The key of the rune tree to fetch.
   * @param options - Additional fetch options.
   */
  async fetch(key: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'runes', options);
    const { ignoreCache } = opts;
    this.client.logger?.trace(`Fetching rune tree ${key}`);

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`rune:${key}`);
        if (exists) return this.client.cache.get<RuneTree>(`rune:${key}`);
      }

      const runeTrees = await this.fetchAll(opts);
      if (runeTrees && runeTrees.has(key)) return runeTrees.get(key)!;
      else return Promise.reject('There is no rune tree with that key');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a rune by its key. The key is mostly the same as the rune name, for example - `Electrocute`.
   *
   * @param key - The key of the rune.
   * @param options - Additional fetch options.
   */
  async fetchRune(key: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'runes', options);

    try {
      const runes = await this.fetchAllRunes(opts);
      const rune = runes.find((r) => r.key === key);
      if (rune) return rune;
      else return Promise.reject('There is no rune with that key');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Find a rune tree by its name.
   *
   * @deprecated Please use {@link RuneTreeManager.fetchByName | fetchByName} instead.
   * @param name - The name of the rune tree to look for.
   */
  async findByName(name: string) {
    return this.fetchByName(name);
  }

  /**
   * Fetch a rune tree by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name - The name of the rune tree to look for.
   * @param options - The basic fetching options.
   */
  async fetchByName(name: string, options?: FetchOptions) {
    const runeTrees = await this.fetchAll(options).catch(() => undefined);
    return runeTrees?.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Find a rune by its name.
   *
   * @deprecated Please use {@link RuneTreeManager.fetchRuneByName | fetchRuneByName} instead.
   * @param name - The name of the rune to look for.
   */
  async findRuneByName(name: string) {
    return this.fetchRuneByName(name);
  }

  /**
   * Fetch a rune by its name.
   * The search is case-insensitive.
   * The special characters are not ignored.
   *
   * @param name - The name of the rune to look for.
   * @param options - The basic fetching options.
   */
  async fetchRuneByName(name: string, options?: FetchOptions) {
    const runes = await this.fetchAllRunes(options).catch(() => undefined);
    return runes?.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Find a rune tree by its numerical ID.
   *
   * @deprecated Please use {@link RuneTreeManager.fetchById | fetchById} instead.
   * @param id - The numerical ID of the rune tree to look for.
   */
  async findById(id: number) {
    return this.fetchById(id);
  }

  /**
   * Find a rune tree by its numerical ID.
   *
   * @param id - The numerical ID of the rune tree to look for.
   * @param options - The basic fetching options.
   */
  async fetchById(id: number, options?: FetchOptions) {
    const runeTrees = await this.fetchAll(options).catch(() => undefined);
    return runeTrees?.find((i) => i.id === id);
  }

  /**
   * Find a rune by its numerical ID.
   *
   * @deprecated Please use {@link RuneTreeManager.fetchRuneById | fetchRuneById} instead.
   * @param id - The numerical ID of the rune to look for.
   */
  async findRuneById(id: number) {
    return this.fetchRuneById(id);
  }

  /**
   * Fetch a rune by its numerical ID.
   *
   * @param id - The numerical ID of the rune to look for.
   * @param options - The basic fetching options.
   */
  async fetchRuneById(id: number, options?: FetchOptions) {
    const runes = await this.fetchAllRunes(options).catch(() => undefined);
    return runes?.find((i) => i.id === id);
  }
}
