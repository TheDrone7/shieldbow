/**
 * The sprite coordinate data of a champion.
 */
export interface SpriteCoordinate {
  /**
   * The position of a champion icon in a sprite in reference to the x-axis.
   */
  x: number;
  /**
   * The position of a champion icon in a sprite in reference to the y-axis.
   */
  y: number;
}

/**
 * The sprite size data of a champion.
 */
export interface SpriteSize {
  /**
   * The width of a champion icon in a sprite using the unit of pixels.
   */
  w: number;
  /**
   * The height of a champion icon in a sprite using the unit of pixels.
   */
  h: number;
}

/**
 * The sprite data of a champion.
 */
export interface ChampionSprite {
  /**
   * A URL to the sprite sheet that contains the champion icon.
   */
  image: string;
  /**
   * The sprite coordinate data of a champion.
   */
  coordinate: SpriteCoordinate;
  /**
   * The sprite size data of a champion.
   */
  size: SpriteSize;
}
