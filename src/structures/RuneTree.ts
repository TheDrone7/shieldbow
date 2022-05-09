import Collection from '@discordjs/collection';
import { Rune } from './Rune';
import type { Client } from '../client';
import type { RuneTreeData } from '../types';

/**
 * A representation of an in-game rune tree
 */
export class RuneTree {
  /**
   * The unique numerical ID of this Rune Tree.
   */
  id: number;
  /**
   * The key of this rune tree. Usually the same as the rune's name.
   */
  key: string;
  /**
   * A link to the rune tree's icon.
   */
  icon: string;
  /**
   * The name of this rune tree.
   */
  name: string;
  /**
   * The slots of this rune tree.
   * The slots are numbered from 1 to 4.
   * The first slot contains the keystones.
   */
  slots: Collection<number, Collection<number, Rune>>;

  constructor(client: Client, data: RuneTreeData) {
    this.id = data.id;
    this.key = data.key;
    this.icon = client.cdnBase + 'img/' + data.icon;
    this.name = data.name;
    this.slots = new Collection<number, Collection<number, Rune>>();
    this.slots.set(1, new Collection<number, Rune>());
    this.slots.set(2, new Collection<number, Rune>());
    this.slots.set(3, new Collection<number, Rune>());
    this.slots.set(4, new Collection<number, Rune>());
    data.slots.map((rTree, i) => rTree.runes.map((r, j) => this.slots.get(i + 1)?.set(j + 1, new Rune(client, r))));
  }
}
