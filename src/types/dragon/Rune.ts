/**
 * The runes data as stored in data dragon.
 */
export interface RuneData {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

/**
 * The rune trees data as stored in data dragon.
 */
export interface RuneTreeData {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: { runes: RuneData[] }[];
}
