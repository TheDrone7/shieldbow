import type { Client } from 'client';
import { Rune, RuneTree, StatRune, statRunesData, IDDragonRuneTree, RuneTreeManager as WebRTM } from '@shieldbow/web';
import { Collection } from '@discordjs/collection';
import { parseFetchOptions } from 'utilities';
import type { FetchOptions } from 'types';

/**
 * A rune trees manager - to fetch and manage rune trees data.
 */
export class RuneTreeManager extends WebRTM {
  /**
   * The client this rune tree manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new rune trees manager.
   * @param client - The client this rune tree manager belongs to.
   */
  constructor(client: Client) {
    super(client);
    this.client = client;
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
        const toCache = typeof cache === 'function' ? cache(runeTree) : !!cache;
        if (toCache) await this.client.cache.set(`rune:${runeTree.key}`, runeTree);
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
    const opts = parseFetchOptions(this.client, 'runes', options);
    const { ignoreCache } = opts;
    try {
      let runeTrees = new Collection<string, RuneTree>();
      const keys = (await this.client.cache.keys()).filter((k) => k.startsWith('rune:'));
      for (const key of keys) {
        const runeTree = await this.client.cache.get<RuneTree>(key)!;
        const toIgnoreCache = typeof ignoreCache === 'function' ? ignoreCache(runeTree) : !!ignoreCache;
        if (!toIgnoreCache) runeTrees.set(runeTree.key, runeTree);
      }

      if (runeTrees.size < 5) runeTrees = await this.fetchAll(opts);

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
      const runeTree = await this.client.cache.get<RuneTree>(`rune:${key}`);
      const toIgnoreCache =
        typeof ignoreCache === 'function' && runeTree !== undefined ? ignoreCache(runeTree) : !!ignoreCache;
      if (runeTree && !toIgnoreCache) return runeTree;

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
    const { store, ignoreStorage } = options;
    this.client.logger?.trace(`Checking runes in storage.`);
    try {
      const runes = await this.client.storage.load<IDDragonRuneTree[]>(`ddragon-${this.client.version}`, 'runes');
      const toIgnoreStorage =
        typeof ignoreStorage === 'function' && runes !== undefined ? ignoreStorage(runes) : !!ignoreStorage;
      if (runes && !toIgnoreStorage) {
        this.client.logger?.trace(`Runes found in storage, now returning.`);
        return runes;
      } else throw new Error('Ignore storage');
    } catch (error) {
      this.client.logger?.trace(`Fetching runes from DDragon`);
      const response = await this.client.fetch<IDDragonRuneTree[]>(
        this.client.generateUrl(`runesReforged.json`, 'dDragon', !!options.noVersion)
      );
      if (response) {
        const toStore = typeof store === 'function' ? store(response) : !!store;
        if (toStore) {
          this.client.logger?.trace(`Storing runes in storage.`);
          await this.client.storage.save(`ddragon-${this.client.version}`, 'runes', response);
        }
      }
      return response;
    }
  }
}
