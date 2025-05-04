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
  icon: string;
  id: number;
  key: string;
  name: string;
  slots: IDDragonRuneTreeSlot[];
}
