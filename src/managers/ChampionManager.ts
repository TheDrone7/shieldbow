import type { ChampionData, SpellDamageData, BaseManager, MerakiChampion } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import { Champion } from '../data';
import { StorageManager } from './index';
import path from 'path';

/**
 * A champion manager - to help fetch and manage all the champion data.
 */
export class ChampionManager implements BaseManager {
  /**
   * The in-memory cache that contains all the champion data that has been fetched so far.
   */
  readonly cache: Collection<string, Champion>;
  /**
   * The client that this manager belongs to.
   */
  readonly client: Client;

  private readonly _champData?: StorageManager;
  private readonly _damageData?: StorageManager;
  private readonly _pricingData?: StorageManager;

  constructor(client: Client, cacheSettings: { enable: boolean; root: string }) {
    this.client = client;
    this.cache = new Collection<string, Champion>();
    if (cacheSettings.enable) {
      this._champData = new StorageManager(client, 'dDragon/champions', cacheSettings.root);
      this._damageData = new StorageManager(client, 'cDragon/champions', cacheSettings.root);
      this._pricingData = new StorageManager(client, 'meraki/champions', cacheSettings.root);
    }
  }

  private async _fetchLocalChamp(name: string) {
    if (this._champData)
      this._champData.pathName = path.join('dDragon', this.client.version, this.client.language, 'champions');
    return new Promise(async (resolve, reject) => {
      const data = this._champData?.fetch(name);
      if (data) resolve(data);
      else {
        const response = await this.client.http.get(
          `${this.client.version}/data/${this.client.language}/champion/${name}.json`
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
      const data = this._pricingData?.fetch(name);
      if (data) resolve(data);
      else {
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
      const data = this._damageData?.fetch(name);
      if (data) resolve(data);
      else {
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
   * Fetch all the champions' data and store it in the cache.
   *
   * This always fetches freshly from data dragon and community dragon.
   */
  async fetchAll(): Promise<Collection<string, Champion>> {
    return new Promise(async (resolve, reject) => {
      if (this.client.version === 'null') reject('Please initialize the client first.');
      else {
        const response = await this.client.http.get(
          this.client.version + '/data/' + this.client.language + '/championFull.json'
        );
        if (response.status !== 200) reject('Unable to fetch the champions data.');
        else {
          const champs = <{ data: { [champ: string]: ChampionData } }>response.data;
          for (const key of Object.keys(champs.data)) {
            const champ = champs.data[key];
            const damage = <SpellDamageData>await this._fetchLocalDamage(champ.id).catch(reject);
            const meraki = <MerakiChampion>await this._fetchLocalPricing(champ.id).catch(reject);
            this.cache.set(key, new Champion(this.client, champs.data[key], damage, meraki));
          }
          resolve(this.cache);
        }
      }
    });
  }

  /**
   * Fetches a champion's data (from the cache, if already available), or from data dragon and community dragon.
   * @param id The {@link Champion.id | ID} of the champion whose data needs to be fetched.
   * @param options The options to modify the behavior of this method. If force is set to `true`, cache will be ignored.
   */
  async fetch(id: string, options: { force: boolean } = { force: false }) {
    if (id === 'FiddleSticks') id = 'Fiddlesticks'; // There is some internal inconsistency in Riot's JSON files.
    return new Promise<Champion>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else if (this.client.version === 'null') reject('Please initialize the client first.');
      else {
        const champs = <{ data: { [key: string]: ChampionData } }>await this._fetchLocalChamp(id).catch(reject);
        const key = Object.keys(champs.data)[0];
        const damage = <SpellDamageData>await this._fetchLocalDamage(id).catch(reject);
        const meraki = <MerakiChampion>await this._fetchLocalPricing(id).catch(reject);
        const champ = new Champion(this.client, champs.data[key], damage, meraki);
        this.cache.set(key, champ);
        resolve(champ);
      }
    });
  }

  /**
   * Find a champion by their 3-digit key.
   *
   * @param key The 3-digit key of the champion to look for.
   */
  findByKey(key: number) {
    return this.cache.find((champ) => champ.key === key);
  }

  /**
   * Find a champion by their name (instead of ID, which is very similar but not the same as the name).
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name The name of the champion to look for.
   */
  async findByName(name: string) {
    if (!this.cache.size) await this.fetchAll();
    return this.cache.find((champ) => champ.name.toLowerCase().includes(name.toLowerCase()));
  }
}
