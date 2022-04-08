import type { BaseManager, LeagueEntryData, QueueType, TierType, DivisionType } from '../types';
import type { Client } from '../client';
import { LeagueEntry } from '../structures';
import Collection from '@discordjs/collection';

/**
 * A league manager - to fetch and manage all summoner competitive info.
 */
export class LeagueManager implements BaseManager<Collection<string, LeagueEntry>> {
  /**
   * The client this manager belongs to.
   */
  readonly client: Client;
  /**
   * The competitive info (mapped by summoner ID) stored in the memory.
   */
  readonly cache: Collection<string, Collection<QueueType, LeagueEntry>>;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Collection<QueueType, LeagueEntry>>();
  }

  /**
   * Fetch a summoner's competitive info by the summoner's ID.
   *
   * @param id The ID of the summoner whose competitive info you want to find.
   * @param options The basic fetching options.
   *
   * @return A collection of the summoner's league info data (mapped by the queue type).
   */
  fetch(id: string, options: { force: boolean } = { force: false }) {
    return new Promise<Collection<QueueType, LeagueEntry>>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      else {
        const response = await this.client.api
          .makeApiRequest('/lol/league/v4/entries/by-summoner/' + id, {
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
            this.cache.set(id, entries);
            resolve(entries);
          } else reject('No league entries found.');
        }
      }
    });
  }

  fetchByQueueAndTier(queue: QueueType, tier: TierType, division: DivisionType, page: number = 1) {
    return new Promise<Collection<string, LeagueEntry>>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest(`/lol/league-exp/v4/entries/${queue}/${tier}/${division}?page=${page}`, {
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
            this.cache.set(summonerId, entries);
            result.set(summonerId, newEntry);
          }
          resolve(result);
        } else reject('No league entries found for the provided parameters.');
      }
    });
  }
}
