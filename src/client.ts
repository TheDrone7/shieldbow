import axios, { AxiosInstance } from 'axios';
import type { locales, regions } from './types';
import Collection from '@discordjs/collection';

export class Client {
  private readonly versions: string;
  private version: string;
  private _language: locales;
  private readonly _champions: Collection<string, {}>;
  private http: AxiosInstance;

  constructor() {
    this.versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this.version = 'null';
    this._language = 'en_US';
    this._champions = new Collection();
    this.http = axios.create({ baseURL: 'https://ddragon.leagueoflegends.com/cdn/' });
  }

  async initialize(region?: regions) {
    const response = await axios
      .get(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this.versions)
      .catch(() => {});
    if (response?.status !== 200)
      throw new Error('Unable to fetch data dragon version. Please confirm the region exists.');
    else {
      const result = <string[] | { v: string; l: locales }>response.data;
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
        const response = await this.http.get(this.version + '/data/' + this._language + '/champion.json');
        if (response.status !== 200) reject('Unable to fetch the champions data.');
        else {
          const champs = <{ data: any }>response.data;
          for (const key of Object.keys(champs.data)) this._champions.set(key, champs.data[key]);
          resolve(this._champions);
        }
      }
    });
  }

  get champions() {
    return this._champions;
  }
  set language(locale: locales) {
    this._language = locale;
  }
}
