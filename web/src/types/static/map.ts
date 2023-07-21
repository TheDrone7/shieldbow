/**
 * A representation of a game map (e.g. Summoner's Rift)
 */
export interface GameMap {
  /**
   * The ID of the map.
   */
  mapId: number;
  /**
   * The name of the map.
   */
  mapName: string;
  /**
   * Additional notes about the map.
   */
  notes: string;
}
