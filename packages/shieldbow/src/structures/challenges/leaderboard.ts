import { IChallengeLeaderboardEntry } from 'types';

/**
 * Represents a challenge leaderboard entry.
 */
export class ChallengeLeaderboardEntry {
  /**
   * The player's ID (PUUID).
   */
  public readonly playerId: string;
  /**
   * The player's challenge progression value.
   */
  public readonly challengeValue: number;
  /**
   * The player's position on the leaderboard.
   */
  public readonly position: number;

  /**
   * Creates a new instance of the ChallengeLeaderboardEntry class.
   * @param data - The raw data from the API.
   */
  constructor(data: IChallengeLeaderboardEntry) {
    this.playerId = data.puuid;
    this.challengeValue = data.value;
    this.position = data.position;
  }
}
