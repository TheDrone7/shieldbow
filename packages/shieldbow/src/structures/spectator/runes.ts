import { Rune, RuneTree, StatRune } from '@shieldbow/web';
import { ILiveGameParticipantPerks } from 'types';

/**
 * Represents the runes of a live game participant.
 */
export class LiveGameParticipantRunes {
  /**
   * The primary rune tree selected by the participant.
   */
  readonly primaryTree: RuneTree;
  /**
   * The ID of the primary rune tree selected by the participant.
   *
   * This is a fallback to {@link LiveGameParticipantRunes.primaryTree | primaryTree}.
   */
  readonly primaryTreeId: number;
  /**
   * The secondary rune tree selected by the participant.
   */
  readonly secondaryTree: RuneTree;
  /**
   * The ID of the secondary rune tree selected by the participant.
   *
   * This is a fallback to {@link LiveGameParticipantRunes.secondaryTree | secondaryTree}.
   */
  readonly secondaryTreeId: number;
  /**
   * The individual runes selected by the participant.
   */
  readonly selectedRunes: Rune[];
  /**
   * The IDs of the runes selected by the participant.
   *
   * This is a fallback to {@link LiveGameParticipantRunes.selectedRunes | selectedRunes}.
   */
  readonly selectedRuneIds: number[];
  /**
   * The stat runes selected by the participant.
   */
  readonly statRunes: StatRune[];

  /**
   * Creates a new Live Game Participant Runes.
   * @param data - The raw data from the spectator-v5 API.
   * @param trees - The rune trees available in the game.
   * @param runes - The runes available in the game.
   * @param statRunes - The stat runes available in the game.
   */
  constructor(data: ILiveGameParticipantPerks, trees: RuneTree[], runes: Rune[], statRunes: StatRune[]) {
    this.primaryTreeId = data.perkStyle;
    this.secondaryTreeId = data.perkSubStyle;
    this.selectedRuneIds = data.perkIds;

    const mainRunes = data.perkIds.filter((id) => id - 5000 > 1000);
    const statRuneIds = data.perkIds.filter((id) => id - 5000 < 1000);

    this.primaryTree = trees.find((tree) => tree.id === this.primaryTreeId)!;
    this.secondaryTree = trees.find((tree) => tree.id === this.secondaryTreeId)!;
    this.selectedRunes = runes.filter((rune) => mainRunes.includes(rune.id));
    this.statRunes = statRuneIds.map((id) => statRunes.find((rune) => rune.id === id)!);
  }
}
