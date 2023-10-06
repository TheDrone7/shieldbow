export type StatName =
  | 'hp'
  | 'mp'
  | 'moveSpeed'
  | 'armor'
  | 'magicResist'
  | 'attackRange'
  | 'hpRegen'
  | 'mpRegen'
  | 'crit'
  | 'attackDamage'
  | 'attackSpeed';

export interface StatPerk {
  id: number;
  name: string;
  description: string;
}
