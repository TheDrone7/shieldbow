import axios, { AxiosInstance } from 'axios';
import type {
  ClientConfig,
  GameMap,
  GameMode,
  GameType,
  Locales,
  Queue,
  Region,
  Season,
  ILogger,
  ICache,
  IStorage
} from './types';
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
  ClashManager,
  ChallengeManager
} from './managers';
import { ApiHandler } from './api';
import { LocalStorage, MemoryCache, ShieldbowLogger } from './util';
import type { ManagersConfig } from './types/ClientConfig';

const patchRegex = /\d+\.\d+/;

/**
 * The shieldbow client that enables you to interact with Riot Games' League of Legends API.
 * Also connects to the Data Dragon + Community Dragon CDNs.
 */
export class Client {
  private readonly _cdnBase: string;
  private readonly _versions: string;
  private _initialized: boolean;
  private _version: string;
  private _patch: string;
  private _locale: Locales;
  private _region: Region;
  private _champions: ChampionManager;
  private _items: ItemManager;
  private _runes: RuneTreeManager;
  private _summonerSpells: SummonerSpellManager;
  private readonly _summoners: SummonerManager;
  private readonly _accounts: AccountManager;
  private readonly _leagues: LeagueManager;
  private readonly _matches: MatchManager;
  private readonly _spectator: CurrentGameManager;
  private readonly _challenges: ChallengeManager;
  private readonly _clash: ClashManager;
  private readonly _http: AxiosInstance;
  private readonly _api: ApiHandler;
  private _seasons: Season[];
  private _queues: Queue[];
  private _maps: GameMap[];
  private _gameModes: GameMode[];
  private _gameTypes: GameType[];
  private _logger?: ILogger;
  private _cache: ICache;
  private _storage: IStorage;

  private _storageEnabled: ManagersConfig;
  private _cacheEnabled: ManagersConfig;

  constructor(apiKey: string) {
    this._cdnBase = 'https://ddragon.leagueoflegends.com/cdn/';
    this._versions = 'https://ddragon.leagueoflegends.com/api/versions.json';
    this._initialized = false;
    this._version = undefined!;
    this._region = 'na';
    this._patch = undefined!;
    this._locale = 'en_US';

    this._cacheEnabled = { api: true, dragon: true };
    this._storageEnabled = { api: false, dragon: true };

    this._cache = new MemoryCache();
    this._storage = new LocalStorage(this, 'data');

    this._seasons = [];
    this._queues = [];
    this._maps = [];
    this._gameModes = [];
    this._gameTypes = [];

    this._champions = new ChampionManager(this);
    this._items = new ItemManager(this);
    this._runes = new RuneTreeManager(this);
    this._summonerSpells = new SummonerSpellManager(this, { enable: true, root: 'data' });
    this._summoners = new SummonerManager(this);
    this._accounts = new AccountManager(this);
    this._leagues = new LeagueManager(this);
    this._matches = new MatchManager(this);
    this._spectator = new CurrentGameManager(this);
    this._clash = new ClashManager(this);
    this._challenges = new ChallengeManager(this);

    this._http = axios.create({ baseURL: this._cdnBase });
    this._api = new ApiHandler(this, apiKey);
  }

