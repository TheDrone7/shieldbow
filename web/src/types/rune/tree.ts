import { IDDragonRune } from './rune';

export interface IDDragonRuneTreeSlot {
  runes: IDDragonRune[];
}

export interface IDDragonRuneTree {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: IDDragonRuneTreeSlot[];
}
