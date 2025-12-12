import { Champion, Region } from '@shieldbow/web';
import { Client } from 'client';
import { FetchOptions, IChampionMastery, MasteryGrade } from 'types';
import { ChampionMasteryMilestone } from './milestone';

export class ChampionMastery {
  #client: Client;
  #region: Region;

  /**
   * The player ID (PUUID) of the summoner this mastery belongs to.
   */
  readonly playerId: string;
  /**
   * The mastery level of the summoner with this champion.
   */
  readonly level: number;
  /**
   * The total mastery points earned by the summoner with this champion.
   */
  readonly totalPoints: number;
  /**
   * The number of points earned since the last level.
   */
  readonly pointsSinceLastLevel: number;
  /**
   * The number of points needed to reach the next level.
   */
  readonly pointsUntilNextLevel: number;
  /**
   * The number of mastery marks (formerly tokens) earned with this champion.
   *
   * These are used to upgrade the mastery level of the champion.
   */
  readonly marksEarned: number;
  /**
   * The champion associated with this mastery.
   */
  readonly champion: Champion;
  /**
   * The timestamp of the last time the player played this champion.
   */
  readonly lastPlayedTimestamp: number;
  /**
   * The number of marks required for the player to reach the next level of mastery with the champion.
   */
  readonly marksRequired: number;
  /**
   * The number of milestones the player has completed this season with this champion.
   */
  readonly seasonMilestone: number;
  /**
   * The milestone grades the player has achieved with this champion.
   */
  readonly grades: MasteryGrade[];
  /**
   * The data for the next milestone the player can achieve with this champion.
   */
  readonly nextMilestone: ChampionMasteryMilestone;

  /**
   * Create a new ChampionMastery instance.
   * @param client - The client that instantiated this instance.
   * @param region - The region this mastery belongs to.
   * @param champion - The champion associated with this mastery.
   * @param data - The raw mastery data.
   */
  constructor(client: Client, region: Region, champion: Champion, data: IChampionMastery) {
    this.#client = client;
    this.#region = region;
    this.playerId = data.puuid;
    this.level = data.championLevel;
    this.totalPoints = data.championPoints;
    this.pointsSinceLastLevel = data.championPointsSinceLastLevel;
    this.pointsUntilNextLevel = data.championPointsUntilNextLevel;
    this.marksEarned = data.tokensEarned;
    this.champion = champion;
    this.lastPlayedTimestamp = data.lastPlayTime;
    this.marksRequired = data.markRequiredForNextLevel;
    this.seasonMilestone = data.championSeasonMilestone;
    this.grades = data.milestoneGrades;
    this.nextMilestone = new ChampionMasteryMilestone(data.nextSeasonMilestone);
  }

  /**
   * The date of the last time the player played this champion.
   */
  get lastPlayedAt() {
    return new Date(this.lastPlayedTimestamp);
  }

  /**
   * Fetches the summoner associated with this mastery.
   * @param options - The options for fetching the summoner.
   * @returns The summoner associated with this mastery.
   */
  async fetchSummoner(options?: FetchOptions) {
    return this.#client.summoners.fetch(this.playerId, { ...options, region: this.#region });
  }

  /**
   * Fetches the Riot account associated with this mastery.
   * @param options - The options for fetching the account.
   * @returns The account associated with this mastery.
   */
  async fetchAccount(options?: FetchOptions) {
    return this.#client.accounts.fetch(this.playerId, { ...options, region: this.#region });
  }
}
