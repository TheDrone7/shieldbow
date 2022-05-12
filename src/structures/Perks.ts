import type { PerksData, StatPerk } from '../types';
import { statPerks } from '../util';
import type { Client } from '../client';
import type { RuneTree } from './RuneTree';
import type { Rune } from './Rune';

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
   * @param client - The client requesting this data.
   * @param data - The raw perk style data from the API.
   */
  constructor(
    client: Client,
    data: {
      description: string;
      selections: { perk: number; var1: number; var2: number; var3: number }[];
      style: number;
    }
  ) {
    this.tree = client.runes.cache.find((t) => t.id === data.style)!;
    this.selected = data.selections.map((s) => client.runes.cachedRunes.find((r) => r.id === s.perk)!);
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
   * @param client - The client requesting this data.
   * @param data - The raw perks data from the API.
   */
  constructor(client: Client, data: PerksData) {
    this.stats = {
      flex: statPerks[data.statPerks.flex],
      offense: statPerks[data.statPerks.flex],
      defense: statPerks[data.statPerks.defense]
    };
    this.primaryStyle = new PerkStyle(client, data.styles.find((p) => p.description === 'primaryStyle')!);
    this.secondaryStyle = new PerkStyle(client, data.styles.find((p) => p.description === 'subStyle')!);
  }
}
