import axios, { AxiosInstance } from 'axios';
import type { locales, regions } from './types';
import { ChampionManager } from './util';

/**
 * The league.ts client that enables you to interact with Riot Games' League of Legends API.
 * Also connects to the Data Dragon + Community Dragon CDNs.
 *
 * @example
 * Here is how to use the client:
 * ```ts
 * const myClient = new Client();
 * client.initialize('euw').then(() => {
 *   // All your code goes here.
 * });
 * ```
 */
export class Client {
  private readonly _base: string;
  private readonly _versions: string;
  private _version: string;
  private _patch: string;
  private _language: locales;
  private readonly _champions: ChampionManager;
  private readonly _http: AxiosInstance;

  constructor() {
    this._base = 'https://ddragon.leagueoflegends.com/cdn/';
    this._versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this._version = 'null';
    this._patch = 'null';
    this._language = 'en_US';
    this._champions = new ChampionManager(this);
    this._http = axios.create({ baseURL: this._base });
  }

  async initialize(region?: regions) {
    const response = await axios
      .get(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this._versions)
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

  /**
   * The axios instance that handles all the requests being made to the API.
   */
  get http() {
    return this._http;
  }

  /**
   * The Data Dragon CDN Base URL
   */
  get base() {
    return this._base;
  }

  /**
   * The default champions manager used by the client;
   */
  get champions() {
    return this._champions;
  }

  /**
   * The current Data Dragon CDN version.
   */
  get version() {
    return this._version;
  }

  /**
   * The patch of the game currently in use.
   */
  get patch() {
    return this._patch;
  }

  /**
   * The locale in which all the data is going to be fetched in.
   */
  get language() {
    return this._language;
  }

  set language(locale: locales) {
    this._language = locale;
  }

  set patch(patch: string) {
    this._patch = patch;
  }
}
