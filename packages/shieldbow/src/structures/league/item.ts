import { DivisionType, FetchOptions, ILeagueItem, TierType } from 'types';
import { MiniSeries } from '.';
import { Client } from 'client';
import { Region } from '@shieldbow/web';

export class LeagueItem {
  #client: Client;
  #region: Region;
  /**
   * The name of the summoner whose stats these are.
   */
  readonly summonerName: string;
  /**
   * The ID of the summoner whose stats these are.
   */
  readonly summonerId: string;
  /**
   * Whether the summoner is new to the game.
   */
  readonly freshBlood: boolean;
  /**
   * The number of matches the summoner was on the winning team.
   */
  readonly wins: number;
  /**
   * @deprecated (DEPRECATED) as of split 2 of season 2023.
   *
   * The promo series status of the summoner.
   */
  readonly promos?: MiniSeries;
  /**
   * Whether the summoner has not played in a while.
   */
  readonly inactive: boolean;
  /**
   * Whether the summoner is a veteran.
   */
  readonly veteran: boolean;
  /**
   * Whether the summoner is on a hot streak.
   */
  readonly hotStreak: boolean;
  /**
   * The tier achieved by the summoner.
   *
   * Such as IRON, BRONZE, etc.
   */
  readonly tier: TierType;
  /**
   * The sub-division of the tier achieved by the summoner.
   *
   * Such as I, II, III, or IV.
   */
  readonly division: DivisionType;
  /**
   * The amount of LP (league points) the summoner has.
   */
  readonly lp: number;
  /**
   * The number of matches the summoner was on the losing team.
   */
  readonly losses: number;

  /**
   * Create a new League Item instance.
   * @param client - The client.
   * @param tier - The tier of the league list this item belongs to.
   * @param data - The raw League item data.
   */
  constructor(client: Client, tier: TierType, region: Region, data: ILeagueItem) {
    this.#client = client;
    this.#region = region;
    this.tier = tier;
    this.summonerName = data.summonerName;
    this.summonerId = data.summonerId;
    this.freshBlood = data.freshBlood;
    this.wins = data.wins;
    this.inactive = data.inactive;
    this.veteran = data.veteran;
    this.hotStreak = data.hotStreak;
    this.division = data.rank;
    this.lp = data.leaguePoints;
    this.losses = data.losses;

    this.promos = data.miniSeries !== undefined ? new MiniSeries(data.miniSeries) : undefined;
  }

  /**
   * Fetch the summoner associated with the current league data.
   * @param options - The fetching options.
   * @returns A summoner instance of the player this data belongs to.
   */
  async fetchSummoner(options?: FetchOptions) {
    return this.#client.summoners.fetchBySummonerId(this.summonerId, { ...options, region: this.#region });
  }

  /**
   * The percentage (%) of games this summoner was on the winning team.
   *
   * Can be 0 - 100.
   */
  get winRate() {
    return (this.wins / (this.wins + this.losses)) * 100;
  }

  /**
   * The rank of the player - a full textual representation.
   *
   * Example: SILVER II (69 LP)
   */
  get rank() {
    return `${this.tier} ${this.division} (${this.lp} LP)`;
  }

  /**
   * Get labels of the summoner.
   *
   * - HOT STREAK
   * - VETERAN
   * - FRESH BLOOD
   * - INACTIVE
   */
  get labels() {
    const labels = [];
    if (this.hotStreak) labels.push('HOT STREAK');
    if (this.veteran) labels.push('VETERAN');
    if (this.freshBlood) labels.push('FRESH BLOOD');
    if (this.inactive) labels.push('INACTIVE');
    return labels;
  }
}
