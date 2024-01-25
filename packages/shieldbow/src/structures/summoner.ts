import { Champion, Region } from '@shieldbow/web';
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

  /**
   * Fetch the champion mastery for a specific champion for the summoner.
   * @param champion - The champion whose mastery to fetch.
   * @param options - The fetch options.
   * @returns The champion mastery for the specified champion.
   */
  async fetchChampionMastery(champion: string | number | Champion, options?: FetchOptions) {
    return this.#client.championMasteries.fetch(this, champion, { ...options, region: this.region });
  }

  /**
   * Fetch all champion masteries for the summoner.
   * @param options - The fetch options.
   * @returns The champion masteries for the summoner.
   */
  async fetchAllChampionMasteries(options?: FetchOptions) {
    return this.#client.championMasteries.fetchAll(this, { ...options, region: this.region });
  }

  /**
   * Fetch the total champion mastery score for the summoner.
   * @param options - The fetch options.
   * @returns The total champion mastery score for the summoner.
   */
  async fetchChampionMasteryScore(options?: FetchOptions) {
    return this.#client.championMasteries.fetchScore(this, { ...options, region: this.region });
  }

  /**
   * Fetch the summoner's league entries (ranked stats).
   * @param options - The fetch options.
   * @returns The summoner's league entries.
   */
  async fetchLeagueEntries(options?: FetchOptions) {
    return this.#client.leagues.fetch(this.id, { ...options, region: this.region });
  }
}
