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
  into: string[];
  image: IImage;
  gold: IDDragonItemGold;
  tags: string[];
  maps: {
    [id: string]: boolean;
  };
  stats: {
    [id: string]: number;
  };
}
