import fetch from './fetch.js';
import type { regions } from './types';
import Collection from '@discordjs/collection';

export class Client {
  private readonly dDragonBase: string;
  private readonly versions: string;
  private version: string;
  private _language: string;
  private readonly _champions: Collection<string, {}>;

  constructor() {
    this.dDragonBase = 'https://ddragon.leagueoflegends.com/cdn/';
    this.versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this.version = 'null';
    this._language = 'en_US';
    this._champions = new Collection();
  }

  async initialize(region?: regions) {
    const response = await fetch(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this.versions);
    if (!response.ok) throw new Error('Unable to fetch data dragon version. Please confirm the region exists.');
    else {
      const result = <string[] | { v: string; l: string }>await response.json();
      if (Array.isArray(result)) this.version = result[0];
      else {
        this.version = result.v;
        this._language = result.l;
      }
    }
  }

  async fetchAllChampions() {
    return new Promise(async (resolve, reject) => {
      if (this.version === 'null') reject('Please initialize the client first.');
      else {
        const response = await fetch(this.dDragonBase + this.version + '/data/' + this._language + '/champion.json');
        if (!response.ok) reject('Unable to fetch the champions data.');
        else {
          const champs = <{ data: any }>await response.json();
          for (const key of Object.keys(champs.data)) this._champions.set(key, champs.data[key]);
          resolve(this._champions);
        }
      }
    });
  }

  get champions() {
    return this._champions;
  }
  set language(locale: string) {
    this._language = locale;
  }
}
