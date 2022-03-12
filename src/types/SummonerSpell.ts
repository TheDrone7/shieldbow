import type { ImageData } from './index';

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
