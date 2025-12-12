import { Region } from '@shieldbow/web';
import { DivisionType, FetchOptions, ILeagueEntry, QueueType, TierType } from 'types';
import { MiniSeries } from '.';
import { Client } from 'client';

export class LeagueEntry {
  #client: Client;
  #region: Region;
  /**
   * A unique ID of the league this summoner is in.
   */
  readonly leagueId: string;
  /**
   * The ID of the summoner whose details these are.
   */
  readonly summonerId: string;
  /**
   * The queue in which this ranked data was achieved by the summoner.
   *
   * RANKED_SOLO_5x5 - SoloQ / Ranked solo/duo
   * RANKED_FLEX_SR - Flex / Ranked flex
   * RANKED_FLEX_TT - Old twisted treeline ranked.
   */
  readonly queue: QueueType;
  /**
   * The tier the summoner achieved.
   *
   * IRON/BRONZE/SILVER... and so on.
   */
  readonly tier: TierType;
  /**
   * The sub-division of the tier achieved by the summoner.
   *
   * I/II/III/IV
   */
  readonly division: DivisionType;
  /**
   * The LP (league points) earned by the summoner.
   */
  readonly lp: number;
  /**
   * The number of matches this summoner was on the winning team.
   */
  readonly wins: number;
  /**
   * The number of matches this summoner was on the losing team.
   */
  readonly losses: number;
  /**
   * Whether the summoner is currently on a hot streak.
   */
  readonly hotStreak: boolean;
  /**
   * Whether the summoner is a veteran player.
   */
  readonly veteran: boolean;
  /**
   * Whether the player is new to the game.
   */
  readonly freshBlood: boolean;
  /**
   * Whether the player has not played the game recently.
   */
  readonly inactive: boolean;
  /**
   * @deprecated (DEPRECATED) - Removed as of split 2 of season 2023
   *
   * Only available if the summoner is currently in a promotional series.
   */
  readonly promos?: MiniSeries;

  /**
   * Create a new league entry instance.
   * @param client - The client that instantiated this object.
   * @param region - The region the data was fetched from.
   * @param data - The raw data received from the API.
   */
  constructor(client: Client, region: Region, data: ILeagueEntry) {
    this.#client = client;
    this.#region = region;
    this.leagueId = data.leagueId;
    this.summonerId = data.summonerId;
    this.queue = data.queueType;
    this.tier = data.tier;
    this.division = data.rank;
    this.lp = data.leaguePoints;
    this.wins = data.wins;
    this.losses = data.losses;
    this.hotStreak = data.hotStreak;
    this.veteran = data.veteran;
    this.freshBlood = data.freshBlood;
    this.inactive = data.inactive;
    this.promos = data.miniSeries ? new MiniSeries(data.miniSeries) : undefined;
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
   * Fetch the league list (ranked ladder) this entry belongs to.
   * @param options - The fetching options.
   * @returns The league list this entry belongs to.
   */
  async fetchLeagueList(options?: FetchOptions) {
    return this.#client.leagues.fetchByLeagueId(this.leagueId, { ...options, region: this.#region });
  }

  /**
   * The win rate of the player.
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
