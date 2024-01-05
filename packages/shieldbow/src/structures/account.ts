import { Region } from '@shieldbow/web';
import { Client } from 'client';
import { IAccount } from 'types';

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
  public async fetchSummoner(fetchOptions?: any) {
    return await this.#client.summoners.fetch(this.playerId, { ...fetchOptions, region: this.region });
  }
}
