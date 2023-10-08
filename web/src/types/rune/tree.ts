import { IDDragonRune } from './rune';

/**
 * Data Dragon Rune Tree Slot interface.
 */
export interface IDDragonRuneTreeSlot {
  runes: IDDragonRune[];
}

/**
 * Data Dragon Rune Tree interface.
 */
export interface IDDragonRuneTree {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: IDDragonRuneTreeSlot[];
}
