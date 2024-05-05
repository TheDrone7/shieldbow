import { Collection } from '@discordjs/collection';
import { Champion, SummonerSpell } from '@shieldbow/web';
import { Client } from 'client';
import { FetchOptions, ISpectatorParticipant } from 'types';

/**
 * Represents a participant in a featured live game.
 */
export class SpectatorParticipant {
  #client: Client;
  /**
   * The unique player ID (PUUID) of the participant.
   */
  readonly playerId: string;
  /**
   * The summoner ID of the participant.
   */
  readonly summonerId: string;
  /**
   * The Riot ID of the participant.
   *
   * This is their account's tag in the form of `name#tag`.
   */
  readonly riotId: string;
  /**
   * The ID of the team this participant is on.
   */
  readonly teamId: number;
  /**
   * The summoner spells of the participant.
   */
  readonly summonerSpells: Collection<'D' | 'F', SummonerSpell>;
  /**
   * The summoner spell IDs of the participant.
   *
   * This is a fallback to {@link SpectatorParticipant.summonerSpells | summonerSpells}.
   */
  readonly summonerSpellIds: Collection<'D' | 'F', number>;
  /**
   * The champion picked by the participant to play in the game.
   */
  readonly champion: Champion;
  /**
   * The ID of the champion picked by the participant to play in the game.
   *
   * This is a fallback to {@link SpectatorParticipant.champion | champion}.
   */
  readonly championId: number;
  /**
   * The profile icon ID of the participant.
   */
  readonly profileIconId: number;
  /**
   * Whether the participant is a bot.
   */
  readonly bot: boolean;

  /**
   * Creates a new spectator participant.
   * @param data - The raw data for the participant.
   * @param spells - A collection of all summoner spells.
   * @param champion - The champion object for the participant's champion ID.
   */
  constructor(
    client: Client,
    data: ISpectatorParticipant,
    spells: Collection<string, SummonerSpell>,
    champion: Champion
  ) {
    this.#client = client;
    this.playerId = data.puuid;
    this.summonerId = data.summonerId;
    this.riotId = data.riotId;
    this.teamId = data.teamId;
    this.summonerSpells = new Collection();
    this.summonerSpellIds = new Collection();
    this.summonerSpells.set('D', spells.find((spell) => spell.key === data.spell1Id)!);
    this.summonerSpells.set('F', spells.find((spell) => spell.key === data.spell2Id)!);
    this.summonerSpellIds.set('D', data.spell1Id);
    this.summonerSpellIds.set('F', data.spell2Id);
    this.champion = champion;
    this.championId = data.championId;
    this.profileIconId = data.profileIconId;
    this.bot = data.bot;
  }

  /**
   * The color/name of the team this participant is on.
   *
   * This only works for two-team games like Summoner's Rift or Howling Abyss.
   * Does not work for other modes like Arena.
   */
  get teamName() {
    return this.teamId === 100 ? 'Blue' : 'Red';
  }

  /**
   * The username of the participant (displayed in game).
   *
   * This is the part before the # in the {@link SpectatorParticipant.riotId | riotId}.
   */
  get username() {
    return this.riotId.split('#')[0];
  }

  /**
   * The tag of the participant (displayed in game).
   *
   * This is the part after the # in the {@link SpectatorParticipant.riotId | riotId}.
   */
  get tag() {
    return this.riotId.split('#')[1];
  }

  /**
   * The CDragon URL for the image of the participant's profile icon
   *
   * You should use {@link SpectatorParticipant.profileIconId | profileIconId} if you are self hosting the images.
   */
  get profileIconURL() {
    return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${this.profileIconId}.jpg`;
  }

  /**
   * Fetch the summoner object for the participant.
   * @param options - The basic fetching options.
   * @returns The summoner object for the participant.
   */
  async fetchSummoner(options: FetchOptions) {
    return this.#client.summoners.fetch(this.playerId, options);
  }

  /**
   * Fetch the account object for the participant.
   *
   * Using this is not advised as the account's properties are already
   * available in the participant object.
   * @param options - The basic fetching options.
   * @returns The account object for the participant.
   */
  async fetchAccount(options: FetchOptions) {
    return this.#client.accounts.fetch(this.playerId, options);
  }

  /**
   * Fetch the league entries (ranks in various ranked modes) for the participant.
   * @param options - The basic fetching options.
   * @returns The league entries for the participant.
   */
  async fetchLeagueEntries(options: FetchOptions) {
    return this.#client.leagues.fetch(this.summonerId, options);
  }

  /**
   * Fetch the challenge progression and preferences of the participant.
   * @param options - The basic fetching options.
   * @returns The challenge progression and preferences of the participant.
   */
  async fetchChallenges(options: FetchOptions) {
    return this.#client.lolChallenges.fetchPlayerChallenges(this.summonerId, options);
  }
}
