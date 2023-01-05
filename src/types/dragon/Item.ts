import type { ImageData } from '../index';

/**
 * A representation of the item data returned by Data Dragon.
 */
export interface ItemData {
  name: string;
  plaintext: string;
  description: string;
  consumed?: boolean;
  consumeOnFull?: boolean;
  stacks?: number;
  from?: string[];
  into?: string[];
  specialRecipe?: number;
  inStore?: boolean;
  hideFromAll?: boolean;
  requiredChampion?: string;
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
