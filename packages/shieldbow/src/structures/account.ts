import { IAccount } from 'types';

/**
 * A class representing a player's RIOT account.
 */
export class Account {
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
   * Create a new account object from the raw data.
   * @param data - The raw account data received from the API.
   */
  constructor(data: IAccount) {
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
}
