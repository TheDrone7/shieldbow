import { IImage } from '..';

/**
 * DDragon Item's Gold value
 */
export interface IDDragonItemGold {
  base: number;
  purchasable: boolean;
  total: number;
  sell: number;
}

/**
 * DDragon Item
 */
export interface IDDragonItem {
  name: string;
  description: string;
  colloq: string;
  plaintext: string;
  image: IImage;
  gold: IDDragonItemGold;
  tags: string[];
  maps: {
    [id: string]: boolean;
  };
  stats: {
    [id: string]: number;
  };
  consumed?: boolean;
  stacks?: number;
  depth?: number;
  consumeOnFull?: boolean;
  into?: string[];
  from?: string[];
  specialRecipe?: number;
  inStore?: boolean;
  hideFromAll?: boolean;
  requiredChampion?: string;
  requiredAlly?: string;
}
