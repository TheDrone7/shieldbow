/**
 * Basic data of seasons of the game.
 */
export interface Season {
  /**
   * The ID that refers to this season.
   */
  id: number;
  /**
   * The displayed name for the season.
   */
  season: string;
}

/**
 * Basic data for types of queues (matches) in the game.
 */
export interface Queue {
  /**
   * The ID that refers to this type of queue.
   */
  queueId: number;
  /**
   * The name of the map being used for this type of queue.
   */
  map: string;
  /**
   * A textual description for this type of queue.
   */
  description: string;
  /**
   * Additional notes about the queue.
   */
  notes: string | undefined;
}

/**
 * Basic data for types of Maps available in the game.
 */
export interface GameMap {
  /**
   * The ID that refers to this map.
   */
  mapId: number;
  /**
   * The name of this map.
   */
  mapName: string;
  /**
   * Additional notes about the map.
   */
  notes: string;
  /**
   * A link to the minimap image.
   */
}

/**
 * Basic data for types of game modes.
 */
export interface GameMode {
  /**
   * The name of the game mode.
   */
  gameMode: string;
  /**
   * A textual description of the game mode.
   */
  description: string;
}

/**
 * Basic data for types of games.
 */
export interface GameType {
  /**
   * The name of this type of game.
   */
  gametype: string;
  /**
   * A short description about the game type.
   */
  description: string;
}
