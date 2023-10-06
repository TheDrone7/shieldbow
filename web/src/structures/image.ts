import { Client } from 'client';
import { IImage } from 'types';

/**
 * Represents an image from the Data Dragon CDN.
 */
export class Image {
  /**
   * The URL of the full image.
   */
  readonly fullUrl: string;
  /**
   * The URL of the spritesheet that contains this image.
   */
  readonly spriteUrl: string;
  /**
   * The position of the image in the spritesheet.
   */
  readonly position: { x: number; y: number };
  /**
   * The size of the image in the spritesheet.
   */
  readonly size: { width: number; height: number };
  constructor(client: Client, data: IImage) {
    this.fullUrl = client.generateUrl(`img/${data.group}/${data.full}`);
    this.spriteUrl = client.generateUrl(`img/sprite/${data.sprite}`);
    this.position = { x: data.x, y: data.y };
    this.size = { width: data.w, height: data.h };
  }
}
