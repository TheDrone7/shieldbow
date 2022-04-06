import type { BaseManager, LeagueEntryData } from '../types';
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
  readonly cache: Collection<string, Collection<string, LeagueEntry>>;

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Collection<string, LeagueEntry>>();
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
    return new Promise<Collection<string, LeagueEntry>>(async (resolve, reject) => {
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
            const entries = new Collection<string, LeagueEntry>();
            for (const entry of data) entries.set(entry.queueType, new LeagueEntry(this.client, entry));
            this.cache.set(id, entries);
            resolve(entries);
          } else reject('No league entries found.');
        }
      }
    });
  }
}
