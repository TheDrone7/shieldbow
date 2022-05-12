import axios, { AxiosInstance } from 'axios';
import type { ClientConfig, GameMap, GameMode, GameType, Locales, Queue, Region, Season } from './types';
import {
  AccountManager,
  ChampionManager,
  ItemManager,
  LeagueManager,
  MatchManager,
  RuneTreeManager,
  SummonerManager,
  SummonerSpellManager,
  CurrentGameManager,
  ClashManager
} from './managers';
import { ApiHandler } from './api';

const patchRegex = /\d+\.\d+/;

/**
 * The shieldbow client that enables you to interact with Riot Games' League of Legends API.
 * Also connects to the Data Dragon + Community Dragon CDNs.
 */
export class Client {
  private readonly _cdnBase: string;
  private readonly _versions: string;
  private _version: string;
  private _patch: string;
  private _locale: Locales;
  private _region: Region;
  private _cacheEnabled: boolean;
  private _cacheRoot: string;
  private _champions: ChampionManager;
  private _items: ItemManager;
  private _runes: RuneTreeManager;
  private _summonerSpells: SummonerSpellManager;
  private readonly _summoners: SummonerManager;
  private readonly _accounts: AccountManager;
  private readonly _leagues: LeagueManager;
  private readonly _matches: MatchManager;
  private readonly _spectator: CurrentGameManager;
  private readonly _clash: ClashManager;
  private readonly _http: AxiosInstance;
  private readonly _api: ApiHandler;
  private _seasons: Season[];
  private _queues: Queue[];
  private _maps: GameMap[];
  private _gameModes: GameMode[];
  private _gameTypes: GameType[];

  constructor(apiKey: string) {
    this._cdnBase = 'https://ddragon.leagueoflegends.com/cdn/';
    this._versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this._version = 'null';
    this._region = 'na';
    this._patch = 'null';
    this._locale = 'en_US';
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
    this._summonerSpells = new SummonerSpellManager(this, { enable: true, root: 'data' });
    this._summoners = new SummonerManager(this);
    this._accounts = new AccountManager(this);
    this._leagues = new LeagueManager(this);
    this._matches = new MatchManager(this);
    this._spectator = new CurrentGameManager(this);
    this._clash = new ClashManager(this);

    this._http = axios.create({ baseURL: this._cdnBase });
    this._api = new ApiHandler('na', apiKey);
  }

  /**
   * Initialize the client to prepare it for interacting with the API.
   * This can also be rerun if you want to configure anything and quickly fetch any required data.
   *
   * @param options - The client configuration.
   */
  async initialize(options?: ClientConfig) {
    // Parse the configuration
    const region = options?.region || 'na';
    this._region = region;
    this._api.region = region;
    const version = options?.version || 'null';
    this._version = version;
    this._patch = version !== 'null' ? version.match(patchRegex)!.shift()! : 'null';
    const language = options?.locale || 'null';
    if (language !== 'null') this._locale = language;

    const enableCache = options?.cache?.enable ?? true;
    const cacheRoot = options?.cache?.localRoot || 'data';

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
          this._locale = 'en_US';
        } else {
          this._version = version !== 'null' ? version : result.v;
          this._locale = language !== 'null' ? language : result.l;
          this._patch = this._version.match(patchRegex)!.shift()!;
        }
      }
    }

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

    this._seasons = <Season[]>seasonsResponse.data;
    this._queues = <Queue[]>queuesResponse.data;
    this._maps = <GameMap[]>mapsResponse.data.map((m: { mapId: number; mapName: string; notes: string }) => ({
      ...m,
      image: this.cdnBase + this.version + `/img/map/map${m.mapId}.png`
    }));
    this._gameModes = <GameMode[]>gameModesResponse.data;
    this._gameTypes = <GameType[]>gameTypesResponse.data;

    // Update the cache config
    if (this._cacheEnabled !== enableCache || this._cacheRoot !== cacheRoot) {
      this._cacheEnabled = enableCache;
      this._cacheRoot = cacheRoot;

      this._champions = new ChampionManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
      this._items = new ItemManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
      this._runes = new RuneTreeManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
      this._summonerSpells = new SummonerSpellManager(this, { enable: this._cacheEnabled, root: this._cacheRoot });
    }

    // Fetch the data and cache it for faster data retrieval.
    if (options?.fetch?.champions ?? true) await this.champions.fetchAll();
    if (options?.fetch?.items ?? true) await this.items.fetch('1001');
    if (options?.fetch?.runes ?? true) await this.runes.fetch('Domination');
    if (options?.fetch?.summonerSpells ?? true) await this.summonerSpells.fetch('SummonerFlash');
  }

  /**
   * The axios instance that handles all the CDN requests being made.
   */
  get http() {
    return this._http;
  }

  /**
   * The default API interactions handler used by the client.
   */
  get api() {
    return this._api;
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
  get cdnBase() {
    return this._cdnBase;
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
   * The default summoner spells manager used by the client.
   */
  get summonerSpells() {
    return this._summonerSpells;
  }

  /**
   * The default summoners manager used by the client.
   */
  get summoners() {
    return this._summoners;
  }

  /**
   * The default riot accounts manager used by the client.
   * This is mostly for internal usage. You may want to use {@link Client.summoners} instead.
   */
  get accounts() {
    return this._accounts;
  }

  /**
   * The default summoner competitive league data manager used by the client.
   *
   * Highly recommended using {@link Client.summoners} for a specific summoner's competitive info.
   *
   * Use this only if you want to query a list of users by rank-division.
   */
  get leagues() {
    return this._leagues;
  }

  /**
   * The default match manager used by the client.
   */
  get matches() {
    return this._matches;
  }

  /**
   * The default live match manager used by the client.
   */
  get spectator() {
    return this._spectator;
  }

  /**
   * The default clash tournaments manager used by the client.
   */
  get clash() {
    return this._clash;
  }

  /**
   * Get the current status of the RIOT API.
   *
   * No type support for this (yet).
   */
  get status() {
    return new Promise(async (resolve, reject) => {
      const response = await this.api
        .makeApiRequest('/lol/status/v4/platform-data', {
          name: 'Get API Status',
          params: 'no params',
          regional: false
        })
        .catch(reject);
      if (response) resolve(response.data);
    });
  }

  /**
   * The current Data Dragon CDN version.
   */
  get version() {
    return this._version;
  }

  /**
   * The patch of the game currently in use.
   *
   * Must be above 5.1 for proper functionality.
   */
  get patch() {
    return this._patch;
  }

  /**
   * The locale in which all the data is going to be fetched in.
   */
  get locale() {
    return this._locale;
  }

  set locale(locale: Locales) {
    this._locale = locale;
  }

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
