import type { Client } from '../client';
import type { ChallengeRankData, TierType } from '../types';

/**
 * A representation of the ranked challenges stats of a summoner.
 */
export class ChallengeRank {
  /**
   * The client this manager belongs to.
   */
  private readonly client: Client;
  /**
   * The unique player ID of the summoner.
   */
  readonly playerId: string;
  /**
   * The tier this summoner belongs to regarding this challenge.
   */
  readonly tier: TierType;
  /**
   * The progression of the summoner in the challenge.
   */
  readonly progression: number;
  /**
   * The rank of the summoner in the challenge.
   */
  readonly rank: number;

  constructor(client: Client, data: ChallengeRankData, tier: TierType) {
    this.client = client;
    this.playerId = data.puuid;
    this.tier = tier;
    this.progression = data.value;
    this.rank = data.position;
  }

  /**
   * Fetch the details of the summoner.
   */
  fetchSummoner() {
    return this.client.summoners.fetchByPlayerId(this.playerId);
  }
}
