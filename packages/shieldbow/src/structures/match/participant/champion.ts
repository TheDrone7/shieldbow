import { Collection } from '@discordjs/collection';
import { Champion } from '@shieldbow/web';
import { IMatchParticipant } from 'types';

/**
 * Represents the stats of a champion picked by a participant in a match.
 */
export class ParticipantChampion {
  /**
   * The champion that the participant picked.
   */
  readonly champ: Champion;
  /**
   * The amount of experience the participant earned on the champion.
   */
  readonly xp: number;
  /**
   * The level of the champion.
   */
  readonly level: number;
  /**
   * The numerical ID (key) of the champion.
   */
  readonly id: number;
  /**
   * The name of the champion.
   */
  readonly name: string;
  /**
   * The transformation of the champion.
   *
   * This is only used for Kayn - `DARKIN` or `ASSASSIN`.
   */
  readonly transformation: 'NONE' | 'DARKIN' | 'ASSASSIN' = 'NONE';
  /**
   * The number of times each ability of the champion was used by the participant.
   */
  readonly abilitiesUsed: Collection<'Q' | 'W' | 'E' | 'R', number> = new Collection();

  /**
   * Creates a new instance of ParticipantChampion.
   * @param data - The raw match participant data.
   * @param champions - The array of champions.
   */
  constructor(data: IMatchParticipant, champions: Champion[]) {
    if (data.championName) this.champ = champions.find((c) => c.name === data.championName)!;
    else this.champ = champions.find((c) => c.key === data.championId)!;
    this.id = data.championId;
    this.name = data.championName;
    this.xp = data.champExperience;
    this.level = data.champLevel;
    this.transformation = data.championTransform === 0 ? 'NONE' : data.championTransform === 1 ? 'DARKIN' : 'ASSASSIN';

    this.abilitiesUsed.set('Q', data.spell1Casts);
    this.abilitiesUsed.set('W', data.spell2Casts);
    this.abilitiesUsed.set('E', data.spell3Casts);
    this.abilitiesUsed.set('R', data.spell4Casts);
  }
}
