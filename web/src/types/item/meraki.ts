/**
 * MerakiAnalaytics Item Stat object
 */
export interface IMerakiItemStat {
  flat: number;
  percent: number;
  perLevel: number;
  percentPerLevel: number;
  percentBase: number;
  percentBonus: number;
}

/**
 * MerakiAnalytics Item stat names
 */
export type MerakiItemStatName =
  | 'ability_power'
  | 'armor'
  | 'armor_penetration'
  | 'attack_damage'
  | 'attack_speed'
  | 'cooldown_reduction'
  | 'critical_strike_chance'
  | 'gold_per_10'
  | 'heal_and_shield_power'
  | 'health'
  | 'health_regen'
  | 'lethality'
  | 'life_steal'
  | 'magic_penetration'
  | 'magic_resistance'
  | 'mana'
  | 'mana_regen'
  | 'movespeed'
  | 'omnivamp'
  | 'tenacity'
  | 'ability_haste';

/**
 * MerakiAnalytics Item stats object
 */
export type IMerakiItemStats = {
  [id in MerakiItemStatName]: IMerakiItemStat;
};

/**
 * MerakiAnalytics Item object (only relevant stats)
 */
export interface IMerakiItem {
  stats: IMerakiItemStats;
  [id: string]: unknown;
}
