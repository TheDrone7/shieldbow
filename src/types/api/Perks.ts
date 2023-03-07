/**
 * The perks data for a match participant as returned by the API.
 */
export interface PerksData {
  statPerks: {
    defense: number;
    flex: number;
    offense: number;
  };
  styles: {
    description: string;
    selections: {
      perk: number;
      var1: number;
      var2: number;
      var3: number;
    }[];
    style: number;
  }[];
}

/**
 * The stat perks data for a match participant as returned by the API.
 */
export interface StatPerk {
  id: number;
  name: string;
  description: string;
}
