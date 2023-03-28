import type { PerksData, StatPerk } from '../../types';
import { rawStatPerks } from '../../util';
import type { RuneTree, Rune } from '../dragon';
import type { Collection } from '@discordjs/collection';

/**
 * A representation of the stat perks selected by the summoner.
 */
export interface StatPerks {
  /**
   * The flex stat rune.
   */
  flex: StatPerk;
  /**
   * The offense stat rune.
   */
  offense: StatPerk;
  /**
   * The defense stat rune.
   */
  defense: StatPerk;
}

/**
 * A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected.
 */
export class PerkStyle {
  /**
   * The rune tree that this perk style is based on.
   */
  readonly tree: RuneTree;
  /**
   * The selected runes.
   */
  readonly selected: Rune[];

  /**
   * Creates a new perk style instance.
   * @param runeTrees - The collection of rune trees in the game.
   * @param data - The raw perk style data from the API.
   */
  constructor(
    runeTrees: Collection<string, RuneTree>,
    data: {
      description: string;
      selections: { perk: number; var1: number; var2: number; var3: number }[];
      style: number;
    }
  ) {
    this.tree = runeTrees.find((t) => t.id === data.style)!;
    const runes = runeTrees.map((t) => t.slots.map((r) => [...r.values()])).flat(2);
    this.selected = data.selections.map((s) => runes.find((r) => r.id === s.perk)!);
  }
}

/**
 * A representation of the perks (runes) selected by a summoner for a match.
 */
export class Perks {
  /**
   * The stat runes that were picked by the player.
   */
  readonly stats: StatPerks;
  /**
   * The primary perk style (keystone + primary runes).
   */
  readonly primaryStyle: PerkStyle;
  /**
   * The secondary perk style (secondary runes).
   */
  readonly secondaryStyle: PerkStyle;

  /**
   * Creates a new perks instance.
   * @param runeTrees - The collection of rune trees in the game.
   * @param data - The raw perks data from the API.
   */
  constructor(runeTrees: Collection<string, RuneTree>, data: PerksData) {
    this.stats = {
      flex: rawStatPerks[data.statPerks.flex],
      offense: rawStatPerks[data.statPerks.flex],
      defense: rawStatPerks[data.statPerks.defense]
    };
    this.primaryStyle = new PerkStyle(runeTrees, data.styles.find((p) => p.description === 'primaryStyle')!);
    this.secondaryStyle = new PerkStyle(runeTrees, data.styles.find((p) => p.description === 'subStyle')!);
  }
}
