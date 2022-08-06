import type {
  BaseManager,
  LeagueEntryData,
  QueueType,
  TierType,
  DivisionType,
  LeagueListData,
  FetchOptions
} from '../types';
import type { Client } from '../client';
import { LeagueEntry, LeagueList } from '../structures';
import { Collection } from '@discordjs/collection';

/**
 * A league manager - to fetch and manage all summoner competitive info.
 */
export class LeagueManager implements BaseManager<Collection<QueueType, LeagueEntry>> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  /**
   * The competitive info (mapped by summoner ID) stored in the memory.
   */
  readonly cache: Collection<string, Collection<QueueType, LeagueEntry>>;
  /**
   * The in-memory cache for league lists.
   */
  readonly listCache: Collection<string, LeagueList>;

  /**
   * Creates a new League manager.
   * @param client - The client that instantiated this manager.
   */
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Collection<QueueType, LeagueEntry>>();
    this.listCache = new Collection<string, LeagueList>();
  }

  /**
   * Fetch a summoner's competitive info by the summoner's ID.
   *
   * @param id - The ID of the summoner whose competitive info you want to find.
   * @param options - The basic fetching options.
   */
  fetch(id: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? this.cache;
    const region = options?.region ?? this.client.region;
    return new Promise<Collection<QueueType, LeagueEntry>>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/league/v4/entries/by-summoner/' + id, {
            region,
            regional: false,
            name: 'League Entry by summoner ID',
            params: `Summoner ID: ${id}`
          })
          .catch(reject);
        if (response) {
          const data = <LeagueEntryData[]>response.data;
          if (data && data.length) {
            const entries = new Collection<QueueType, LeagueEntry>();
            for (const entry of data) entries.set(entry.queueType, new LeagueEntry(this.client, entry));
            if (cache) this.cache.set(id, entries);
            resolve(entries);
          } else reject('No league entries found.');
        }
      }
    });
  }

  /**
   * Fetch a collection of league entries by the queue type, tier and division.
   *
   * @param queue - The type of queue - RANKED_SOLO_5x5, RANKED_FLEX_SR, etc.
   * @param tier - The tier of the entries - IRON to CHALLENGER.
   * @param division - The division of the entries - I, II, III, IV.
   * @param options - The basic fetching options (and page number - defaults to 1, force is ignored - always true).
   */
  fetchByQueueAndTier(
    queue: QueueType,
    tier: TierType,
    division: DivisionType,
    options?: FetchOptions & { page: number }
  ) {
    const cache = options?.cache ?? this.cache;
    const region = options?.region ?? this.client.region;
    const page = options?.page ?? 1;
    return new Promise<Collection<string, LeagueEntry>>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/league-exp/v4/entries/${queue}/${tier}/${division}?page=${page}`, {
          region,
          regional: false,
          name: 'League Entry by queue and tier',
          params: `Queue: ${queue}, Tier: ${tier}, Division: ${division}`
        })
        .catch(reject);
      if (response) {
        const data = <LeagueEntryData[]>response.data;
        if (data && data.length) {
          const result = new Collection<string, LeagueEntry>();
          for (const entry of data) {
            const { summonerId, queueType } = entry;
            const entries = this.cache.get(summonerId) || new Collection<QueueType, LeagueEntry>();
            const newEntry = new LeagueEntry(this.client, entry);
            entries.set(queueType, newEntry);
            if (cache) this.cache.set(summonerId, entries);
            result.set(summonerId, newEntry);
          }
          resolve(result);
        } else reject('No league entries found for the provided parameters.');
      }
    });
  }

  /**
   * Fetch the league entries by a league ID.
   *
   * @param leagueId - The League ID.
   * @param options - The basic fetching options (exception: `force` defaults to true).
   */
  fetchByLeagueId(leagueId: string, options?: FetchOptions) {
    const force = options?.force ?? true;
    const cache = options?.cache ?? this.cache;
    const region = options?.region ?? this.client.region;
    return new Promise<LeagueList>(async (resolve, reject) => {
      if (this.listCache.has(leagueId) && !force) resolve(this.listCache.get(leagueId)!);
      else {
        const response = await this.client.api
          .makeApiRequest(`/lol/league/v4/leagues/${leagueId}`, {
            region,
            regional: false,
            name: 'League Entry by league ID',
            params: `League ID: ${leagueId}`
          })
          .catch(reject);
        if (response && response.data) {
          const data = <LeagueListData>response.data;
          const list = new LeagueList(this.client, data);
          if (cache) {
            for (const entry of list.entries.values()) {
              const { summonerId, queueType } = entry;
              const entries = this.cache.get(summonerId) || new Collection<QueueType, LeagueEntry>();
              entries.set(queueType, entry);
              this.cache.set(summonerId, entries);
            }
            this.listCache.set(leagueId, list);
          }
          resolve(list);
        } else reject('No league entries found for the provided parameters.');
      }
    });
  }
}
