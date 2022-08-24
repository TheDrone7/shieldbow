import type { Client } from '../client';
import type { BaseManager, FetchOptions, RuneTreeData } from '../types';
import { Rune, RuneTree } from '../structures';
import { Collection } from '@discordjs/collection';
import { StorageManager } from './index';
import path from 'path';

/**
 * A rune trees manager - to fetch and manage rune trees data.
 */
export class RuneTreeManager implements BaseManager<RuneTree> {
  /**
   * A collection of the rune trees cached in the memory.
   *
   * Only use this if you absolutely must.
   * Prioritize using {@link RuneTreeManager.fetch | fetch} instead.
   */
  readonly cache: Collection<string, RuneTree>;
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  private readonly _runesData?: StorageManager;

  /**
   * Create a new rune trees manager.
   * @param client - The client this manager belongs to.
   * @param cacheSettings - The basic caching settings.
   */
  constructor(client: Client, cacheSettings: { enable: boolean; root: string }) {
    this.client = client;
    this.cache = new Collection<string, RuneTree>();
    if (cacheSettings.enable) this._runesData = new StorageManager(client, 'dDragon/runes', cacheSettings.root);
  }

  /**
   * An array of runes that have been saved in the cache.
   *
   * This is similar to the cache but the cache is a collection of Rune Trees and this is an array of runes.
   *
   * Only use this if you absolutely must.
   * Prioritize using {@link RuneTreeManager.fetchRune | fetchRune} instead.
   */
  get cachedRunes(): Rune[] {
    return this.cache.map((t) => t.slots.map((r) => [...r.values()])).flat(2);
  }

  private async _fetchLocalRunes() {
    if (this._runesData)
      this._runesData.pathName = path.join('dDragon', this.client.version, this.client.locale, 'runes');
    return new Promise(async (resolve, reject) => {
      const data = this._runesData?.fetch('runes');
      if (data) resolve(data);
      else {
        const response = await this.client.http.get(
          `${this.client.version}/data/${this.client.locale}/runesReforged.json`
        );
        if (response.status !== 200) reject('Unable to fetch runes from Data dragon');
        else {
          this._runesData?.store('runes', response.data);
          resolve(response.data);
        }
      }
    });
  }

  private async _fetchAll() {
    return new Promise(async (resolve, reject) => {
      const runeTrees = <RuneTreeData[]>await this._fetchLocalRunes().catch(reject);
      for (const tree of runeTrees) {
        const runeTree = new RuneTree(this.client, tree);
        this.cache.set(runeTree.key, runeTree);
      }
      resolve(this.cache);
    });
  }

  /**
   * Fetch a rune tree by its key. The key is the same as the rune tree's name, for example - `Domination`.
   *
   * @param key - The key of the rune tree to fetch.
   * @param options - Additional fetch options.
   */
  async fetch(key: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    return new Promise<RuneTree>(async (resolve, reject) => {
      if (this.cache.has(key) && !force) resolve(this.cache.get(key)!);
      else {
        await this._fetchAll().catch(reject);
        if (this.cache.has(key)) resolve(this.cache.get(key)!);
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
  async fetchRune(key: string, options: { force: boolean } = { force: false }) {
    return new Promise<Rune>(async (resolve, reject) => {
      const rune = this.cachedRunes.find((r) => r.key === key);
      if (rune && !options.force) resolve(rune!);
      else {
        if (!this.cache.size) await this._fetchAll().catch(reject);
        const rune = this.cachedRunes.find((r) => r.key === key);
        if (rune) resolve(rune!);
        else reject('There is no rune with that key');
      }
    });
  }

  /**
   * Find a rune tree by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name - The name of the rune tree to look for.
   */
  async findByName(name: string) {
    if (!this.cache.size) await this._fetchAll().catch(() => {});
    return this.cache.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Find a rune by its name.
   * The search is case-insensitive.
   * The special characters are not ignored.
   *
   * @param name - The name of the rune to look for.
   */
  async findRuneByName(name: string) {
    if (!this.cache.size) await this._fetchAll().catch(() => {});
    return this.cachedRunes.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
  }
  /**
   * Find a rune tree by its numerical ID.
   *
   * @param id - The numerical ID of the rune tree to look for.
   */
  async findById(id: number) {
    if (!this.cache.size) await this._fetchAll().catch(() => {});
    return this.cache.find((i) => i.id === id);
  }

  /**
   * Find a rune by its numerical ID.
   *
   * @param id - The numerical ID of the rune to look for.
   */
  async findRuneById(id: number) {
    if (!this.cache.size) await this._fetchAll().catch(() => {});
    return this.cachedRunes.find((i) => i.id === id);
  }
}
