import type { CurrentGamePerksData } from './CurrentGamePerks';

/**
 * The Current game participant data as returned by the API.
 */
export interface CurrentGameParticipantData {
  championId: number;
  perks?: CurrentGamePerksData;
  profileIconId: number;
  bot: boolean;
  teamId: number;
  summonerName: string;
  spell1Id: number;
  spell2Id: number;
  gameCustomizationObjects?: {
    category: string;
    content: string;
  }[];
}
