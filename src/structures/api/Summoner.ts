import type { FetchOptions, MatchByPlayerOptions, Region, SummonerData } from '../../types';
import type { Client } from '../../client';
import { ChampionMasteryManager } from '../../managers';
import type { Collection } from '@discordjs/collection';
import type { LeagueEntry } from './LeagueEntry';
import type { Account } from './Account';
import type { CurrentGame } from './CurrentGame';

/**
 * A representation of a summoner (player).
 */
export class Summoner {
  private readonly client: Client;
  /**
   * The summoner ID for this summoner.
   */
  readonly id: string;
  /**
   * The account ID for this summoner.
   */
  readonly accountId: string;
  /**
   * The unique player ID for this summoner.
   * This is also called the PUUID.
   */
  readonly playerId: string;
  /**
   * The summoner name for this summoner.
   */
  readonly name: string;
  /**
   * The summoner level of this summoner.
   */
  readonly level: number;
  /**
   * The last time this summoner was modified.
   */
  readonly revisionDate: Date;
  /**
   * The current profile icon of this summoner.
   */
  readonly profileIcon: string;
  /**
   * A manager for the summoner's champion mastery.
   */
  readonly championMastery: ChampionMasteryManager;
  /**
   * The region this summoner is located in.
   */
  readonly region: Region;

  /**
   * Creates a new summoner instance.
   * @param client - The client that requested this data.
   * @param summoner - The raw summoner data from the API.
   * @param region - The region this summoner is located in.
   */
  constructor(client: Client, summoner: SummonerData, region?: Region) {
    this.client = client;
    this.region = region || client.region;
    this.id = summoner.id;
    this.accountId = summoner.accountId;
    this.playerId = summoner.puuid;
    this.name = summoner.name;
    this.level = summoner.summonerLevel;
    this.revisionDate = new Date(summoner.revisionDate);
    this.profileIcon = `${client.cdnBase}${client.version}/img/profileicon/${summoner.profileIconId}.png`;
    this.championMastery = new ChampionMasteryManager(client, this);
  }

  /**
   * Fetch the summoner's RIOT account info.
   *
   * @param options - The basic fetching options.
   */
  fetchAccount(options?: FetchOptions): Promise<Account> {
    if (options) options.region = this.region;
    else options = { region: this.region };
    return this.client.accounts.fetch(this.playerId, options);
  }

  /**
   * Fetch the summoner's competitive placement info.
   *
   * @param options - The basic fetching options.
   */
  fetchLeagueEntries(options?: FetchOptions): Promise<Collection<string, LeagueEntry>> {
    if (options) options.region = this.region;
    else options = { region: this.region };
    return this.client.leagues.fetch(this.id, options);
  }

  /**
   * Fetch the summoner's live game data.
   *
   * @param options - The basic fetching options.
   */
  fetchLiveMatch(options?: FetchOptions): Promise<CurrentGame> {
    if (options) options.region = this.region;
    else options = { region: this.region };
    return this.client.spectator.fetch(this.id, options);
  }

  /**
   * Fetch the summoner's recent matches (always fetches from API).
   *
   * @param options - The match list filtering options.
   */
  fetchMatchList(options?: MatchByPlayerOptions): Promise<string[]> {
    options = options || { count: 20 };
    options.count = options.count ?? 20;
    return this.client.matches.fetchMatchListByPlayer(this, options);
  }

  /**
   * Fetch the summoner's clash entries.
   *
   * @param options - The basic fetching options.
   */
  fetchClashEntries(options?: FetchOptions) {
    if (options) options.region = this.region;
    else options = { region: this.region };
    return this.client.clash.fetchPlayer(this.id, options);
  }

  /**
   * Fetch the summoner's challenges progression.
   *
   * @param options - The basic fetching options.
   */
  fetchChallenges(options?: FetchOptions) {
    if (options) options.region = this.region;
    else options = { region: this.region };
    return this.client.challenges.fetchSummonerProgression(this.playerId, options);
  }

  /**
   * Check a summoner's third party verification code.
   *
   * @param code - The code that the summoner's code should match with.
   */
  verifyCode(code: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest('/lol/platform/v4/third-party-code/by-summoner/' + this.id, {
          region: this.region,
          regional: false,
          name: 'Verify third party code',
          params: `Summoner ID: ${this.id}`
        })
        .catch(reject);
      if (response && response.status === 200) {
        const codeData = <string>response.data;
        resolve(codeData === code);
      } else resolve(false);
    });
  }
}
