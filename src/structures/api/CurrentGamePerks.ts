import type { CurrentGamePerksData, StatPerk } from '../../types';
import type { Rune } from '../dragon/Rune';
import type { RuneTree } from '../dragon/RuneTree';

import { statPerks } from '../../util';
import type { Collection } from '@discordjs/collection';

/**
 * A representation of the rune setup of a live game participant.
 */
export class CurrentGamePerks {
  /**
   * The runes selected by the participant.
   */
  readonly selected: Rune[];
  /**
   * The stat runes selected by the participant.
   */
  readonly stats: StatPerk[];
  /**
   * The primary rune tree selected by the participant.
   */
  readonly primaryTree: RuneTree;
  /**
   * The secondary rune tree selected by the participant.
   */
  readonly secondaryTree: RuneTree;

  /**
   * Creates a new Current Game perks instance.
   * @param runeTrees - The collection of the runes in the game.
   * @param data - The raw current game participant perks data from the API.
   */
  constructor(runeTrees: Collection<string, RuneTree>, data: CurrentGamePerksData) {
    this.primaryTree = runeTrees.find((r) => r.id === data.perkStyle)!;
    this.secondaryTree = runeTrees.find((r) => r.id === data.perkSubStyle)!;
    const stat = data.perkIds.filter((p) => Object.keys(statPerks).includes(p.toString()));
    this.stats = stat.map((p) => statPerks[p]);
    const selected = data.perkIds.filter((p) => !stat.includes(p));
    const runes = runeTrees.map((t) => t.slots.map((r) => [...r.values()])).flat(2);
    this.selected = selected.map((p) => runes.find((v) => v.id === p)!);
  }
}
