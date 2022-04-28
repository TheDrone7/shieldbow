import type { CurrentGamePerksData } from './CurrentGamePerks';

export interface CurrentGameParticipantData {
  championId: number;
  perks: CurrentGamePerksData;
  profileIconId: number;
  bot: boolean;
  teamId: number;
  summonerName: string;
  summonerId: string;
  spell1Id: number;
  spell2Id: number;
  gameCustomizationObjects: {
    category: string;
    content: string;
  }[];
}
