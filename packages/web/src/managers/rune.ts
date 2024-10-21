import type { Client } from 'client';
import type { BaseManager, FetchOptions, IDDragonRuneTree } from 'types';
import { Rune, RuneTree, StatRune } from 'structures';
import { Collection } from '@discordjs/collection';
import { parseFetchOptions, statRunesData } from 'utilities';

/**
 * A rune trees manager - to fetch and manage rune trees data.
 */
export class RuneTreeManager implements BaseManager<RuneTree> {
  /**
   * The client this rune tree manager belongs to.
   */
  readonly client: Client;

  protected _statRunes: StatRune[];

  /**
   * Create a new rune trees manager.
   * @param client - The client this rune tree manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
    this._statRunes = [];
  }

  /**
   * Initialize the rune tree manager, fill up stat runes.
   */
  initialize() {
    this._statRunes = statRunesData.map((sr) => new StatRune(this.client, sr.name, sr.id, sr.icon, sr.description));
  }

  /**
   * All of the stat runes in the game - such as attack speed, adaptive force, etc.
   */
  get statRunes() {
    return this._statRunes;
  }

  /**
   * Fetch all rune trees.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'runes', options);
    const { cache } = opts;
    try {
      const runeTrees = <IDDragonRuneTree[]>await this._fetchRunesFromDDragon(opts);
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
   * Fetch all runes (excludes stat runes).
   * @param options - The basic fetching options.
   */
  async fetchAllRunes(options?: FetchOptions): Promise<Rune[]> {
    try {
      let runeTrees = new Collection<string, RuneTree>();
      const keys = (await this.client.cache.keys()).filter((k) => k.startsWith('rune:'));
      if (keys.length < 5) runeTrees = await this.fetchAll(options);
      else
        for (const key of keys) {
          const runeTree = await this.client.cache.get<RuneTree>(key)!;
          runeTrees.set(runeTree.key, runeTree);
        }

      return runeTrees.map((t) => [t.runes.map((r) => [...r.values()]), ...t.keystones]).flat(3);
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
        if (exists) return this.client.cache.get<RuneTree>(`rune:${key}`)!;
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
   * Does not include stat runes.
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
   * Fetch a rune by its name.
   * The search is case-insensitive.
   * The special characters are not ignored.
   * Does not include stat runes.
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
   * @param id - The numerical ID of the rune tree to look for.
   * @param options - The basic fetching options.
   */
  async fetchById(id: number, options?: FetchOptions) {
    const runeTrees = await this.fetchAll(options).catch(() => undefined);
    return runeTrees?.find((i) => i.id === id);
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

  protected async _fetchRunesFromDDragon(options: FetchOptions) {
    try {
      this.client.logger?.trace(`Fetching runes from DDragon`);
      const response = await this.client.fetch(
        this.client.generateUrl(`runesReforged.json`, 'dDragon', options.noVersion)
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
