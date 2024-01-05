import { Region } from '@shieldbow/web';
import { Client } from 'client';
import { FetchOptions, ISummoner } from 'types';

export class Summoner {
  #client: Client;

  /**
   * The ID of the summoner's profile icon.
   */
  readonly profileIconId: number;
  /**
   * The timestamp of the last revision (update) to the summoner's profile.
   */
  readonly revisionTimestamp: number;
  /**
   * The in-game name of the summoner (deprecated).
   */
  readonly name: string;
  /**
   * The summoner's encrypted summoner ID.
   */
  readonly id: string;
  /**
   * The summoner's encrypted PUUID.
   */
  readonly playerId: string;
  /**
   * The summoner's in-game level.
   */
  readonly level: number;
  /**
   * The region the summoner belongs to.
   */
  readonly region: Region;

  /**
   * Create a new Summoner instance.
   * @param client - The client.
   * @param region - The region the summoner belongs to.
   * @param data - The raw summoner data.
   */
  constructor(client: Client, region: Region, data: ISummoner) {
    this.#client = client;
    this.profileIconId = data.profileIconId;
    this.revisionTimestamp = data.revisionDate;
    this.name = data.name;
    this.id = data.id;
    this.playerId = data.puuid;
    this.level = data.summonerLevel;
    this.region = region;
  }

  /**
   * The URL to the summoner's profile icon.
   */
  get profileIconUrl(): string {
    return this.#client.generateImageUrl(`profileicon/${this.profileIconId}.png`);
  }

  /**
   * The date of the last revision (update) to the summoner's profile.
   */
  get revisionDate(): Date {
    return new Date(this.revisionTimestamp);
  }

  /**
   * Fetch the Riot account associated with this summoner.
   * @param options - The fetch options.
   * @returns - The account.
   */
  async fetchAccount(options?: FetchOptions) {
    return this.#client.accounts.fetch(this.playerId, { ...options, region: this.region });
  }
}
