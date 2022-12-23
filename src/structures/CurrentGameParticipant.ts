import type { Client } from '../client';
import type { CurrentGameParticipantData, FetchOptions } from '../types';
import type { SummonerSpell } from './SummonerSpell';
import type { Champion } from './Champion';
import { Collection } from '@discordjs/collection';
import { CurrentGamePerks } from './CurrentGamePerks';
import type { Summoner } from './Summoner';

/**
 * A representation of a participant in a live game.
 */
export class CurrentGameParticipant {
  /**
   * The client that instantiated this participant.
   */
  private readonly _client;
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

  /**
   * Creates a new Current Game Participant instance.
   * @param client - The client that requested this data.
   * @param data - The raw current game participant data from the API.
   * @param champ - The champion being played by this participant.
   */
  constructor(client: Client, data: CurrentGameParticipantData, champ: Champion) {
    this._client = client;
    this.teamId = data.teamId;
    this.summonerSpells = new Collection<'D' | 'F', SummonerSpell>();
    this.summonerSpells.set('D', client.summonerSpells.cache.find((s) => s.key === data.spell1Id)!);
    this.summonerSpells.set('F', client.summonerSpells.cache.find((s) => s.key === data.spell2Id)!);
    this.champion = champ;
    this.bot = data.bot;
    this.summonerName = data.summonerName;
    this.profileIcon = `${client.cdnBase}${client.version}/img/profileicon/${data.profileIconId}.png`;
    if (data.perks) this.perks = new CurrentGamePerks(client, data.perks);
  }

  /**
   * Fetches the summoner info of this participant.
   *
   * @param options - The basic fetching options.
   */
  fetchSummoner(options?: FetchOptions): Promise<Summoner> {
    return this._client.summoners.fetchBySummonerName(this.summonerName, options);
  }
}
