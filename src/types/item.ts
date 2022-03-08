import type { ImageData } from './index';

/**
 * A representation of the item data returned by Data Dragon.
 */
export default interface ItemData {
  name: string;
  description: string;
  plaintext: string;
  from?: string[];
  into?: string[];
  image: ImageData;
  gold: {
    base: number;
    purchasable: boolean;
    total: number;
    sell: number;
  };
  tags: string[];
  maps: {
    [key: string]: boolean;
  };
  stats: {
    [key: string]: number;
  };
  depth?: number;
}
