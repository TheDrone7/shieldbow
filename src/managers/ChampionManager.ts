import type { ChampionData, SpellDamageData, BaseManager, MerakiChampion, FetchOptions } from '../types';
import type { Client } from '../client';
import { Collection } from '@discordjs/collection';
import { Champion } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * A champion manager - to fetch and manage all the champion data.
 */
export class ChampionManager implements BaseManager<Champion> {
  /**
   * The client that this manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new Champions Manager
   *
   * @param client - The client this manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  private async _fetchLocalChamp(name: string, options: FetchOptions) {
    const storagePath = ['champions', this.client.patch, 'dDragon', this.client.locale].join(':');
    return new Promise(async (resolve, reject) => {
      let result;
      if (!options.ignoreStorage) {
        this.client.logger?.trace(`Fetching DDragon (local) champion: ${name}.`);
        const data = this.client.storage.fetch<{ data: { [key: string]: ChampionData } }>(storagePath, name);
        result = data instanceof Promise ? await data.catch(() => undefined) : data;
      }
      if (result) resolve(result);
      else {
        this.client.logger?.trace(`Fetching DDragon champion: ${name}.`);
        const response = await this.client.http.get(
          `${this.client.version}/data/${this.client.locale}/champion/${name}.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's data");
        else {
          if (options.store) await this.client.storage.save(response.data, storagePath, name);
          resolve(response.data);
        }
      }
    });
  }

  private async _fetchLocalPricing(name: string, options: FetchOptions) {
    const storagePath = ['champions', this.client.patch, 'meraki'].join(':');
    return new Promise(async (resolve, reject) => {
      let result;
      if (!options.ignoreStorage) {
        this.client.logger?.trace(`Fetching Meraki (local) champion: ${name}.`);
        const data = this.client.storage.fetch<MerakiChampion>(storagePath, name);
        result = data instanceof Promise ? await data.catch(() => undefined) : data;
      }
      if (result) resolve(result);
      else {
        this.client.logger?.trace(`Fetching Meraki champion: ${name}.`);
        const response = await this.client.http.get(
          `https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/${name}.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's pricing.");
        else {
          if (options.store) await this.client.storage.save(response.data, storagePath, name);
          resolve(response.data);
        }
      }
    });
  }

  private async _fetchLocalDamage(name: string, options: FetchOptions) {
    const storagePath = ['champions', this.client.patch, 'cDragon'].join(':');
    return new Promise(async (resolve, reject) => {
      let result;
      if (!options.ignoreStorage) {
        this.client.logger?.trace(`Fetching CDragon (local) champion: ${name}.`);
        const data = this.client.storage.fetch<SpellDamageData>(storagePath, name);
        result = data instanceof Promise ? await data.catch(() => undefined) : data;
      }
      if (result) resolve(result);
      else {
        this.client.logger?.trace(`Fetching CDragon champion: ${name}.`);
        const response = await this.client.http.get(
          `https://raw.communitydragon.org/${
            this.client.patch
          }/game/data/characters/${name.toLowerCase()}/${name.toLowerCase()}.bin.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's damage data");
        else {
          if (options.store) await this.client.storage.save(response.data, storagePath, name);
          resolve(response.data);
        }
      }
    });
  }

  /**
   * Fetch all the champions and store it in the cache.
   *
   * This always fetches freshly from data dragon and community dragon.
   *
   * @param options - The basic fetching options (only `cache` and `store` affect this method).
   */
  async fetchAll(options?: FetchOptions): Promise<Collection<string, Champion>> {
    const opts = parseFetchOptions(this.client, 'champions', options);
    this.client.logger?.trace(`Fetching all champions with options: `, opts);
    return new Promise(async (resolve, reject) => {
      const response = await this.client.http.get(
        this.client.version + '/data/' + this.client.locale + '/championFull.json'
      );
      if (response.status !== 200) reject('Unable to fetch the champions data.');
      else {
        const result = new Collection<string, Champion>();
        const champs = <{ data: { [champ: string]: ChampionData } }>response.data;
        for (const key of Object.keys(champs.data)) {
          const champ = champs.data[key];
          const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id, opts).catch(reject);
          const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id, opts).catch(reject);
          const champion = new Champion(this.client, champs.data[key], damage, meraki);
          result.set(key, champion);
          if (opts.cache) await this.client.cache.set(`champion:${key}`, champion);
        }
        resolve(result);
      }
    });
  }

  /**
   * Fetches a champion (from the cache, if already available), or from data dragon and community dragon.
   * @param id - The {@link Champion.id | ID} of the champion whose data needs to be fetched.
   * @param options - The basic fetching options.
   */
  async fetch(id: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'champions', options);
    const { cache, ignoreCache } = opts;
    const cacheId = `champion:${id}`;
    this.client.logger?.trace(`Fetching champion '${id}' with options: `, opts);
    if (id === 'FiddleSticks') id = 'Fiddlesticks'; // There is some internal inconsistency in Riot's JSON files.
    return new Promise<Champion>(async (resolve, reject) => {
      const exists = await this.client.cache.has(cacheId);
      if (exists && !ignoreCache) resolve(await this.client.cache.get(cacheId));
      else {
        const champs = <{ data: { [key: string]: ChampionData } }>await this._fetchLocalChamp(id, opts).catch(reject);
        const key = Object.keys(champs.data)[0];
        const damage = <SpellDamageData>await this._fetchLocalDamage(id, opts).catch(reject);
        const meraki = <MerakiChampion>await this._fetchLocalPricing(id, opts).catch(reject);
        const champ = new Champion(this.client, champs.data[key], damage, meraki);
        if (cache) await this.client.cache.set(cacheId, champ);
        resolve(champ);
      }
    });
  }

  /**
   * Find a champion by their 3-digit key.
   *
   * @deprecated Use {@link ChampionManager.fetchByKey | fetchByKey} instead.
   * @param key - The 3-digit key of the champion to look for.
   */
  async findByKey(key: number) {
    return this.fetchByKey(key);
  }

  /**
   * Find a champion by their name.
   *
   * @deprecated Use {@link ChampionManager.fetchByName | fetchByName} instead.
   * @param name - The name of the champion to look for.
   */
  async findByName(name: string) {
    return this.fetchByName(name);
  }

  /**
   * Fetch and cache champion by their name (instead of ID, which is very similar but not the same as the name).
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
    return new Promise(async (resolve, reject) => {
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
      if (names.length) {
        const response = await this.client.http.get(
          this.client.version + '/data/' + this.client.locale + '/championFull.json'
        );
        if (response.status !== 200) reject('Unable to fetch the champions data.');
        else {
          const champs = <{ data: { [champ: string]: ChampionData } }>response.data;
          for (const key of Object.keys(champs.data)) {
            const champ = champs.data[key];
            if (names.some((n) => champ.name.toLowerCase().includes(n.toLowerCase()))) {
              const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id, opts).catch(reject);
              const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id, opts).catch(reject);
              const champion = new Champion(this.client, champs.data[key], damage, meraki);
              result.set(key, champion);
              if (cache) await this.client.cache.set(`champion:${key}`, champion);
            }
          }
          resolve(result);
        }
      } else resolve(result);
    });
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
    return new Promise(async (resolve, reject) => {
      const result = new Collection<string, Champion>();
      if (!ignoreCache)
        for (const key of keys) {
          const champ = await this.client.cache.find((c: Champion) => c.key === key);
          if (champ) {
            result.set(champ.id, champ);
            keys = keys.filter((k) => k !== key);
          }
        }
      if (keys.length) {
        const response = await this.client.http.get(
          this.client.version + '/data/' + this.client.locale + '/championFull.json'
        );
        if (response.status !== 200) reject('Unable to fetch the champions data.');
        else {
          const champs = <{ data: { [champ: string]: ChampionData } }>response.data;
          for (const key of Object.keys(champs.data)) {
            const champ = champs.data[key];
            if (keys.some((k) => champ.key === String(k))) {
              const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id, opts).catch(reject);
              const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id, opts).catch(reject);
              const champion = new Champion(this.client, champs.data[key], damage, meraki);
              result.set(key, champion);
              if (cache) await this.client.cache.set(`champion:${key}`, champion);
            }
          }
          resolve(result);
        }
      } else resolve(result);
    });
  }

  /**
   * Fetch champion rotation data from Champion v3 API.
   *
   * This is the only method that needs a valid API key in this manager.
   * Needs access to the Champion v3 API.
   *
   * @param options - The basic fetching options.
   */
  async fetchRotations(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'champions', options);
    const { cache, ignoreCache, region } = opts;
    this.client.logger?.trace(`Fetching champion rotations with options: `, opts);
    return new Promise<Collection<'all' | 'new', Champion[]>>(async (resolve, reject) => {
      const existsAll = await this.client.cache.has(`champion-rotation:all`);
      const existsNew = await this.client.cache.has(`champion-rotation:new`);
      if (existsAll && existsNew && !ignoreCache) {
        const all = await this.client.cache.get<Champion[]>(`champion-rotation:all`);
        const new_ = await this.client.cache.get<Champion[]>(`champion-rotation:new`);
        resolve(
          new Collection([
            ['all', all],
            ['new', new_]
          ])
        );
      }
      const response = await this.client.api.makeApiRequest('/lol/platform/v3/champion-rotations', {
        name: 'Champion rotation',
        params: '',
        region: region!,
        regional: false
      });
      if (response.status !== 200) reject('Unable to fetch the champions data.');
      else {
        const result = new Collection<'all' | 'new', Champion[]>();
        const champs = <{ freeChampionIds: string[]; freeChampionIdsForNewPlayers: string[] }>response.data;
        const all = await this.fetchByKeys(champs.freeChampionIds.map((c) => Number(c)));
        const forNew = await this.fetchByKeys(champs.freeChampionIdsForNewPlayers.map((c) => Number(c)));
        result.set('all', all.toJSON());
        result.set('new', forNew.toJSON());
        if (cache) await this.client.cache.set('champion-rotation:all', all.toJSON());
        if (cache) await this.client.cache.set('champion-rotation:new', forNew.toJSON());
        resolve(result);
      }
    });
  }
}
