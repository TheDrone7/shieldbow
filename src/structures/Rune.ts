import type { Client } from '../client';
import type { RuneData } from '../types';

/**
 * A representation of an in-game rune.
 */
export class Rune {
  /**
   * The numerical unique ID of this rune.
   */
  readonly id: number;
  /**
   * The worded key for this rune.
   */
  readonly key: string;
  /**
   * The name of this rune.
   */
  readonly name: string;
  /**
   * A link to the rune's icon.
   */
  readonly icon: string;
  private readonly _rawDescription: string;
  private readonly _rawDetails: string;

  constructor(client: Client, data: RuneData) {
    this.id = data.id;
    this.key = data.key;
    this.name = data.name;
    this.icon = client.cdnBase + 'img/' + data.icon;
    this._rawDescription = data.shortDesc;
    this._rawDetails = data.longDesc;
  }

  /**
   * The raw description (short version) provided by Data Dragon.
   * This contains some HTML-like tags that help to display it on webpages.
   *
   * See {@link Rune.description | description} to view the description with all the HTML-like tags stripped out.
   */
  get rawDescription() {
    return this._rawDescription;
  }

  /**
   * The description (short version) of this rune provided by Data Dragon.
   * This does not contain the HTML-like tags to help view this better on console or other output media.
   *
   * See {@link Rune.rawDescription | rawDescription} to view the description with the HTML-like tags included.
   */
  get description() {
    return this.rawDescription
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }

  /**
   * The details (long version) about this rune provided by Data Dragon.
   * This contains some HTML-like tags that help to display it on webpages.
   *
   * See {@link Rune.details | details} to view the details with all the HTML-like tags stripped out.
   */
  get rawDetails() {
    return this._rawDetails;
  }

  /**
   * The details (long version) about this rune provided by Data Dragon.
   * This does not contain the HTML-like tags to help view this better on console or other output media.
   *
   * See {@link Rune.rawDetails | rawDetails} to view the details with all the HTML-like tags included.
   */
  get details() {
    return this.rawDetails
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }
}