  /**
   * Initialize the client to prepare it for interacting with the API.
   * This can also be rerun if you want to configure anything and quickly fetch any required data.
   *
   * @param options - The client configuration.
   */
  async initialize(options?: ClientConfig) {
    // Parse the basic configuration
    const region = options?.region || 'na';
    this._region = region;
    const version = options?.version || undefined;
    this._version = version!;
    this._patch = version !== undefined ? version.match(patchRegex)!.shift()! : undefined!;
    const language = options?.locale || undefined;
    if (language !== undefined) this._locale = language;
    if (typeof options?.logger === 'boolean') options.logger = { enable: options.logger };
    if (typeof options?.fetch === 'boolean')
      options.fetch = {
        champions: options?.fetch,
        items: options?.fetch,
        runes: options?.fetch,
        summonerSpells: options?.fetch
      };

    // Set up the logging utility if enabled.
    const enableLogging = options?.logger?.enable ?? true;
    if (enableLogging) {
      const loggerLevel = options?.logger?.level || 'WARN';
      this._logger = options?.logger?.custom || new ShieldbowLogger(loggerLevel);
    }

    // Update the client's basic configuration.
    if (version === undefined || language === undefined) {
      this.logger?.trace('Fetching latest version and locale from the API.');
      const response = await axios
        .get(region ? `https://ddragon.leagueoflegends.com/realms/${region}.json` : this._versions)
        .catch(() => {});
      if (response?.status !== 200)
        throw new Error('Unable to fetch data dragon version. Please confirm the region exists.');
      else {
        const result = <string[] | { v: string; l: Locales }>response.data;
        if (Array.isArray(result)) {
          this._version = version !== undefined ? version : result[0];
          this._patch = this._version.match(patchRegex)!.shift()!;
          this._locale = 'en_US';
        } else {
          this._version = version !== undefined ? version : result.v;
          this._locale = language !== undefined ? language : result.l;
          this._patch = this._version.match(patchRegex)!.shift()!;
        }
      }
    }

    // Set the initialized flag to true.
    this._initialized = true;

    // If no options are provided, set the defaults for cache, storage and prefetching.
    if (typeof options === 'undefined')
      options = { fetch: false, cache: true, storage: { enable: { api: false, dragon: true } } };

    // Parse the caching configuration and set up the cache.
    this.logger?.trace('Parsing caching configuration.');
    if (typeof options.cache === 'undefined') options.cache = true;
    if (typeof options.cache === 'boolean') options.cache = { enable: options.cache };
    if (typeof options.cache.enable === 'boolean')
      options.cache.enable = { api: options.cache.enable, dragon: options.cache.enable };

    this._cacheEnabled = options.cache.enable!;
    this._cache = options.cache.custom ? options.cache.custom : new MemoryCache();

    // Parse the storage configuration and set up the storage.
    this.logger?.trace('Parsing storage configuration.');
    if (typeof options.storage === 'undefined') options.storage = { enable: { api: false, dragon: true } };
    if (typeof options.storage === 'boolean') options.storage = { enable: options.storage };
    if (typeof options.storage.enable === 'boolean')
      options.storage.enable = { api: options.storage.enable, dragon: options.storage.enable };

    this._storageEnabled = options.storage.enable!;
    const storageRoot = options?.storage?.root || 'data';
    this._storage = options.storage.custom ? options.storage.custom : new LocalStorage(this, storageRoot);

    // Get the game constants from data dragon (this is static data, so it's always fetched).
    this.logger?.trace('Fetching seasons static data from DDragon.');
    const seasonsResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/seasons.json')
      .catch(() => {});
    this.logger?.trace('Fetching queues static data from DDragon.');
    const queuesResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/queues.json')
      .catch(() => {});
    this.logger?.trace('Fetching maps static data from DDragon.');
    const mapsResponse = await axios.get('https://static.developer.riotgames.com/docs/lol/maps.json').catch(() => {});
    this.logger?.trace('Fetching game modes static data from DDragon.');
    const gameModesResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/gameModes.json')
      .catch(() => {});
    this.logger?.trace('Fetching game types static data from DDragon.');
    const gameTypesResponse = await axios
      .get('https://static.developer.riotgames.com/docs/lol/gameTypes.json')
      .catch(() => {});

    if (seasonsResponse?.status !== 200) throw new Error('Unable to fetch seasons static data from data dragon.');
    if (queuesResponse?.status !== 200) throw new Error('Unable to fetch queues static data from data dragon.');
    if (mapsResponse?.status !== 200) throw new Error('Unable to fetch maps static data from data dragon.');
    if (gameModesResponse?.status !== 200) throw new Error('Unable to fetch game modes static data from data dragon.');
    if (gameTypesResponse?.status !== 200) throw new Error('Unable to fetch game types static data from data dragon.');

    this.logger?.trace('Parsing fetched static data into defined interfaces.');
    this._seasons = <Season[]>seasonsResponse.data;
    this._queues = <Queue[]>queuesResponse.data.map((q: Queue) => ({
      ...q,
      notes: q.notes ?? undefined
    }));
    this._maps = <GameMap[]>mapsResponse.data.map((m: { mapId: number; mapName: string; notes: string }) => ({
      ...m,
      image: this.cdnBase + this.version + `/img/map/map${m.mapId}.png`
    }));
    this._gameModes = <GameMode[]>gameModesResponse.data;
    this._gameTypes = <GameType[]>gameTypesResponse.data;

    // Prefetch the data and cache it for faster data retrieval.
    this.logger?.trace('Prefetch specified data from DDragon.');
    if (typeof options?.fetch === 'boolean')
      options.fetch = {
        champions: options.fetch,
        items: options.fetch,
        runes: options.fetch,
        summonerSpells: options.fetch
      };
    if (options?.fetch?.champions ?? false) await this.champions.fetchAll();
    if (options?.fetch?.items ?? false) await this.items.fetch('1001');
    if (options?.fetch?.runes ?? false) await this.runes.fetch('Domination');
    if (options?.fetch?.summonerSpells ?? false) await this.summonerSpells.fetch('SummonerFlash');
  }

