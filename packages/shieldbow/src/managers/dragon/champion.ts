import {
  IDataDragonChampion,
  IMerakiChampion,
  ICDragonChampion,
  Champion,
  ChampionManager as WebCM
} from '@shieldbow/web';
import type { Client } from 'client';
import { Collection } from '@discordjs/collection';
import { FetchOptions, IChampionRotation } from 'types';
import { parseFetchOptions } from 'utilities';

/**
 * A champion manager - to fetch and manage all the champion data.
 */
export class ChampionManager extends WebCM {
  /**
   * The client that this champion manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new Champions Manager
   *
   * @param client - The client this champion manager belongs to.
   */
  constructor(client: Client) {
    super(client);
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
        if (toStore) await this.client.storage.save(`ddragon-${this.client.version}-champion`, key, champ);
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
      if (ignoreCache !== true) {
        this.client.logger?.trace(`Checking cache for champion '${id}'.`);
        const champ = this.client.cache.get<Champion>(cacheId);
        const toIgnoreCache = typeof ignoreCache === 'function' ? ignoreCache(champ) : !!ignoreCache;
        if (champ && !toIgnoreCache) {
          this.client.logger?.trace(`Found champion '${id}' in cache, now returning.`);
          return champ;
        }
      }

      const champ = await this.fetchChampionDragon(id, opts).catch(() => undefined);
      if (!champ) return Promise.reject(`Champion with ID: '${id}' was not found in data dragon.`);
      const { cDragon, meraki } = await this.fetchChampionOthers(id, opts);
      const champion: Champion = new Champion(this.client, champ!, cDragon, meraki);

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
      for (const name of names) {
        const champ = await this.client.cache.find<Champion>((c: Champion) =>
          c.name.toLowerCase().includes(name.toLowerCase())
        );
        if (champ) {
          this.client.logger?.trace(`Found champion '${champ.id}' in cache.`);
          const toIgnoreCache = typeof ignoreCache === 'function' ? ignoreCache(champ) : !!ignoreCache;
          if (!toIgnoreCache) {
            this.client.logger?.trace(`Adding champion '${champ.id}' to result.`);
            result.set(champ.id, champ);
            names = names.filter((n) => n !== name);
          }
        }
      }

      if (names.length < 1) {
        this.client.logger?.trace(`All champions found in cache, now returning.`);
        return result;
      }

      this.client.logger?.trace(`Some champions not found in cache, now fetching.`);

      const expected = names.length;
      const champs = await this.fetchMultipleChampDragonByProp(names, 'name', opts);
      if (champs.length < expected) {
        this.client.logger?.trace(`Failed to fetch all champions. Expected: ${expected}, got: ${champs.length}`);
        return Promise.reject('Unable to fetch all champions');
      }

      for (const champ of champs) {
        const { cDragon, meraki } = await this.fetchChampionOthers(champ.id, opts);
        const champion = new Champion(this.client, champ, cDragon, meraki);
        result.set(champ.id, champion);

        const toCache = typeof cache === 'function' ? cache(champion) : cache;
        if (toCache) {
          this.client.logger?.trace(`Storing champion '${champ.id}' in cache.`);
          await this.client.cache.set(`champion:${champ.id}`, champion);
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
      for (const key of keys) {
        const champ = await this.client.cache.find((c: Champion) => c.key === key);
        if (champ) {
          this.client.logger?.trace(`Found champion '${champ.id}' in cache.`);

          const toIgnoreCache = typeof ignoreCache === 'function' ? ignoreCache(champ) : !!ignoreCache;
          if (!toIgnoreCache) {
            this.client.logger?.trace(`Adding champion '${champ.id}' to result.`);
            result.set(champ.id, champ);
            keys = keys.filter((k) => k !== key);
          }
        }
      }

      if (keys.length < 1) return result;

      const expected = keys.length;
      const champs = await this.fetchMultipleChampDragonByProp(keys, 'key', opts);

      if (champs.length < expected) {
        this.client.logger?.trace(`Failed to fetch all champions. Expected: ${expected}, got: ${champs.length}`);
        return Promise.reject('Unable to fetch all champions');
      }

      for (const champ of champs) {
        const { cDragon, meraki } = await this.fetchChampionOthers(champ.id, opts);
        const champion = new Champion(this.client, champ, cDragon, meraki);
        result.set(champ.id, champion);

        const toCache = typeof cache === 'function' ? cache(champion) : cache;
        if (toCache) {
          this.client.logger?.trace(`Storing champion '${champ.id}' in cache.`);
          await this.client.cache.set(`champion:${champ.id}`, champion);
        }
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetches the current free champion rotation.
   * @param options - The basic fetching options.
   */
  async fetchRotation(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'champions', options);
    this.client.logger?.trace(`Fetching champion rotation with options: `, opts);

    try {
      const response = await this.client.request<IChampionRotation>('/lol/platform/v3/champion-rotations', {
        debug: '',
        method: 'getChampionRotation',
        regional: false,
        region: opts.region ?? this.client.region
      });

      const rotation = new Collection<'all' | 'new', Champion[]>();
      const all = await this.fetchByKeys(response.freeChampionIds, opts);
      const newChamps = await this.fetchByKeys(response.freeChampionIdsForNewPlayers, opts);

      rotation.set('all', [...all.values()]);
      rotation.set('new', [...newChamps.values()]);
      return rotation;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async fetchChampionDragon(id: string, options: FetchOptions) {
    this.client.logger?.trace(`Checking storage for champion '${id}'.`);
    try {
      const dDragon = await this.client.storage.load<IDataDragonChampion>(
        `ddragon-${this.client.version}-champion`,
        id
      );
      const toIgnoreStorage =
        typeof options.ignoreStorage === 'function' && dDragon !== undefined
          ? options.ignoreStorage(!!dDragon)
          : !!options.ignoreStorage;
      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Found champion '${id}' in storage, now returning.`);
        return dDragon;
      } else throw new Error('Ignore storage is true');
    } catch (err) {
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
  }

  private async fetchMultipleChampDragonByProp(val: unknown[], prop: string, options: FetchOptions) {
    const result: IDataDragonChampion[] = [];
    val = [...val].map((v) => String(v).toLowerCase());

    this.client.logger?.trace(`Checking storage for champion with '${prop}' in '${val}'.`);
    const dDragon = await this.client.storage.filter<IDataDragonChampion>(
      `ddragon-${this.client.version}-champion`,
      (c: IDataDragonChampion) => val.includes(c[prop as keyof IDataDragonChampion].toString().toLowerCase())
    );

    for (const c of dDragon) {
      const toIgnoreStorage =
        typeof options.ignoreStorage === 'function' ? options.ignoreStorage(c) : !!options.ignoreStorage;

      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Found champion with '${prop}' in '${val}' in storage (${c.id}), adding to result.`);
        result.push(c);
        val = val.filter((v) => v !== c[prop as keyof IDataDragonChampion]);
      }
    }

    if (val.length === 0) {
      this.client.logger?.trace(`Found all champions in storage (${dDragon.map((c) => c.id)}), now returning.`);
      return result;
    }

    this.client.logger?.trace(`Champions with '${prop}' in '${val}' not found in storage, fetching from data dragon.`);
    const response = await this.client.fetch(
      this.client.generateUrl(`championFull.json`, 'dDragon', !!options.noVersion)
    );

    this.client.logger?.trace(`Fetched all champions, now processing.`);
    const champs = <{ data: { [champ: string]: IDataDragonChampion } }>response;
    const keys = Object.keys(champs.data);

    for (const key of keys) {
      const champ = champs.data[key];
      if (val.includes(champ[prop as keyof IDataDragonChampion].toString().toLowerCase())) {
        const toStore = typeof options.store === 'function' ? options.store(champ) : options.store;
        if (toStore) {
          this.client.logger?.trace(`Storing champion '${champ.id}' in storage.`);
          this.client.storage.save(`ddragon-${this.client.version}-champion`, champ.id, champ);
        }
        result.push(champ);
      }
    }

    return result;
  }

  protected override async fetchChampionOthers(id: string, options: FetchOptions) {
    let returnedMeraki: IMerakiChampion = undefined!;
    let returnedCDragon: ICDragonChampion = undefined!;

    this.client.logger?.trace(`Checking storage for cdragon champion '${id}'.`);
    try {
      const cDragon = await this.client.storage.load<ICDragonChampion>(`cdragon-${this.client.version}-champion`, id);
      const toIgnoreStorage =
        typeof options.ignoreStorage === 'function' && cDragon !== undefined
          ? options.ignoreStorage(!!cDragon)
          : !!options.ignoreStorage;
      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Found champion cdragon '${id}' in storage, returning from storage.`);
        returnedCDragon = cDragon!;
      } else throw new Error('Ignore storage is true');
    } catch (err) {
      this.client.logger?.trace(`Fetching champion '${id}' from cDragon.`);
      const cDragon = await this.client.fetch(
        this.client.generateUrl(
          `game/data/characters/${id.toLowerCase()}/${id.toLowerCase()}.bin.json`,
          'cDragon',
          !!options.noVersion
        )
      );
      this.client.logger?.trace(`Fetched champion '${id}' from cDragon, now processing.`);
      const champ = <ICDragonChampion>cDragon;
      const toStore = typeof options.store === 'function' ? options.store(champ) : options.store;
      if (toStore) {
        this.client.logger?.trace(`Storing champion '${id}' in storage.`);
        this.client.storage.save(`cdragon-${this.client.version}-champion`, id, champ);
      }
      returnedCDragon = champ;
    }

    this.client.logger?.trace(`Checking storage for meraki champion '${id}'.`);
    try {
      if (this.client.version === this._cacheVersion && this._cache.has(id)) {
        this.client.logger?.trace(`Found champion meraki '${id}' in meraki cache, returning from cache.`);
        returnedMeraki = this._cache.get(id)!;
      } else {
        const meraki = await this.client.storage.load<IMerakiChampion>(`meraki-${this.client.version}-champion`, id);
        const toIgnoreStorage =
          typeof options.ignoreStorage === 'function' && meraki !== undefined
            ? options.ignoreStorage(!!meraki)
            : !!options.ignoreStorage;
        if (!toIgnoreStorage) {
          this.client.logger?.trace(`Found champion meraki '${id}' in storage, returning from storage.`);
          returnedMeraki = meraki!;
        }
      }
    } catch (err) {
      const allMeraki = await this.client.fetch<{ [id: string]: IMerakiChampion }>(
        this.client.generateMerakiUrl('champion')
      );
      this._cacheVersion = this.client.version!;
      this._cache.clear();
      for (const k of Object.keys(allMeraki)) {
        this._cache.set(k, allMeraki[k]);
        const toStore = typeof options.store === 'function' ? options.store(allMeraki[k]) : options.store;
        if (toStore) this.client.storage.save(`meraki-${this.client.version}-champion`, k, allMeraki[k]);
      }
      if (allMeraki[id]) returnedMeraki = allMeraki[id];
    }

    return { cDragon: returnedCDragon, meraki: returnedMeraki };
  }
}
