/**
 * The raw summoner data received from the API.
 */
export interface ISummoner {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
}
