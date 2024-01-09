import { Region } from '@shieldbow/web';
import { Client } from 'client';
import { ILeagueList, TierType } from 'types';
import { LeagueItem } from '.';

export class LeagueList {
  #client: Client;
  #region: Region;
  /**
   * The ID of the league.
   */
  readonly leagueId: string;
  /**
   * The name of the league.
   */
  readonly name: string;
  /**
   * The tier of the league.
   *
   * All {@link LeagueList.items | items} belong to this tier.
   */
  readonly tier: TierType;
  /**
   * The queue of the league.
   *
   * All {@link LeagueList.items | items} belong to this queue.
   */
  readonly queue: string;
  /**
   * The items of the league.
   */
  readonly items: LeagueItem[];

  /**
   * Create a new league list instance.
   * @param client - The client.
   * @param region - The region.
   * @param data - The raw data.
   */
  constructor(client: Client, region: Region, data: ILeagueList) {
    this.#client = client;
    this.#region = region;
    this.leagueId = data.leagueId;
    this.tier = data.tier;
    this.name = data.name;
    this.queue = data.queue;
    this.items = data.entries.map((li) => new LeagueItem(client, data.tier, region, li));
  }

  get internals() {
    return { c: this.#client, r: this.#region };
  }

  async refetchList() {
    /**
     * TODO: IMPLEMENT THIS
     */
  }
}