  /**
   * Ensure that client was initialized
   */
  private _ensureInitialized(): void {
    if (!this._initialized) throw new Error('Please initialize the client first.');
  }

  /**
   * The axios instance that handles all the CDN requests being made.
   */
  get http() {
    this._ensureInitialized();
    return this._http;
  }

  /**
   * The default API interactions handler used by the client.
   */
  get api() {
    this._ensureInitialized();
    return this._api;
  }

  /**
   * The league of legends region from which the data is to be fetched.
   */
  get region() {
    this._ensureInitialized();
    return this._region;
  }

  set region(region: Region) {
    this._ensureInitialized();
    this._region = region;
  }

  /**
   * The Data Dragon CDN Base URL
   */
  get cdnBase() {
    this._ensureInitialized();
    return this._cdnBase;
  }

  /**
   * The default champions manager used by the client.
   */
  get champions() {
    this._ensureInitialized();
    return this._champions;
  }

  /**
   * The default items manager used by the client.
   */
  get items() {
    this._ensureInitialized();
    return this._items;
  }

  /**
   * The default runes manager used by the client.
   */
  get runes() {
    this._ensureInitialized();
    return this._runes;
  }

  /**
   * The default summoner spells manager used by the client.
   */
  get summonerSpells() {
    this._ensureInitialized();
    return this._summonerSpells;
  }

  /**
   * The default summoners manager used by the client.
   */
  get summoners() {
    this._ensureInitialized();
    return this._summoners;
  }

  /**
   * The default riot accounts manager used by the client.
   * This is mostly for internal usage. You may want to use {@link Client.summoners} instead.
   */
  get accounts() {
    this._ensureInitialized();
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
    this._ensureInitialized();
    return this._leagues;
  }

  /**
   * The default match manager used by the client.
   */
  get matches() {
    this._ensureInitialized();
    return this._matches;
  }

  /**
   * The default LOL challenges manager used by the client.
   */
  get challenges() {
    this._ensureInitialized();
    return this._challenges;
  }

  /**
   * The default live match manager used by the client.
   */
  get spectator() {
    this._ensureInitialized();
    return this._spectator;
  }

  /**
   * The default clash tournaments manager used by the client.
   */
  get clash() {
    this._ensureInitialized();
    return this._clash;
  }

  /**
   * The client's logging utility.
   */
  get logger() {
    return this._logger;
  }

  /**
   * The client's caching utility.
   */
  get cache() {
    return this._cache;
  }

