import type { ChampionData, SpellDamageData, BaseManager } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
import { Champion } from '../data';

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

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Champion>();
  }

  /**
   * Fetch all the champions' data and store it in the cache.
   *
   * This always fetches freshly from data dragon and community dragon.
   */
  async fetchAll() {
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
            const damage = <SpellDamageData>(
              await this.client.http.get(
                `https://raw.communitydragon.org/${
                  this.client.patch
                }/game/data/characters/${champ.id.toLowerCase()}/${champ.id.toLowerCase()}.bin.json`
              )
            );
            this.cache.set(key, new Champion(this.client, champs.data[key], damage));
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
    return new Promise(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id));
      else if (this.client.version === 'null') reject('Please initialize the client first.');
      else {
        const response = await this.client.http.get(
          `${this.client.version}/data/${this.client.language}/champion/${id}.json`
        );
        if (response.status !== 200) reject("Unable to fetch the champion's data - Champ not found: .");
        else {
          const champs = <{ data: { [champ: string]: ChampionData } }>response.data;
          const key = Object.keys(champs.data)[0];
          const damage = <SpellDamageData>(
            await this.client.http.get(
              `https://raw.communitydragon.org/${this.client.patch}/game/data/characters/${champs.data[
                key
              ].id.toLowerCase()}/${champs.data[key].id.toLowerCase()}.bin.json`
            )
          );
          const champ = new Champion(this.client, champs.data[key], damage);
          this.cache.set(key, champ);
          resolve(champ);
        }
      }
    });
  }
}
