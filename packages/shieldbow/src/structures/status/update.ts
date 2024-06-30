import { Locale } from '@shieldbow/web';
import { IStatusUpdate, StatusPublishLocation } from 'types';

/**
 * Represents an update from RIOT regarding an incident or maintenance.
 */
export class StatusUpdate {
  /**
   * The unique ID of the status update.
   */
  readonly id: number;
  /**
   * The author of the status update.
   */
  readonly author: string;
  /**
   * Whether the status update has been published.
   */
  readonly published: boolean;
  /**
   * The locations the status update has been published to.
   */
  readonly publishedTo: StatusPublishLocation[];
  /**
   * The translations of the contents status update in various locales.
   */
  readonly translations: Record<Locale, string>;
  /**
   * The date the status update was created.
   */
  readonly createdAt: Date;
  /**
   * The date the status update was last updated.
   */
  readonly updatedAt: Date;

  /**
   * Creates a new status update.
   * @param data - The data for the status update.
   */
  constructor(data: IStatusUpdate) {
    this.id = data.id;
    this.author = data.author;
    this.published = data.publish;
    this.publishedTo = data.publish_locations;
    this.translations = Object.fromEntries(data.translations.map((t) => [t.locale, t.content])) as Record<
      Locale,
      string
    >;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }
}
