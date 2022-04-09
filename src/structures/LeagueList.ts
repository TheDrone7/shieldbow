import type { Client } from '../client';
import type { LeagueListData, QueueType, TierType } from '../types';
import Collection from '@discordjs/collection';
import { LeagueEntry } from './LeagueEntry';

/**
 * A class representing a list of league entries.
 */
export class LeagueList {
  /**
   * The competitive league ID.
   */
  readonly leagueId: string;
  /**
   * The tier of the entries in this list.
   */
  readonly tier: TierType;
  /**
   * The name for the league of the entries in this list.
   */
  readonly name: string;
  /**
   * The type of queue - such as RANKED_SOLO_5x5, RANKED_FLEX_SR, RANKED_FLEX_TT.
   */
  readonly queue: QueueType;
  /**
   * The list of entries of the league ID.
   *
   * These are mapped by the summoner name.
   */
  readonly entries: Collection<string, LeagueEntry>;

  constructor(client: Client, data: LeagueListData) {
    this.leagueId = data.leagueId;
    this.tier = data.tier;
    this.name = data.name;
    this.queue = data.queue;
    this.entries = new Collection<string, LeagueEntry>();

    for (const entry of data.entries) {
      entry.queueType = this.queue;
      entry.leagueId = this.leagueId;
      entry.tier = this.tier;
      this.entries.set(entry.summonerName, new LeagueEntry(client, entry));
    }
  }
}
