import type { Account } from "./Account";
import type { SummonerData } from "../types";
import type { Client } from "../client";
import { ChampionMasteryManager } from "../managers";

/**
 * A class representing a summoner (player).
 */
export class Summoner {
  /**
   * The summoner ID for this summoner.
   */
  readonly id: string;
  /**
   * The account ID for this summoner.
   */
  readonly accountId: string;
  /**
   * The RIOT account for this summoner.
   */
  readonly account: Account;
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

  constructor(client: Client, account: Account, summoner: SummonerData) {
    this.id = summoner.id;
    this.accountId = summoner.accountId;
    this.playerId = summoner.puuid;
    this.name = summoner.name;
    this.level = summoner.summonerLevel;
    this.revisionDate = new Date(summoner.revisionDate);
    this.profileIcon = `${client.cdnBase}${client.version}/img/profileicon/${summoner.profileIconId}.png`;
    this.account = account;
    this.championMastery = new ChampionMasteryManager(client, summoner.id);
  }
}
