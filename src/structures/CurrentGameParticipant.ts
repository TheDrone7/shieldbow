import type { Client } from '../client';
import type { CurrentGameParticipantData } from '../types';
import type { SummonerSpell } from './SummonerSpell';
import type { Champion } from './Champion';
import Collection from '@discordjs/collection';
import { CurrentGamePerks } from './CurrentGamePerks';

/**
 * A class representing a participant in a live game.
 */
export class CurrentGameParticipant {
  /**
   * The ID of the team this participant belongs to.
   */
  readonly teamId: number;
  /**
   * The summoner spells being used by this participant.
   */
  readonly summonerSpells: Collection<'D' | 'F', SummonerSpell>;
  /**
   * The champion being played by this participant.
   */
  readonly champion: Champion;
  /**
   * Whether the participant is a bot.
   */
  readonly bot: boolean;
  /**
   * The summoner name of this participant.
   */
  readonly summonerName: string;
  /**
   * A link to the participant's profile icon.
   */
  readonly profileIcon: string;
  /**
   * The rune setups of this participant.
   */
  readonly perks?: CurrentGamePerks;
  constructor(client: Client, data: CurrentGameParticipantData) {
    this.teamId = data.teamId;
    this.summonerSpells = new Collection<'D' | 'F', SummonerSpell>();
    this.summonerSpells.set('D', client.summonerSpells.cache.find((s) => s.key === data.spell1Id)!);
    this.summonerSpells.set('F', client.summonerSpells.cache.find((s) => s.key === data.spell2Id)!);
    this.champion = client.champions.cache.find((c) => c.key === data.championId)!;
    this.bot = data.bot;
    this.summonerName = data.summonerName;
    this.profileIcon = `${client.cdnBase}${client.version}/img/profileicon/${data.profileIconId}.png`;
    if (data.perks) this.perks = new CurrentGamePerks(client, data.perks);
  }
}
