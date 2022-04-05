import type { SummonerData } from '../types';
import type { Client } from '../client';
import { ChampionMasteryManager } from '../managers';

/**
 * A class representing a summoner (player).
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

  constructor(client: Client, summoner: SummonerData) {
    this.client = client;
    this.id = summoner.id;
    this.accountId = summoner.accountId;
    this.playerId = summoner.puuid;
    this.name = summoner.name;
    this.level = summoner.summonerLevel;
    this.revisionDate = new Date(summoner.revisionDate);
    this.profileIcon = `${client.cdnBase}${client.version}/img/profileicon/${summoner.profileIconId}.png`;
    this.championMastery = new ChampionMasteryManager(client, summoner.id);
  }

  get account() {
    return this.client.accounts.fetch(this.id);
  }

  /**
   * Check a summoner's third party verification code.
   *
   * @param code The code that the summoner's code should match with.
   */
  verifyCode(code: string) {
    return new Promise<boolean>(async (resolve, reject) => {
      const response = await this.client.api
        .makeApiRequest('/lol/platform/v4/third-party-code/by-summoner/' + this.id, {
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
