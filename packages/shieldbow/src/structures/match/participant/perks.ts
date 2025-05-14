import { RuneTree, StatPerk, Rune } from '@shieldbow/web';
import { IMatchParticipantPerks, IMatchParticipantPerkStyleSelection } from 'types';

/**
 * An individual selected perk (rune) of the participant.
 */
export class ParticipantPerk {
  /**
   * The recorded values for the perk (rune) as provided by the API.
   *
   * These are `[var1, var2, var3]` values for the perk (rune) that were tracked for it.
   */
  readonly values: number[];
  /**
   * The rune (perk) object containing details of the selected rune.
   */
  readonly rune: Rune;

  /**
   * Creates a new instance of the ParticipantPerk class.
   * @param data - The raw match participant perk data from the API.
   * @param runes - Array of all runes.
   */
  constructor(data: IMatchParticipantPerkStyleSelection, runes: Rune[]) {
    this.values = [data.var1 ?? 0, data.var2 ?? 0, data.var3 ?? 0] as number[];
    this.rune = runes.find((r) => r.id === data.perk)!;
  }
}

/**
 * The perks (runes) of the participant in a match.
 */
export class ParticipantPerks {
  /**
   * The stat perks (stat runes) selected by the participant.
   *
   * These are the `defense`, `flex`, and `offense` stat perks in the game.
   */
  readonly stats: StatPerk[];
  /**
   * Primary rune tree selected by the participant.
   */
  readonly primaryTree: RuneTree;
  /**
   * Secondary rune tree selected by the participant.
   */
  readonly secondaryTree: RuneTree;

  /**
   * The selected perks (runes) of the participant from the 2 trees.
   *
   * Also contains 3 values for each perk (rune) that were tracked for it (varies from one rune to another).
   * For example, for the `Conqueror` rune, the values might include the total healing done with it.
   * However, there is no proper documentation for this yet.
   *
   * The runes are ordered first from the primary tree and then from the secondary tree.
   */
  readonly selectedRunes: ParticipantPerk[];

  /**
   * Creates a new instance of the ParticipantPerks class.
   * @param data - The raw match participant perks data from the API.
   * @param rTrees - Array of all rune trees.
   * @param statPerks - Array of all stat perks.
   */
  constructor(data: IMatchParticipantPerks, rTrees: RuneTree[], statPerks: StatPerk[]) {
    this.stats = statPerks.filter((s) => Object.values(data.statPerks).includes(s.id));
    const primaryStyle = data.styles.find((s) => s.selections.length > 2)!;
    const secondaryStyle = data.styles.find((s) => s.selections.length <= 2)!;

    this.primaryTree = rTrees.find((t) => t.id === primaryStyle.style)!;
    this.secondaryTree = rTrees.find((t) => t.id === secondaryStyle.style)!;

    const runes = rTrees.map((t) => [t.runes.map((r) => [...r.values()]), ...t.keystones]).flat(3);

    this.selectedRunes = primaryStyle.selections.map((s) => new ParticipantPerk(s, runes));
    this.selectedRunes.push(...secondaryStyle.selections.map((s) => new ParticipantPerk(s, runes)));
  }
}
