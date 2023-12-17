import { ChampionManager, ItemManager, RuneTreeManager, SummonerSpellManager, ChallengeManager } from 'managers';
import type {
  ClientConfig,
  Locale,
  Region,
  Season,
  GameMap,
  GameMode,
  GameType,
  Queue,
  FetchConfig,
  ILogger
} from 'types';
import { constants, ShieldbowLogger } from 'utilities';
import { ShieldbowMemoryCache as MemoryCache, ICache } from '@shieldbow/cache';

const patchRegex = /\d+\.\d+/;

/**
 * The shieldbow web client.
 */
export class Client {
  private _dDragonBase: string;
  private _cDragonBase: string;
  private _merakiBase: string;
  private _region: Region;
  private _locale: Locale;
  private _version: string;
  private _fetcher: <T>(url: string) => Promise<T>;
  private _defaultFetchOptions: FetchConfig;
  private _seasons: Season[];
  private _maps: GameMap[];
  private _gameModes: GameMode[];
  private _gameTypes: GameType[];
  private _queues: Queue[];
  private _logger: ILogger;
  private _cache: ICache;
  private _merakiPatch: { champion: number; item: number };

  /**
   * The champion manager - allows you to fetch and manage League of Legends champions.
   */
  readonly champions: ChampionManager;
  /**
   * The item manager - allows you to fetch and manage League of Legends items.
   */
  readonly items: ItemManager;
  /**
   * The rune tree manager - allows you to fetch and manage League of Legends runes and rune trees.
   */
  readonly runes: RuneTreeManager;
  /**
   * The summoner spell manager - allows you to fetch and manage League of Legends summoner spells.
   */
  readonly summonerSpells: SummonerSpellManager;
  /**
   * The challenge manager - allows you to fetch and manage League of Legends challenges.
   */
  readonly challenges: ChallengeManager;

  /**
   * Create a new shieldbow web client.
   */
  constructor() {
    this._cDragonBase = constants.defaultCDragonBase;
    this._dDragonBase = constants.defaultDDragonBase;
    this._merakiBase = constants.defaultMerakiABase;
    this._version = undefined!;
    this._fetcher = undefined!;
    this._region = 'na';
    this._locale = 'en_US';
    this._defaultFetchOptions = {
      cache: true,
      ignoreCache: false,
      noVersion: false
    };
    this._merakiPatch = { champion: -1, item: -1 };

    this._seasons = [];
    this._maps = [];
    this._gameModes = [];
    this._gameTypes = [];
    this._queues = [];
    this._logger = new ShieldbowLogger();
    this._cache = new MemoryCache();

    this.champions = new ChampionManager(this);
    this.items = new ItemManager(this);
    this.runes = new RuneTreeManager(this);
    this.summonerSpells = new SummonerSpellManager(this);
    this.challenges = new ChallengeManager(this);
  }

  /**
   * The data dragon / community dragon version to fetch from.
   */
  get version(): string {
    return this._version;
  }

  /**
   * The in-game patch that the current version corresponds to.
   *
   * This is the first two numbers of the version, and is also what the community dragon uses.
   */
  get patch(): string {
    return this.version.match(patchRegex)!.shift()!;
  }

  /**
   * The locale (language) in which the client will fetch all the data.
   */
  get locale(): Locale {
    return this._locale;
  }

  /**
   * The region from which the client will fetch all the data.
   */
  get region(): Region {
    return this._region;
  }

  /**
   * The game modes that are available (static data).
   */
  get gameModes(): GameMode[] {
    return this._gameModes;
  }

  /**
   * The game types that are available (static data).
   */
  get gameTypes(): GameType[] {
    return this._gameTypes;
  }

  /**
   * The maps that are available (static data).
   */
  get maps(): GameMap[] {
    return this._maps;
  }

  /**
   * The seasons that are available (static data, not fully up-to-date).
   */
  get seasons(): Season[] {
    return this._seasons;
  }

  /**
   * The queues that are available (static data).
   */
  get queues(): Queue[] {
    return this._queues;
  }

  /**
   * The logger used by the client.
   */
  get logger(): ILogger {
    return this._logger;
  }

  /**
   * The cache used by the client.
   */
  get cache(): ICache {
    return this._cache;
  }

  /**
   * Ensure that the client is ready to be used.
   */
  private ensureInitialized(): void {
    if (this._version === undefined) throw new Error('Client has not been initialized.');
  }

  /**
   * Generate URLs to fetch from the CDNs.
   *
   * @param path - The path to fetch from (must NOT start with a `/`).
   * @param source - The CDN to fetch from (dDragon (default) or cDragon).
   * @param noVersion - Whether to ignore the version (and locale) and just provide the path
   * (false by default, always true for meraki).
   * @returns The generated URL.
   */
  generateUrl(
    path: string,
    source: 'dDragon' | 'cDragon' = 'dDragon',
    noVersion = !!this._defaultFetchOptions.noVersion
  ): string {
    this.ensureInitialized();
    return source === 'dDragon'
      ? `${this._dDragonBase}${noVersion ? '' : `${this.version}/data/${this.locale}/`}${path}`
      : `${this._cDragonBase}${noVersion ? '' : this.patch + '/'}${path}`;
  }

