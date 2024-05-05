import { ILiveGame } from 'types';
import { FeaturedGame } from './featured';
import { LiveGameParticipant } from './participant';
import { Client } from 'client';
import { Champion, RuneTree, StatRune, SummonerSpell } from '@shieldbow/web';
import { Collection } from '@discordjs/collection';

/**
 * Represents a live game.
 */
export class LiveGame extends FeaturedGame {
  /**
   * The participants in the game.
   */
  participants: LiveGameParticipant[];
  /**
   * The timestamp when the game started (in ms).
   */
  gameStartTimestamp: number;

  /**
   * Creates a new live game.
   * @param client - The client this live game was fetched by.
   * @param data - The raw data for the live game.
   * @param champions - The champions to use for the participants and bans.
   * @param spells - A collection of all summoner spells.
   * @param runeTrees - The rune trees available in the game.
   * @param statRunes - The stat runes available in the game.
   */
  constructor(
    client: Client,
    data: ILiveGame,
    champions: Champion[],
    spells: Collection<string, SummonerSpell>,
    runeTrees: Collection<string, RuneTree>,
    statRunes: StatRune[]
  ) {
    super(client, data, champions, spells);
    this.participants = data.participants.map(
      (participant: any) =>
        new LiveGameParticipant(
          client,
          participant,
          spells,
          champions.find((c) => c.id === participant.championId)!,
          runeTrees,
          statRunes
        )
    );
    this.gameStartTimestamp = data.gameStartTime;
  }

  /**
   * A date object representing when the game started.
   */
  get gameStartAt() {
    return new Date(this.gameStartTimestamp);
  }
}
