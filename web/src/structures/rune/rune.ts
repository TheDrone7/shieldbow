import { Client } from 'client';
import { IDDragonRune } from 'types';

/**
 * Represents a rune in league of legends.
 */
export class Rune {
  /**
   * The id of the rune.
   */
  readonly id: number;
  /**
   * The key of the rune.
   */
  readonly key: string;
  /**
   * The icon of the rune.
   */
  readonly icon: string;
  /**
   * The name of the rune.
   */
  readonly name: string;
  /**
   * The raw (HTML) short description of the rune.
   */
  readonly rawDescription: string;
  /**
   * The raw (HTML) long details of the rune.
   */
  readonly rawDetails: string;

  /**
   * Creates a new rune instance.
   * @param client - The client.
   * @param data - The raw data from data dragon.
   */
  constructor(client: Client, data: IDDragonRune) {
    this.id = data.id;
    this.key = data.key;
    this.icon = client.generateUrl('img/' + data.icon, 'dDragon', true);
    this.name = data.name;
    this.rawDescription = data.shortDesc;
    this.rawDetails = data.longDesc;
  }

  /**
   * The short description of the rune.
   */
  get description(): string {
    return this.rawDescription
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }

  /**
   * The long details of the rune.
   */
  get details(): string {
    return this.rawDetails
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }
}
