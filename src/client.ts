import axios, { AxiosInstance } from 'axios';
import type {
  ClientConfig,
  GameModeData,
  GameTypeData,
  Locales,
  MapData,
  QueueData,
  Region,
  SeasonData
} from './types';
import { ChampionManager, ItemManager, RuneTreeManager } from './managers';

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
  private _items: ItemManager;
  private _runes: RuneTreeManager;
  private readonly _http: AxiosInstance;
  private _seasons: SeasonData[];
  private _queues: QueueData[];
  private _maps: MapData[];
  private _gameModes: GameModeData[];
  private _gameTypes: GameTypeData[];

  constructor() {
    this._base = 'https://ddragon.leagueoflegends.com/cdn/';
    this._versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this._version = 'null';
    this._region = 'na';
    this._patch = 'null';
    this._language = 'en_US';
    this._cacheEnabled = true;
    this._cacheRoot = 'data';

    this._seasons = [];
    this._queues = [];
    this._maps = [];
    this._gameModes = [];
    this._gameTypes = [];

    this._champions = new ChampionManager(this, { enable: true, root: 'data' });
    this._items = new ItemManager(this, { enable: true, root: 'data' });
    this._runes = new RuneTreeManager(this, { enable: true, root: 'data' });

    this._http = axios.create({ baseURL: this._base });
  }

  /**
   * Initialize the client to prepare it for interacting with the API.
   * This can also be rerun if you want to configure anything and quickly fetch any required data.
   *
   * @param options The client configuration.
   */
  async initialize(options?: ClientConfig) {
    // Parse the configuration
    const region = options?.region || 'na';
    this._region = region;
    const version = options?.version || 'null';
    this._version = version;
    this._patch = version !== 'null' ? version.match(patchRegex)!.shift()! : 'null';
    const language = options?.locale || 'null';
    if (language !== 'null') this._language = language;

    const enableCache = options?.cache?.enable ?? true;
    const cacheRoot = options?.cache?.localRoot || 'data';

    // Get the game constants from data dragon (this is static data)
    const seasonsResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/seasons.json')
      .catch(() => {});
    const queuesResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/queues.json')
      .catch(() => {});
    const mapsResponse = await axios.get('https://static.developer.riotgames.com/docs/lol/maps.json').catch(() => {});
    const gameModesResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/gameModes.json')
      .catch(() => {});
    const gameTypesResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/gameTypes.json')
      .catch(() => {});

    if (seasonsResponse?.status !== 200) throw new Error('Unable to fetch seasons static data from data dragon.');
    if (queuesResponse?.status !== 200) throw new Error('Unable to fetch queues static data from data dragon.');
    if (mapsResponse?.status !== 200) throw new Error('Unable to fetch maps static data from data dragon.');
    if (gameModesResponse?.status !== 200) throw new Error('Unable to fetch game modes static data from data dragon.');
    if (gameTypesResponse?.status !== 200) throw new Error('Unable to fetch game types static data from data dragon.');

    this._seasons = <SeasonData[]>seasonsResponse.data;
    this._queues = <QueueData[]>queuesResponse.data;
    this._maps = <MapData[]>mapsResponse.data;
    this._gameModes = <GameModeData[]>gameModesResponse.data;
    this._gameTypes = <GameTypeData[]>gameTypesResponse.data;

    // Update the client configuration.
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

    // Update the cache config
    if (this._cacheEnabled !== enableCache || this._cacheRoot !== cacheRoot) {
      this._cacheEnabled = enableCache;
      this._cacheRoot = cacheRoot;

      this._champions = new ChampionManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
      this._items = new ItemManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
      this._runes = new RuneTreeManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
    }

    // Fetch the data and cache it for faster data retrieval.
    if (options?.fetch?.champions ?? true) await this.champions.fetchAll();
    if (options?.fetch?.items ?? true) await this.items.fetch('1001');
    if (options?.fetch?.runes ?? true) await this.runes.fetch('Domination');
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
   * The default champions manager used by the client.
   */
  get champions() {
    return this._champions;
  }

  /**
   * The default items manager used by the client.
   */
  get items() {
    return this._items;
  }

  /**
   * The default runes manager used by the client.
   */
  get runes() {
    return this._runes;
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

  /**
   * Update the locale to interact with the API in.
   * @param locale The new locale.
   */
  set language(locale: Locales) {
    this._language = locale;
  }

  /**
   * Set the current patch to fetch the data from.
   * Keep this above 5.1 to make sure this doesn't break anything.
   * This also automatically updates the Data Dragon CDN version to fetch data from the respective patch.
   * @param patch The new patch to fetch the data from.
   */
  set patch(patch: string) {
    this._patch = patch;
    this._version = patch + '.1';
  }

  /**
   * An array of all seasons and their respective IDs.
   */
  get seasons() {
    return this._seasons;
  }

  /**
   * An array of all queue types and their respective data.
   */
  get queues() {
    return this._queues;
  }

  /**
   * An array of all maps and their respective data.
   */
  get maps() {
    return this._maps;
  }

  /**
   * An array of all game modes and their respective data.
   */
  get gameModes() {
    return this._gameModes;
  }

  /**
   * An array of all game types and their respective data.
   */
  get gameTypes() {
    return this._gameTypes;
  }
}
