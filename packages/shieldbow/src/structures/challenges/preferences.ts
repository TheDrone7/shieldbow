import { Client } from 'client';
import { IPlayerClientPreferences } from 'types';

/**
 * The challenge-related preferences of a player's client.
 */
export class PlayerClientPreferences {
  client: Client;
  /**
   * The banner accent of this summoner.
   */
  readonly bannerAccent: string;
  /**
   * The title of this summoner.
   */
  readonly title: string;
  /**
   * The IDs of the challenges this summoner has put on display.
   */
  readonly displayedChallengeIds: number[];
  /**
   * Type of the border the summoner has currently selected.
   */
  readonly crestBorder: 'level' | 'ranked';
  /**
   * The level at which summoner unlocked currently equipped level border.
   */
  readonly prestigeCrestBorderLevel: number;

  /**
   * Creates a new instance of PlayerClientPreferences.
   * @param client - The client that created this instance.
   * @param data - The data to create the instance with.
   */
  constructor(client: Client, data: IPlayerClientPreferences) {
    this.client = client;
    this.bannerAccent = data.bannerAccent;
    this.title = data.title;
    this.displayedChallengeIds = data.challengeIds;
    this.crestBorder = data.crestBorder === '2' ? 'ranked' : 'level';
    this.prestigeCrestBorderLevel = data.prestigeCrestBorderLevel;
  }
}