  /**
   * Generate meraki urls
   * @param type - The type of file to fetch (champion or item)
   * @returns - The generated URL
   */
  generateMerakiUrl(type: 'champion' | 'item') {
    return `${this._merakiBase}${
      this._merakiPatch[type] === -1 ? 'latest/en-US/' : 'old/en-US/' + this._merakiPatch[type] + '_'
    }${type}s.json`;
  }

  /**
   * Generate an image URL to fetch from the CDNs.
   *
   * @param path - The path to fetch from (must NOT start with a `/`).
   * @param source - The CDN to fetch from (dDragon (default) or cDragon).
   * @returns - The generated URL.
   */
  generateImageUrl(path: string, source: 'dDragon' | 'cDragon' = 'dDragon'): string {
    this.ensureInitialized();
    return source === 'dDragon'
      ? `${this._dDragonBase}${this.version}/img/${path}`
      : `${this._cDragonBase}${this.patch}/${path}`;
  }

  /**
   * Initialize the client, unusable before this.
   * @param config - The configuration for the client.
   */
  public async initialize(config?: ClientConfig) {
    // Read and set the CDN bases.
    this._dDragonBase = config?.cdn?.cDragon ?? this._dDragonBase;
    this._cDragonBase = config?.cdn?.dDragon ?? this._cDragonBase;
    this._merakiBase = config?.cdn?.meraki ?? this._merakiBase;

    // Set up the fetch method.
    if (config?.fetchMethod) this._fetcher = config.fetchMethod;
    else {
      const { default: axios } = await import('axios');
      this._fetcher = async <T>(url: string) => {
        try {
          const { data } = await axios.get<T>(url, { validateStatus: (status) => status === 200 });
          return data;
        } catch (error) {
          return Promise.reject(error);
        }
      };
    }

    // Set the region
    // Default to NA and en_US
    this._region = config?.region ?? this._region;
    this._locale = config?.locale ?? this._locale;

    // Fetch the default versions and locales.
    const versions = await this._fetcher<{ v: string; l: Locale }>(constants.versionsUrl + this._region + '.json');
    this._version = versions.v;
    this._locale = versions.l;

    // Update version by configuration (if provided).
    const allVersions = await this._fetcher<string[]>(constants.allVersionsUrl);
    if (typeof config?.version === 'string') {
      const latestMatch = allVersions.find((v) => v.startsWith(config.version!));
      if (latestMatch) this._version = latestMatch;
    }

    // Check if appropriate versions exist.
    // Community dragon can sometimes have a delay in getting the patch live.
    const aatroxUrls = [
      this.generateUrl('champion/Aatrox.json'),
      this.generateUrl('game/data/characters/aatrox/aatrox.bin.json', 'cDragon')
    ];

    let aatrox = await Promise.all(aatroxUrls.map((u) => this._fetcher(u).catch(() => undefined)));
    while (aatrox.some((a) => a === undefined)) {
      // CDragon is not yet ready, roll back to previous patch.
      const previousPatch = allVersions.at(allVersions.indexOf(this._version) + 1);
      if (previousPatch) this._version = previousPatch;
      else throw new Error('IMPOSSIBLE: Could not find a version that is supported by the CDragon.');

      // Regenerate URLs and refetch Aatrox.
      aatroxUrls[0] = this.generateUrl('champion/Aatrox.json');
      aatroxUrls[1] = this.generateUrl('game/data/characters/aatrox/aatrox.bin.json', 'cDragon');
      aatrox = await Promise.all(aatroxUrls.map((u) => this._fetcher(u).catch(() => undefined)));
    }

    // Parse fetching options
    this._defaultFetchOptions = {
      cache: config?.defaultFetchOptions?.cache ?? true,
      ignoreCache: config?.defaultFetchOptions?.ignoreCache ?? false,
      noVersion: config?.defaultFetchOptions?.noVersion ?? false
    };

    // Parse cache options
    if (typeof config?.cache === 'object') this._cache = config.cache;
    else this._cache = new MemoryCache({ maxSize: config?.cache ? -1 : 0 });

    // Set up the logger.
    if (typeof config?.logger === 'object')
      if (config.logger.customLogger) this._logger = config.logger.customLogger;
      else
        this._logger = new ShieldbowLogger(
          config.logger.enabled === false ? 'CRITICAL' : config.logger.level ?? 'WARN'
        );
    else if (config?.logger === false) this._logger = new ShieldbowLogger('CRITICAL');
    else this._logger = new ShieldbowLogger('WARN');

    // Set up the meraki patch
    await this._updateMerakiDetails(this.patch);

    // Prefetch static data such as maps, queues, etc.
    this._seasons = await this._fetcher<Season[]>(constants.seasonsUrl);
    this._maps = await this._fetcher<GameMap[]>(constants.mapsUrl);
    this._gameModes = await this._fetcher<GameMode[]>(constants.gameModesUrl);
    this._gameTypes = await this._fetcher<GameType[]>(constants.gameTypesUrl);
    this._queues = await this._fetcher<Queue[]>(constants.queuesUrl);

    this.runes.initialize();

    // If selected, prefetch other data as well.
    if (typeof config?.prefetch === 'object' && config.prefetch.champions) {
      const champions = await this.champions.fetchAll();
      this.logger?.debug(`Prefetched ${champions.size} champions.`);
    }

    if (typeof config?.prefetch === 'object' && config.prefetch.runes) {
      const runes = await this.runes.fetchAll();
      this.logger?.debug(`Prefetched ${runes.size} rune trees.`);
    }

    if (typeof config?.prefetch === 'object' && config.prefetch.items) {
      const items = await this.items.fetchAll();
      this.logger?.debug(`Prefetched ${items.size} items.`);
    }

    if (typeof config?.prefetch === 'object' && config.prefetch.summonerSpells) {
      const summonerSpells = await this.summonerSpells.fetchAll();
      this.logger?.debug(`Prefetched ${summonerSpells.size} summoner spells.`);
    }

    if (typeof config?.prefetch === 'object' && config.prefetch.challenges) {
      const challenges = await this.challenges.fetchAll();
      this.logger?.debug(`Prefetched ${challenges.size} challenges.`);
    }
  }

