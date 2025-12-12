import type { IAugment } from 'types';
import type { Client } from 'client';

/**
 * A representation of an augment in the cherry (arena) game mode.
 */
export class Augment {
  /**
   * The numerical ID of this augment.
   */
  readonly id: number;
  /**
   * The string ID (api name) of this augment.
   */
  readonly key: string;
  /**
   * The name of this augment.
   */
  readonly name: string;
  /**
   * The description of this augment.
   */
  readonly description: string;
  /**
   * The raw tooltip of this augment.
   * This contains some HTML-like tags to help view this better on webpages.
   *
   * Even though, these are supposed to be more detailed than the {@link Augment.description}.
   * It is not recommended using either this OR {@link Augment.tooltip}.
   * This is because they contain placeholders without values to fill them with.
   * Use {@link Augment.description} instead.
   *
   * See {@link Augment.tooltip | tooltip} to view this with the HTML-like tags stripped out.
   */
  readonly rawTooltip: string;
  /**
   * The URL for image (small) of this augment.
   */
  readonly smallImageUrl: string;
  /**
   * The URL for image (large) of this augment.
   */
  readonly largeImageUrl: string;

  /**
   * The rarity of this augment.
   */
  readonly rarity: 'Silver' | 'Gold' | 'Prismatic';

  /**
   * Creates a new augment instance.
   * @param client - The client that requested this data.
   * @param data - The raw augment data from the API.
   */
  constructor(client: Client, data: IAugment) {
    client.logger?.trace(`Parsing augment data (id: ${data.id})`);
    this.id = data.id;
    this.name = data.name;
    this.key = data.apiName;
    this.description = data.desc;
    this.rawTooltip = data.tooltip;
    this.smallImageUrl = client.generateImageUrl(`game/${data.iconSmall}`, 'cDragon');
    this.largeImageUrl = client.generateImageUrl(`game/${data.iconLarge}`, 'cDragon');

    this.rarity = ['Silver', 'Gold', 'Prismatic'][data.rarity] as 'Silver' | 'Gold' | 'Prismatic';
  }

  /**
   * The tooltip of this augment.
   * This does not contain the HTML-like tags to help view this better on console and other output media.
   *
   * See {@link Augment.rawTooltip | rawTooltip} to view this with the HTML-like tags included.
   */
  get tooltip() {
    return this.rawTooltip
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }
}
