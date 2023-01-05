import type { ImageData } from '../index';

/**
 * The summoner spell data as stored in data dragon.
 */
export interface SummonerSpellData {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  cooldownBurn: string;
  key: string;
  summonerLevel: number;
  modes: string[];
  maxammo: string;
  rangeBurn: string;
  image: ImageData;
}
