import { Champion, Region } from '@shieldbow/web';
import { Client } from 'client';
import { FetchOptions, IAccount } from 'types';

/**
 * A class representing a player's RIOT account.
 */
export class Account {
  /**
   * The client that instantiated this account.
   */
  #client: Client;
  /**
   * The player's unique ID - the PUUID.
   */
  public readonly playerId: string;
  /**
   * The player's game name.
   */
  public readonly username: string;
  /**
   * The player's tagline.
   */
  public readonly tagLine: string;
  /**
   * The region the summoner associated with this account is in.
   */
  public region: Region;

  /**
   * Create a new account object from the raw data.
   *
   * @param client - The client that instantiated this account.
   * @param data - The raw account data received from the API.
   */
  constructor(client: Client, region: Region, data: IAccount) {
    this.#client = client;
    this.region = region;
    this.playerId = data.puuid;
    this.username = data.gameName;
    this.tagLine = data.tagLine;
  }

  /**
   * The player's tag - `username#tagLine`
   */
  get tag() {
    return `${this.username}#${this.tagLine}`;
  }

  /**
   * The player's ID - the PUUID.
   */
  get id() {
    return this.playerId;
  }

  /**
   * Fetch the summoner associated with this account.
   *
   * @param fetchOptions - The fetch options.
   */
  public async fetchSummoner(fetchOptions?: FetchOptions) {
    return await this.#client.summoners.fetch(this.playerId, { ...fetchOptions, region: this.region });
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
}
