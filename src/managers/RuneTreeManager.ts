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
    return new Promise(async (resolve, reject) => {
      let result;
      if (!options.ignoreStorage) {
        this.client.logger?.trace(`Fetching runes from local storage`);
        const data = this.client.storage.fetch<RuneTreeData[]>(storagePath, 'runes');
        result = 'then' in data ? await data.catch(() => undefined) : data;
      }
      if (result) resolve(result);
      else {
        this.client.logger?.trace(`Fetching runes from DDragon`);
        const response = await this.client.http.get(
          `${this.client.version}/data/${this.client.locale}/runesReforged.json`
        );
        if (response.status !== 200) reject('Unable to fetch runes from Data dragon');
        else {
          if (options.store) await this.client.storage.save(response.data, storagePath, 'runes');
          resolve(response.data);
        }
      }
    });
  }

  /**
   * Fetch all rune trees.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'runes', options);
    const { cache } = opts;
    return new Promise<Collection<string, RuneTree>>(async (resolve, reject) => {
      const runeTrees = <RuneTreeData[]>await this._fetchLocalRunes(opts).catch(reject);
      const result = new Collection<string, RuneTree>();
      for (const tree of runeTrees) {
        const runeTree = new RuneTree(this.client, tree);
        result.set(runeTree.key, runeTree);
        if (cache) await this.client.cache.set(`rune:${runeTree.key}`, runeTree);
      }
      resolve(result);
    });
  }

  /**
   * Fetch all runes.
   * @param options - The basic fetching options.
   */
  async fetchAllRunes(options?: FetchOptions): Promise<Rune[]> {
    let runeTrees = new Collection<string, RuneTree>();
    const keys = (await this.client.cache.keys()).filter((k) => k.startsWith('rune:'));
    if (keys.length < 5) runeTrees = await this.fetchAll(options);
    else
      for (const key of keys) {
        const runeTree = await this.client.cache.get<RuneTree>(key);
        runeTrees.set(runeTree.key, runeTree);
      }

    return runeTrees.map((t) => t.slots.map((r) => [...r.values()])).flat(2);
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
    return new Promise<RuneTree>(async (resolve, reject) => {
      const exists = await this.client.cache.has(`rune:${key}`);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(`rune:${key}`));
      else {
        const runeTrees = await this.fetchAll(opts).catch(reject);
        if (runeTrees && runeTrees.has(key)) resolve(runeTrees.get(key)!);
        else reject('There is no rune tree with that key');
      }
    });
  }

  /**
   * Fetch a rune by its key. The key is mostly the same as the rune name, for example - `Electrocute`.
   *
   * @param key - The key of the rune.
   * @param options - Additional fetch options.
   */
  async fetchRune(key: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'runes', options);
    return new Promise<Rune>(async (resolve, reject) => {
      const runes = await this.fetchAllRunes(opts).catch(reject);
      if (runes) {
        const rune = runes.find((r) => r.key === key);
        if (rune) resolve(rune);
        else reject('There is no rune with that key');
      }
    });
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
