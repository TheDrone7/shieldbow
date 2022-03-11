export interface RuneData {
  id: number;
  key: string;
  icon: string;
  name: string;
  shortDesc: string;
  longDesc: string;
}

export interface RuneTreeData {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: { runes: RuneData[] }[];
}
