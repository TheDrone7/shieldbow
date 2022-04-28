import type { Client } from '../client';
import type { CurrentGameParticipantData } from '../types';
import type { SummonerSpell } from './SummonerSpell';
import type { Champion } from './Champion';
import Collection from '@discordjs/collection';
import { CurrentGamePerks } from './CurrentGamePerks';

export class CurrentGameParticipant {
  readonly teamId: number;
  readonly summonerSpells: Collection<'D' | 'F', SummonerSpell>;
  readonly champion: Champion;
  readonly bot: boolean;
  readonly summonerName: string;
  readonly profileIcon: string;
  readonly perks: CurrentGamePerks;
  constructor(client: Client, data: CurrentGameParticipantData) {
    this.teamId = data.teamId;
    this.summonerSpells = new Collection<'D' | 'F', SummonerSpell>();
    this.summonerSpells.set('D', client.summonerSpells.cache.find((s) => s.key === data.spell1Id)!);
    this.summonerSpells.set('F', client.summonerSpells.cache.find((s) => s.key === data.spell2Id)!);
    this.champion = client.champions.cache.find((c) => c.key === data.championId)!;
    this.bot = data.bot;
    this.summonerName = data.summonerName;
    this.profileIcon = `${client.cdnBase}${client.version}/img/profileicon/${data.profileIconId}.png`;
    this.perks = new CurrentGamePerks(client, data.perks);
  }
}
