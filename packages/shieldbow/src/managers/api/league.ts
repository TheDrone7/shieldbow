import { Collection } from '@discordjs/collection';
import { BaseManager, Region } from '@shieldbow/web';
import { Client } from 'client';
import { LeagueEntry, LeagueList } from 'structures';
import { ILeagueEntry, QueueType, FetchOptions, TierType, DivisionType, ILeagueList } from 'types';
import { parseFetchOptions } from 'utilities';

/**
 * The manager for the League API.
 */
export class LeagueManager implements BaseManager<Collection<QueueType, LeagueEntry>> {
  /**
   * The client that instantiated this manager.
   */
  client: Client;

  /**
   * Create a new LeagueManager.
   * @param client - The client.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch the league entries of a summoner by summoner ID.
   * @param id - The summoner ID.
   * @param options - The basic fetching options.
   * @returns The league entries of the summoner.
   */
  async fetch(id: string, options?: FetchOptions): Promise<Collection<QueueType, LeagueEntry>> {
    const opts = parseFetchOptions(this.client, 'league', options);

    this.client.logger?.trace(`Fetching league with Summoner ID: ${id}`);
    const url = '/lol/league/v4/entries/by-summoner/' + id;

    try {
      const internal = await this.checkInternalEntries(id, opts.region ?? this.client.region, opts);
      if (internal) {
        this.client.logger?.trace(`Fetched league entries with Summoner ID: ${id} from cache`);
        return internal;
      }

      const data = await this.client.request<ILeagueEntry[]>(url, {
        regional: false,
        method: 'leagueEntriesBySummoner',
        debug: 'Summoner ID: ' + id,
        region: opts.region
      });

      const leagues = await this.processData(data, opts.region ?? this.client.region, opts);

      this.client.logger?.trace(`Fetched league entries with Summoner ID: ${id}`);
      return leagues;
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch league with Summoner ID: ${id}`);
      return Promise.reject(err);
    }
  }

  /**
   * Fetch the league list by league ID.
   * @param leagueId - The league ID.
   * @param options - The basic fetching options.
   * @returns The league list of the provided ID.
   */
  async fetchByLeagueId(leagueId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'league', options);

    this.client.logger?.trace(`Fetching league with League ID: ${leagueId}`);
    const url = '/lol/league/v4/leagues/' + leagueId;

    try {
      const data = await this.client.request<ILeagueList>(url, {
        regional: false,
        method: 'leagueByLeagueId',
        debug: 'League ID: ' + leagueId,
        region: opts.region
      });

      const entries: ILeagueEntry[] = data.entries.map((l) => ({
        ...l,
        queueType: data.queue,
        tier: data.tier,
        leagueId: data.leagueId
      }));

      await this.processData(entries, opts.region ?? this.client.region, opts);
      const league = new LeagueList(this.client, opts.region ?? this.client.region, data);

      this.client.logger?.trace(`Fetched league with League ID: ${leagueId}`);
      return league;
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch league with League ID: ${leagueId}`);
      return Promise.reject(err);
    }
  }

  /**
   * Fetch league entries by queue, tier and division.
   *
   * This is always fetched from the API.
   * But, you can still store (and cache) it as league entries.
   * @param queue - The type of queue, defaults to RANKED_SOLO_5x5.
   * @param tier - The tier of the league, defaults to EMERALD.
   * @param division - The division of the league, defaults to I.
   * @param page - The page number of entries, defaults to 1. (Ignored for APEX - Master+ tiers)
   * @param options - The basic fetching options.
   */
  async fetchByQueueAndTier(
    queue: QueueType = 'RANKED_SOLO_5x5',
    tier: TierType = 'EMERALD',
    division: DivisionType = 'I',
    page: number = 1,
    options?: FetchOptions
  ) {
    const opts = parseFetchOptions(this.client, 'league', options);
    const APEX: TierType[] = ['MASTER', 'GRANDMASTER', 'CHALLENGER'];

    this.client.logger?.trace(`Fetching league entries with queue: ${queue}, tier: ${tier}, division: ${division}`);

    if (APEX.includes(tier)) return this.fetchByQueueApex(queue, tier, opts);
    else return this.fetchByQueueAndTierAPI(queue, tier, division, page, opts);
  }

  private async fetchByQueueApex(queue: QueueType, tier: TierType, options: FetchOptions) {
    const url = `/lol/league/v4/${queue.toLowerCase()}leagues/by-queue/${queue}`;

    try {
      const data = await this.client.request<ILeagueList>(url, {
        regional: false,
        method: 'leagueEntriesByQueueApex',
        debug: `queue: ${queue}, tier: ${tier}`,
        region: options.region
      });

      const entries: ILeagueEntry[] = data.entries.map((l) => ({
        ...l,
        queueType: data.queue,
        tier: data.tier,
        leagueId: data.leagueId
      }));

      await this.processData(entries, options.region ?? this.client.region, options);
      const leagues = entries.map((l) => new LeagueEntry(this.client, options.region ?? this.client.region, l));
      return leagues;
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch league entries with queue: ${queue}, tier: ${tier}`);
      return Promise.reject(err);
    }
  }

  private async fetchByQueueAndTierAPI(
    queue: QueueType,
    tier: TierType,
    division: DivisionType,
    page: number,
    options: FetchOptions
  ) {
    const url = `/lol/league/v4/entries/${queue}/${tier}/${division}?page=${page}`;

    try {
      const data = await this.client.request<ILeagueEntry[]>(url, {
        regional: false,
        method: 'leagueEntriesByQueueAndTier',
        debug: `queue: ${queue}, tier: ${tier}, division: ${division}, page: ${page}`,
        region: options.region
      });

      await this.processData(data, options.region ?? this.client.region, options);
      const leagues = data.map((l) => new LeagueEntry(this.client, options.region ?? this.client.region, l));

      this.client.logger?.trace(`Fetched league entries with queue: ${queue}, tier: ${tier}, division: ${division}`);
      return leagues;
    } catch (err) {
      this.client.logger?.trace(
        `Failed to fetch league entries with queue: ${queue}, tier: ${tier}, division: ${division}, page: ${page}`
      );
      return Promise.reject(err);
    }
  }

  private async checkInternalEntries(id: string, region: Region, options: FetchOptions) {
    try {
      const stored = await this.client.storage.load<ILeagueEntry[]>('league', id);
      const toIgnoreStorage =
        stored && typeof options.ignoreStorage === 'function' ? options.ignoreStorage(stored) : !!options.ignoreStorage;
      if (!toIgnoreStorage) return this.processData(stored!, region, options);

      const cached = this.client.cache.get<Collection<QueueType, LeagueEntry>>(`league:${id}`);
      const toIgnoreCache =
        cached && typeof options.ignoreCache === 'function' ? options.ignoreCache(cached) : !!options.ignoreCache;

      if (!toIgnoreCache) return cached;

      return undefined;
    } catch (err) {
      this.client.logger?.trace(`League entries with Summoner ID: ${id} not found in storage`);
      return undefined;
    }
  }

  private async processData(data: ILeagueEntry[], region: Region, options: FetchOptions) {
    const leagues = new Collection<QueueType, LeagueEntry>();
    for (const league of data) leagues.set(league.queueType, new LeagueEntry(this.client, region, league));

    const summonerId = data[0].summonerId;
    const toStore = typeof options.store === 'function' ? options.store(leagues) : !!options.store;
    if (toStore) await this.client.storage.save('league', summonerId, { ...data, region });

    const toCache = typeof options.cache === 'function' ? options.cache(leagues) : !!options.cache;
    if (toCache) this.client.cache.set(`league:${summonerId}`, leagues);

    return leagues;
  }
}
