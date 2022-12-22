import type { ChampionData, SpellDamageData, BaseManager, MerakiChampion, FetchOptions } from '../types';
import type { Client } from '../client';
import { Collection } from '@discordjs/collection';
import { Champion } from '../structures';
import { StorageManager } from './index';
import path from 'path';

/**
 * A champion manager - to fetch and manage all the champion data.
 */
export class ChampionManager implements BaseManager<Champion> {
  /**
   * The champions cached in the memory.
   *
   * Only use this if you absolutely must.
   * Prioritize using
   * {@link ChampionManager.fetch | fetch},
   * {@link ChampionManager.fetchByKey | fetchByKey },
   * {@link ChampionManager.fetchByName | fetchByName} or
   * {@link ChampionManager.fetchAll | fetchAll}
   * instead.
   */
  readonly cache: Collection<string, Champion>;
  /**
   * The champion rotations cached in the memory.
   *
   * Only use this if you absolutely must.
   * Prioritize using
   * {@link ChampionManager.fetchRotations | fetchRotations}
   */
  readonly rotation: Collection<'all' | 'new', Champion[]>;
  /**
   * The client that this manager belongs to.
   */
  readonly client: Client;

  private readonly _champData?: StorageManager;
  private readonly _damageData?: StorageManager;
  private readonly _pricingData?: StorageManager;

  /**
   * Create a new Champions Manager
   *
   * @param client - The client this manager belongs to.
   * @param cacheSettings - The basic caching settings.
   */
  constructor(client: Client, cacheSettings: { enable: boolean; root: string }) {
    this.client = client;
    this.cache = new Collection<string, Champion>();
    this.rotation = new Collection<'all' | 'new', Champion[]>();
    if (cacheSettings.enable) {
      this._champData = new StorageManager(client, 'dDragon/champions', cacheSettings.root);
      this._damageData = new StorageManager(client, 'cDragon/champions', cacheSettings.root);
      this._pricingData = new StorageManager(client, 'meraki/champions', cacheSettings.root);
    }
  }

  private async _fetchLocalChamp(name: string) {
    if (this._champData)
      this._champData.pathName = path.join('dDragon', this.client.version, this.client.locale, 'champions');
    return new Promise(async (resolve, reject) => {
      this.client.logger.trace(`Fetching DDragon (local) champion: ${name}.`);
      const data = this._champData?.fetch(name);
      if (data) resolve(data);
      else {
        this.client.logger.trace(`Fetching DDragon champion: ${name}.`);
        const response = await this.client.http.get(
          `${this.client.version}/data/${this.client.locale}/champion/${name}.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's data");
        else {
          this._champData?.store(name, response.data);
          resolve(response.data);
        }
      }
    });
  }

  private async _fetchLocalPricing(name: string) {
    if (this._pricingData) this._pricingData.pathName = path.join('meraki', 'champions');
    return new Promise(async (resolve, reject) => {
      this.client.logger.trace(`Fetching Meraki (local) champion: ${name}.`);
      const data = this._pricingData?.fetch(name);
      if (data) resolve(data);
      else {
        this.client.logger.trace(`Fetching Meraki champion: ${name}.`);
        const response = await this.client.http.get(
          `https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions/${name}.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's pricing.");
        else {
          this._pricingData?.store(name, response.data);
          resolve(response.data);
        }
      }
    });
  }

  private async _fetchLocalDamage(name: string) {
    if (this._damageData) this._damageData.pathName = path.join('cDragon', this.client.patch, 'champions');
    return new Promise(async (resolve, reject) => {
      this.client.logger.trace(`Fetching CDragon (local) champion: ${name}.`);
      const data = this._damageData?.fetch(name);
      if (data) resolve(data);
      else {
        this.client.logger.trace(`Fetching CDragon champion: ${name}.`);
        const response = await this.client.http.get(
          `https://raw.communitydragon.org/${
            this.client.patch
          }/game/data/characters/${name.toLowerCase()}/${name.toLowerCase()}.bin.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's damage data");
        else {
          this._damageData?.store(name, response.data);
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
   * @param options - The basic fetching options (only `cache` affects this method).
   */
  async fetchAll(options?: FetchOptions): Promise<Collection<string, Champion>> {
    const cache = options?.cache ?? true;
    this.client.logger.trace(`Fetching all champions with options: `, { cache });
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
          const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id).catch(reject);
          const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id).catch(reject);
          const champion = new Champion(this.client, champs.data[key], damage, meraki);
          result.set(key, champion);
          if (cache) this.cache.set(key, champion);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    this.client.logger.trace(`Fetching champion '${id}' with options: `, { force, cache });
    if (id === 'FiddleSticks') id = 'Fiddlesticks'; // There is some internal inconsistency in Riot's JSON files.
    return new Promise<Champion>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
      else {
        const champs = <{ data: { [key: string]: ChampionData } }>await this._fetchLocalChamp(id).catch(reject);
        const key = Object.keys(champs.data)[0];
        const damage = <SpellDamageData>await this._fetchLocalDamage(id).catch(reject);
        const meraki = <MerakiChampion>await this._fetchLocalPricing(id).catch(reject);
        const champ = new Champion(this.client, champs.data[key], damage, meraki);
        if (cache) this.cache.set(key, champ);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    this.client.logger.trace(`Fetching champions '${names}' with options: `, { force, cache });
    return new Promise(async (resolve, reject) => {
      const result = new Collection<string, Champion>();
      if (!force)
        for (const name of names) {
          const champ = this.cache.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));
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
              const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id).catch(reject);
              const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id).catch(reject);
              const champion = new Champion(this.client, champs.data[key], damage, meraki);
              result.set(key, champion);
              if (cache) this.cache.set(key, champion);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    this.client.logger.trace(`Fetching champions '${keys}' with options: `, { force, cache });
    return new Promise(async (resolve, reject) => {
      const result = new Collection<string, Champion>();
      if (!force)
        for (const key of keys) {
          const champ = this.cache.find((c) => c.key === key);
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
              const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id).catch(reject);
              const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id).catch(reject);
              const champion = new Champion(this.client, champs.data[key], damage, meraki);
              result.set(key, champion);
              if (cache) this.cache.set(key, champion);
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
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region || this.client.region;
    this.client.logger.trace(`Fetching champion rotations with options: `, { force, cache, region });
    return new Promise<Collection<'all' | 'new', Champion[]>>(async (resolve, reject) => {
      if (this.rotation.get('all') && this.rotation.get('new') && !force) resolve(this.rotation);
      const response = await this.client.api.makeApiRequest('/lol/platform/v3/champion-rotations', {
        name: 'Champion rotation',
        params: '',
        region,
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
        if (cache) this.rotation.set('all', all.toJSON());
        if (cache) this.rotation.set('new', forNew.toJSON());
        resolve(result);
      }
    });
  }
}
