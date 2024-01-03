import { BaseManager, IDataDragonChampion, IMerakiChampion, ICDragonChampion, Champion } from '@shieldbow/web';
import type { Client } from 'client';
import { Collection } from '@discordjs/collection';
import { FetchOptions } from 'types';
import { parseFetchOptions } from 'utilities';

/**
 * A champion manager - to fetch and manage all the champion data.
 */
export class ChampionManager implements BaseManager<Champion> {
  /**
   * The client that this champion manager belongs to.
   */
  readonly client: Client;
  private _cacheVersion: string;
  private _cache: Collection<string, IMerakiChampion> = new Collection();

  /**
   * Create a new Champions Manager
   *
   * @param client - The client this champion manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
    this._cacheVersion = client.version!;
  }

  /**
   * Fetch all the champions and store it in the cache.
   *
   * This always fetches freshly from data dragon, community dragon and meraki analytics.
   *
   * @param options - The basic fetching options (only `cache` and `store` affect this method).
   */
  async fetchAll(options?: FetchOptions): Promise<Collection<string, Champion>> {
    const opts = parseFetchOptions(this.client, 'champions', options);
    this.client.logger?.trace(`Fetching all champions with options: `, opts);

    try {
      const response = await this.client.fetch(this.client.generateUrl('championFull.json'));
      const result = new Collection<string, Champion>();
      const champs = <{ data: { [champ: string]: IDataDragonChampion } }>response;
      for (const key of Object.keys(champs.data)) {
        const champ = champs.data[key];
        const { cDragon, meraki } = await this.fetchChampionOthers(champ.id, opts);
        const champion = new Champion(this.client, champs.data[key], cDragon, meraki);
        result.set(key, champion);

        const toCache = typeof opts.cache === 'function' ? opts.cache(champion) : opts.cache;
        if (toCache) await this.client.cache.set(`champion:${key}`, champion);
        const toStore = typeof opts.store === 'function' ? opts.store(champion) : opts.store;
        if (toStore) {
          await this.client.storage.save(`dDragon-champion`, key, champ);
          await this.client.storage.save(`cDragon-champion`, key, cDragon);
          await this.client.storage.save(`meraki-champion`, key, meraki);
        }
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetches a champion by the champion ID.
   * @param id - The {@link Champion.id | ID} of the champion whose data needs to be fetched.
   * @param options - The basic fetching options.
   */
  async fetch(id: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'champions', options);
    const { cache, ignoreCache } = opts;
    const cacheId = `champion:${id}`;
    this.client.logger?.trace(`Fetching champion '${id}' with options: `, opts);
    if (id === 'FiddleSticks') id = 'Fiddlesticks'; // There is some internal inconsistency in Riot's JSON files.
    try {
      if (ignoreCache !== false) {
        this.client.logger?.trace(`Checking cache for champion '${id}'.`);
        const exists = await this.client.cache.has(cacheId);
        const toIgnoreCache = typeof ignoreCache === 'function' ? ignoreCache(exists) : !!ignoreCache;
        if (exists && toIgnoreCache) {
          this.client.logger?.trace(`Found champion '${id}' in cache, now returning.`);
          return this.client.cache.get<Champion>(cacheId)!;
        }
      }

      const champ = await this.fetchChampionDragon(id, opts);
      const { cDragon, meraki } = await this.fetchChampionOthers(id, opts);
      const champion = new Champion(this.client, champ, cDragon, meraki);

      const toCache = typeof cache === 'function' ? cache(champion) : cache;
      if (toCache) {
        this.client.logger?.trace(`Storing champion '${id}' in cache.`);
        await this.client.cache.set(cacheId, champion);
      }
      return champion;
    } catch (error) {
      this.client.logger?.warn(`Failed to fetch champion: '${id}'.`);
      this.client.logger?.error(error);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a champion by their name (instead of ID, which is very similar but not the same as the name).
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name - The name of the champions to fetch.
   * @param options - The basic fetching options.
   */
  async fetchByName(name: string, options?: FetchOptions) {
    return this.fetchByNames([name], options).then((c) => c.first());
  }

  /**
   * Fetch and cache champion by their unique 3-digit keys.
   *
   * This is mostly for internal use while fetching match (or live match) data to improve performance.
   *
   * @param key - The key of the champions to fetch.
   * @param options - The basic fetching options.
   */
  async fetchByKey(key: number, options?: FetchOptions) {
    return this.fetchByKeys([key], options).then((c) => c.first());
  }

  /**
   * Fetch and cache champions by their names.
   *
   * @param names - The names of the champions to fetch.
   * @param options - The basic fetching options.
   */
  async fetchByNames(names: string[], options?: FetchOptions): Promise<Collection<string, Champion>> {
    const opts = parseFetchOptions(this.client, 'champions', options);
    const { cache, ignoreCache } = opts;
    this.client.logger?.trace(`Fetching champions '${names}' with options: `, opts);

    try {
      const result = new Collection<string, Champion>();
      if (!ignoreCache)
        for (const name of names) {
          const champ = await this.client.cache.find<Champion>((c: Champion) =>
            c.name.toLowerCase().includes(name.toLowerCase())
          );
          if (champ) {
            result.set(champ.id, champ);
            names = names.filter((n) => n !== name);
          }
        }
      if (names.length < 1) return result;
      const response = await this.client.fetch(this.client.generateUrl('championFull.json'));
      const champs = <{ data: { [champ: string]: IDataDragonChampion } }>response;
      for (const key of Object.keys(champs.data)) {
        const champ = champs.data[key];
        if (names.some((n) => champ.name.toLowerCase().includes(n.toLowerCase()))) {
          const { cDragon, meraki } = await this.fetchChampionOthers(champ.id, opts);
          const champion = new Champion(this.client, champs.data[key], cDragon, meraki);
          result.set(key, champion);
          if (cache) await this.client.cache.set(`champion:${key}`, champion);
        }
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch and cache champions by their unique 3-digit keys.
   *
   * This is mostly for internal use while fetching match (or live match) data to improve performance.
   * Ideally, any user would be using {@link ChampionManager.fetch | fetch}.
   *
   * @param keys - The keys of the champions to fetch.
   * @param options - The basic fetching options.
   */
  async fetchByKeys(keys: number[], options?: FetchOptions): Promise<Collection<string, Champion>> {
    const opts = parseFetchOptions(this.client, 'champions', options);
    const { cache, ignoreCache } = opts;
    this.client.logger?.trace(`Fetching champions '${keys}' with options: `, opts);

    try {
      const result = new Collection<string, Champion>();
      if (!ignoreCache)
        for (const key of keys) {
          const champ = await this.client.cache.find((c: Champion) => c.key === key);
          if (champ) {
            result.set(champ.id, champ);
            keys = keys.filter((k) => k !== key);
          }
        }
      if (keys.length < 1) return result;
      const response = await this.client.fetch(this.client.generateUrl('championFull.json'));
      const champs = <{ data: { [champ: string]: IDataDragonChampion } }>response;
      for (const key of Object.keys(champs.data)) {
        const champ = champs.data[key];
        if (keys.some((k) => champ.key === String(k))) {
          const { cDragon, meraki } = await this.fetchChampionOthers(champ.id, opts);
          const champion = new Champion(this.client, champs.data[key], cDragon, meraki);
          result.set(key, champion);
          if (cache) await this.client.cache.set(`champion:${key}`, champion);
        }
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async fetchChampionDragon(id: string, options: FetchOptions) {
    this.client.logger?.trace(`Checking storage for champion '${id}'.`);
    const dDragon = await this.client.storage.load<IDataDragonChampion>(`ddragon-${this.client.version}-champion`, id);
    const toIgnoreStorage =
      typeof options.ignoreStorage === 'function' && dDragon !== undefined
        ? options.ignoreStorage(!!dDragon)
        : !!options.ignoreStorage;
    if (dDragon && !toIgnoreStorage) {
      this.client.logger?.trace(`Found champion '${id}' in storage, now returning.`);
      return dDragon;
    }

    this.client.logger?.trace(`Champion '${id}' not found in storage, fetching from data dragon.`);
    const response = await this.client.fetch(
      this.client.generateUrl(`champion/${id}.json`, 'dDragon', !!options.noVersion)
    );
    this.client.logger?.trace(`Fetched champion '${id}' from data dragon, now processing.`);
    const champs = <{ data: { [champ: string]: IDataDragonChampion } }>response;
    const key = Object.keys(champs.data)[0];

    const toStore = typeof options.store === 'function' ? options.store(champs.data[key]) : options.store;
    if (toStore) {
      this.client.logger?.trace(`Storing champion '${id}' in storage.`);
      this.client.storage.save(`ddragon-${this.client.version}-champion`, id, champs.data[key]);
    }

    return champs.data[key];
  }

  private async fetchChampionOthers(id: string, options: FetchOptions) {
    let meraki: IMerakiChampion = undefined!;
    this.client.logger?.trace(`Fetching champion '${id}' from other sources`);
    const cDragon = await this.client.fetch(
      this.client.generateUrl(
        `game/data/characters/${id.toLowerCase()}/${id.toLowerCase()}.bin.json`,
        'cDragon',
        !!options.noVersion
      )
    );
    if (this.client.version === this._cacheVersion && this._cache.has(id)) meraki = this._cache.get(id)!;
    else {
      const allMeraki = await this.client.fetch<{ [id: string]: IMerakiChampion }>(
        this.client.generateMerakiUrl('champion')
      );
      this._cacheVersion = this.client.version!;
      this._cache.clear();
      for (const id of Object.keys(allMeraki)) this._cache.set(id, allMeraki[id]);
      if (allMeraki[id]) meraki = allMeraki[id];
    }
    return { cDragon: <ICDragonChampion>cDragon, meraki };
  }
}
