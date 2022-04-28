import type { Client } from '../client';
import type { CurrentGamePerksData, StatPerk } from '../types';
import type { Rune } from './Rune';
import type { RuneTree } from './RuneTree';

import { statPerks } from '../util';

export class CurrentGamePerks {
  readonly selected: Rune[];
  readonly stats: StatPerk[];
  readonly primaryTree: RuneTree;
  readonly secondaryTree: RuneTree;
  constructor(client: Client, data: CurrentGamePerksData) {
    this.primaryTree = client.runes.cache.find((r) => r.id === data.perkStyle)!;
    this.secondaryTree = client.runes.cache.find((r) => r.id === data.perkSubStyle)!;
    const stat = data.perkIds.filter((p) => Object.keys(statPerks).includes(p.toString()));
    this.stats = stat.map((p) => statPerks[p]);
    const selected = data.perkIds.filter((p) => !stat.includes(p));
    this.selected = selected.map((p) => client.runes.cachedRunes.find((v) => v.id === p)!);
  }
}
