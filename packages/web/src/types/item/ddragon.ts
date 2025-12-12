import { IImage } from '..';

/**
 * DDragon Item's Gold value
 */
export interface IDDragonItemGold {
  base: number;
  purchasable: boolean;
  sell: number;
  total: number;
}

/**
 * DDragon Item's map availability
 */
export type IDDragonItemMap = {
  [id: string]: boolean;
};

/**
 * DDragon Item's stats
 */
export interface IDDragonItemStats {
  FlatArmorMod?: number;
  FlatCritChanceMod?: number;
  FlatHPPoolMod?: number;
  FlatHPRegenMod?: number;
  FlatMagicDamageMod?: number;
  FlatMovementSpeedMod?: number;
  FlatMPPoolMod?: number;
  FlatPhysicalDamageMod?: number;
  FlatSpellBlockMod?: number;
  PercentAttackSpeedMod?: number;
  PercentLifeStealMod?: number;
  PercentMovementSpeedMod?: number;
}

/**
 * DDragon Item's effects.
 */
export interface IDDragonItemEffect {
  Effect10Amount?: string;
  Effect11Amount?: string;
  Effect12Amount?: string;
  Effect13Amount?: string;
  Effect14Amount?: string;
  Effect15Amount?: string;
  Effect1Amount: string;
  Effect2Amount?: string;
  Effect3Amount?: string;
  Effect4Amount?: string;
  Effect5Amount?: string;
  Effect6Amount?: string;
  Effect7Amount?: string;
  Effect8Amount?: string;
  Effect9Amount?: string;
}

/**
 * DDragon Item
 */
export interface IDDragonItem {
  colloq: string;
  consumed?: boolean;
  consumeOnFull?: boolean;
  depth?: number;
  description: string;
  effect?: IDDragonItemEffect;
  from?: string[];
  gold: IDDragonItemGold;
  hideFromAll?: boolean;
  image: IImage;
  inStore?: boolean;
  into?: string[];
  maps: IDDragonItemMap;
  name: string;
  plaintext: string;
  requiredChampion?: string;
  specialRecipe?: number;
  stacks?: number;
  stats: IDDragonItemStats;
  tags: string[];
}
