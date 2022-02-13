import axios, { AxiosInstance } from 'axios';
import type { ChampionData, locales, regions } from './types';
import Collection from '@discordjs/collection';
import { Champion } from './data';

export class Client {
  readonly base: string;
  private readonly versions: string;
  private _version: string;
  private _patch: string;
  private _language: locales;
  private readonly _champions: Collection<string, Champion>;
  private http: AxiosInstance;

  constructor() {
    this.base = 'https://ddragon.leagueoflegends.com/cdn/';
    this.versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this._version = 'null';
    this._patch = 'null';
    this._language = 'en_US';
    this._champions = new Collection();
    this.http = axios.create({ baseURL: this.base });
  }

  async initialize(region?: regions) {
    const response = await axios
      .get(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this.versions)
      .catch(() => {});
    if (response?.status !== 200)
      throw new Error('Unable to fetch data dragon version. Please confirm the region exists.');
    else {
      const patchRegex = /\d+\.\d+/;
      const result = <string[] | { v: string; l: locales }>response.data;
      if (Array.isArray(result)) {
        this._version = result[0];
        this._patch = result[0].match(patchRegex)!.shift()!;
      } else {
        this._version = result.v;
        this._language = result.l;
        this._patch = result.v.match(patchRegex)!.shift()!;
      }
    }
  }

  async fetchAllChampions() {
    return new Promise(async (resolve, reject) => {
      if (this._version === 'null') reject('Please initialize the client first.');
      else {
        const response = await this.http.get(this._version + '/data/' + this._language + '/championFull.json');
        if (response.status !== 200) reject('Unable to fetch the champions data.');
        else {
          const champs = <{ data: { [champ: string]: ChampionData } }>response.data;
          for (const key of Object.keys(champs.data)) this._champions.set(key, new Champion(this, champs.data[key]));
          resolve(this._champions);
        }
      }
    });
  }

  get champions() {
    return this._champions;
  }
  get version() {
    return this._version;
  }
  get patch() {
    return this._patch;
  }
  set language(locale: locales) {
    this._language = locale;
  }
}
