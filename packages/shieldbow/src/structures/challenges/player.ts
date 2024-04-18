import { Client } from 'client';
import { IPlayerChallenge } from 'types';
import { ChallengePoints } from './points';
import { ChallengeCategory } from 'types/api/challenges/literal';
import { PlayerChallengeProgress } from './progress';
import { PlayerClientPreferences } from './preferences';

/**
 * The challenges of a player.
 */
export class PlayerChallenges {
  #client: Client;
  /**
   * The total points of a player's challenges.
   */
  readonly total: ChallengePoints;
  /**
   * The total points of a player's challenges per category.
   */
  readonly categories: Record<ChallengeCategory, ChallengePoints>;
  /**
   * The progression of a player's individual challenges.
   */
  readonly challenges: PlayerChallengeProgress[];
  /**
   * The challenge-related preferences of a player's client.
   */
  readonly preferences: PlayerClientPreferences;

  /**
   * Creates an instance of PlayerChallenges.
   * @param client - The client.
   * @param data - The raw data of a player's challenges.
   */
  constructor(client: Client, data: IPlayerChallenge) {
    this.#client = client;
    this.total = new ChallengePoints(data.totalPoints);
    this.categories = Object.fromEntries(
      Object.entries(data.categoryPoints).map(([key, value]) => [key, new ChallengePoints(value)])
    ) as Record<ChallengeCategory, ChallengePoints>;
    this.challenges = data.challenges.map((challenge) => new PlayerChallengeProgress(challenge));
    this.preferences = new PlayerClientPreferences(this.#client, data.preferences);
  }
}