  /**
   * The default fetch options to be used by the client.
   */
  get defaultFetchOptions(): FetchConfig {
    return this._defaultFetchOptions;
  }

  /**
   * Whether the client has been initialized.
   */
  get initialized(): boolean {
    return this._version !== undefined;
  }

  /**
   * Update the locale in which the data is fetched.
   *
   * @param newLocale - The new locale to use for the future requests.
   * @param refetch - Whether to fetch all data dragon data in the new locale right away.
   */
  async updateLocale(newLocale: Locale, refetch: boolean = true) {
    this.ensureInitialized();
    this.logger?.debug('Assigning new locale.');
    this._locale = newLocale;
    this.logger?.debug('Clearing cache.');
    await this._cache.clear();
    if (refetch) {
      this.logger?.debug('Re-fetching data from DDragon.');
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
    this.ensureInitialized();
    this.logger?.debug('Update DDragon version.');
    this._version = patch + '.1';
    this.logger?.debug('Update Meraki version.');
    await this._updateMerakiDetails(patch);
    this.logger?.debug('Clear cache.');
    await this._cache.clear();
    if (refetch) {
      this.logger?.debug('Re-fetching data from DDragon.');
      await this.champions.fetchAll();
      await this.items.fetch('1001');
      await this.runes.fetch('Domination');
      await this.summonerSpells.fetch('SummonerFlash');
    }
  }

  /**
   * The fetch method used by the client.
   */
  get fetch(): <T>(url: string) => Promise<T> {
    return this._fetcher;
  }

  private async _updateMerakiDetails(patch: string) {
    const { patches } = await this.fetch<{ patches: { name: string; start: number }[] }>(constants.merakiPatchesUrl);
    const patchIndex = patches.findIndex((p) => p.name === patch);
    if (patchIndex === -1) {
      this.logger?.debug(`Could not find patch ${patch} in meraki patches.`);
      this._merakiPatch = { champion: -1, item: -1 };
      return;
    }

    // Get the start and end of the patch
    const patchStart = patches[patchIndex].start;
    const patchEnd = patches[patchIndex + 1]?.start ?? -1;

    if (patchEnd === -1) {
      this.logger?.debug(`Could not find end of patch ${patch} in meraki patches (latest patch).`);
      this._merakiPatch = { champion: -1, item: -1 };
      return;
    }

    this.logger?.debug(`Found patch ${patch} in meraki patches. Start: ${patchStart}, End: ${patchEnd}.`);

    // Get the list of files
    const files = await this.fetch<string>(constants.defaultMerakiABase + 'old/en-US/');

    // Get the file names from the HTML links (content between the <a> tags)
    // Filter out any non-json files (.tar.gz for older versions)
    const fileNames = files
      .split('\r\n')
      .filter((l) => l.startsWith('<a'))
      .map((f) => f.match(/>(.*?)</)![1])
      .filter((f) => f.endsWith('.json') && !isNaN(parseInt(f[0])));

    // Get the timestamps from filenames of champion files.
    const champStamps = fileNames
      .filter((f) => f.includes('champion'))
      .map((f) => parseInt(f.split('.')[0].split('_')[0]));

    // Get the timestamps from filenames of item files.
    const itemStamps = fileNames.filter((f) => f.includes('items')).map((f) => parseInt(f.split('.')[0].split('_')[0]));

    // Find the last (highest) timestamp within the patch for champs
    const champStamp = champStamps
      .filter((f) => f >= patchStart && f <= patchEnd)
      .sort()
      .pop();

    // Find the last (highest) timestamp within the patch for items
    const itemStamp = itemStamps
      .filter((f) => f >= patchStart && f <= patchEnd)
      .sort()
      .pop();

    this._merakiPatch = { champion: champStamp ?? -1, item: itemStamp ?? -1 };
  }
}
