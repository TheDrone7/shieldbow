import axios, { AxiosInstance } from 'axios';
import type { ClientConfig, Locales, Region } from './types';
import { ChampionManager } from './util';

const patchRegex = /\d+\.\d+/;

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
  private _language: Locales;
  private _region: Region;
  private _cacheEnabled: boolean;
  private _cacheRoot: string;
  private _champions: ChampionManager;
  private readonly _http: AxiosInstance;

  constructor() {
    this._base = 'https://ddragon.leagueoflegends.com/cdn/';
    this._versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this._version = 'null';
    this._region = 'na';
    this._patch = 'null';
    this._language = 'en_US';
    this._cacheEnabled = true;
    this._cacheRoot = 'data';

    this._champions = new ChampionManager(this, { enable: true, root: 'data' });

    this._http = axios.create({ baseURL: this._base });
  }

  async initialize(options?: ClientConfig) {
    const region = options?.region || 'na';
    this._region = region;
    const version = options?.version || 'null';
    this._version = version;
    this._patch = version !== 'null' ? version.match(patchRegex)!.shift()! : 'null';
    const language = options?.locale || 'null';
    if (language !== 'null') this._language = language;

    const enableCache = options?.cache?.enable ?? true;
    const cacheRoot = options?.cache?.localRoot || 'data';

    if (version === 'null' || language === 'null') {
      const response = await axios
        .get(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this._versions)
        .catch(() => {});
      if (response?.status !== 200)
        throw new Error('Unable to fetch data dragon version. Please confirm the region exists.');
      else {
        const result = <string[] | { v: string; l: Locales }>response.data;
        if (Array.isArray(result)) {
          this._version = version !== 'null' ? version : result[0];
          this._patch = this._version.match(patchRegex)!.shift()!;
          this._language = 'en_US';
        } else {
          this._version = version !== 'null' ? version : result.v;
          this._language = language !== 'null' ? language : result.l;
          this._patch = this._version.match(patchRegex)!.shift()!;
        }
      }
    }

    if (this._cacheEnabled !== enableCache || this._cacheRoot !== cacheRoot) {
      this._cacheEnabled = enableCache;
      this._cacheRoot = cacheRoot;

      this._champions = new ChampionManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
    }

    if (options?.fetch?.champions) await this.champions.fetchAll();
  }

  /**
   * The axios instance that handles all the requests being made to the API.
   */
  get http() {
    return this._http;
  }

  /**
   * The league of legends region from which the data is to be fetched.
   */
  get region() {
    return this._region;
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

  set language(locale: Locales) {
    this._language = locale;
  }

  set patch(patch: string) {
    this._patch = patch;
  }
}
