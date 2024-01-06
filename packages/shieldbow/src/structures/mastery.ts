import { Champion, Region } from '@shieldbow/web';
import { Client } from 'client';
import { FetchOptions, IChampionMastery } from 'types';

export class ChampionMastery {
  #client: Client;
  #region: Region;

  /**
   * The player ID (PUUID) of the summoner this mastery belongs to.
   */
  readonly playerId: string;
  /**
   * The summoner ID of the summoner this mastery belongs to.
   */
  readonly summonerId: string;
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
   * The number of mastery tokens earned with this champion.
   *
   * After mastery level 5, 2 tokens can be used to advance to 6,
   * then 3 more to advance to 7.
   */
  readonly tokensEarned: number;
  /**
   * The champion associated with this mastery.
   */
  readonly champion: Champion;
  /**
   * Whether the summoner has earned a chest with this champion in the current season.
   */
  readonly chestGranted: boolean;
  /**
   * The timestamp of the last time the summoner played this champion.
   */
  readonly lastPlayedTimestamp: number;

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
    this.summonerId = data.summonerId;
    this.level = data.championLevel;
    this.totalPoints = data.championPoints;
    this.pointsSinceLastLevel = data.championPointsSinceLastLevel;
    this.pointsUntilNextLevel = data.championPointsUntilNextLevel;
    this.tokensEarned = data.tokensEarned;
    this.champion = champion;
    this.chestGranted = data.chestGranted;
    this.lastPlayedTimestamp = data.lastPlayTime;
  }

  /**
   * The date of the last time the summoner played this champion.
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
