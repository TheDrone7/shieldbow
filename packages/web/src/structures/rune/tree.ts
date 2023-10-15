import { Collection } from '@discordjs/collection';
import { Rune } from './rune';
import { IDDragonRuneTree } from 'types';
import { Client } from 'client';

/**
 * Represents a Rune Tree in League of Legends.
 */
export class RuneTree {
  /**
   * The ID of the rune tree.
   */
  readonly id: number;
  /**
   * The key of the rune tree.
   */
  readonly key: string;
  /**
   * The name of the rune tree.
   */
  readonly name: string;
  /**
   * The icon of the rune tree.
   */
  readonly icon: string;
  /**
   * The keystones of the rune tree.
   */
  readonly keystones: Rune[];
  /**
   * The (other, non-keystone) runes of the rune tree.
   *
   * The first row is runes.get(1), the second row is runes.get(2), and the third row is runes.get(3).
   */
  readonly runes: Collection<1 | 2 | 3, Rune[]>;

  /**
   * Creates a new Rune Tree.
   * @param client - The client.
   * @param data - The raw data from Data Dragon.
   */
  constructor(client: Client, data: IDDragonRuneTree) {
    this.id = data.id;
    this.key = data.key;
    this.name = data.name;
    this.icon = client.generateUrl('img/' + data.icon, 'dDragon', true);
    this.keystones = data.slots[0].runes.map((r) => new Rune(client, r));
    this.runes = new Collection();
    for (let i = 1; i < data.slots.length; i++)
      this.runes.set(
        i as 1 | 2 | 3,
        data.slots[i].runes.map((r) => new Rune(client, r))
      );
  }
}