  /**
   * The client's storage utility.
   */
  get storage() {
    return this._storage;
  }

  /**
   * The client's configuration for caching. This is for internal usage only.
   *
   * PLEASE DO NOT TRY TO USE THIS.
   * Refer to {@link Client.initialize} to configure this.
   */
  get cacheEnabled() {
    return this._cacheEnabled;
  }

  /**
   * The client's configuration for storage. This is for internal usage only.
   *
   * PLEASE DO NOT TRY TO USE THIS.
   * Refer to {@link Client.initialize} to configure this.
   */
  get storageEnabled() {
    return this._storageEnabled;
  }

  /**
   * Get the current status of the RIOT API.
   *
   * No type support for this (yet).
   */
  get status() {
    this._ensureInitialized();
    return new Promise(async (resolve, reject) => {
      this.logger?.trace('Fetching status from Riot API.');
      const response = await this.api
        .makeApiRequest('/lol/status/v4/platform-data', {
          region: this.region,
          name: 'Get API Status',
          params: 'no params',
          regional: false
        })
        .catch(reject);
      if (response) resolve(response.data);
    });
  }

  /**
   * Update the locale in which the data is fetched.
   *
   * @param newLocale - The new locale to use for the future requests.
   * @param refetch - Whether to fetch all data dragon data in the new locale right away.
   */
  async updateLocale(newLocale: Locales, refetch: boolean = true) {
    this._ensureInitialized();
    this.logger?.trace('Assigning new locale.');
    this._locale = newLocale;
    if (refetch) {
      this.logger?.trace('Re-fetching data from DDragon.');
      await this.champions.fetchAll();
      await this.items.fetch('1001');
      await this.runes.fetch('Domination');
      await this.summonerSpells.fetch('SummonerFlash');
    }
  }

  /**
   * Update the patch from which the data is fetched.
   *
   * NOTE: The patch must be 2 integers separated by a `.`.
   * For example: `10.11` or `12.9`.
   *
   * This should NOT be the data dragon version.
   *
   * @param patch - The new patch to use for the future requests.
   * @param refetch - Whether to fetch all data dragon data from the new patch right away.
   */
  async updatePatch(patch: string, refetch: boolean = true) {
    this._ensureInitialized();
    this.logger?.trace('Update patch and DDragon version.');
    this._patch = patch;
    this._version = patch + '.1';
    if (refetch) {
      this.logger?.trace('Re-fetching data from DDragon.');
      await this.champions.fetchAll();
      await this.items.fetch('1001');
      await this.runes.fetch('Domination');
      await this.summonerSpells.fetch('SummonerFlash');
    }
  }

  /**
   * The current Data Dragon CDN version.
   */
  get version() {
    this._ensureInitialized();
    return this._version;
  }

  /**
   * The patch of the game currently in use.
   *
   * Must be above 5.1 for proper functionality.
   */
  get patch() {
    this._ensureInitialized();
    return this._patch;
  }

  /**
   * Is this client initialized.
   */
  get initialized() {
    return this._initialized;
  }

  /**
   * The locale in which all the data is going to be fetched in.
   */
  get locale() {
    this._ensureInitialized();
    return this._locale;
  }

  /**
   * An array of all seasons and their respective IDs.
   */
  get seasons() {
    this._ensureInitialized();
    return this._seasons;
  }

  /**
   * An array of all queue types and their respective data.
   */
  get queues() {
    this._ensureInitialized();
    return this._queues;
  }

  /**
   * An array of all maps and their respective data.
   */
  get maps() {
    this._ensureInitialized();
    return this._maps;
  }

  /**
   * An array of all game modes and their respective data.
   */
  get gameModes() {
    this._ensureInitialized();
    return this._gameModes;
  }

  /**
   * An array of all game types and their respective data.
   */
  get gameTypes() {
    this._ensureInitialized();
    return this._gameTypes;
  }
}
