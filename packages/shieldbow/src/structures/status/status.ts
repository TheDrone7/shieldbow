import { Locale } from '@shieldbow/web';
import { IncidentSeverity, IStatus, MaintenanceStatus, StatusPlatform } from 'types';
import { StatusUpdate } from './update';

/**
 * Represents an incident or maintenance status.
 */
export class IncidentStatus {
  /**
   * The unique ID of the incident.
   */
  readonly id: number;
  /**
   * The status of the incident.
   */
  readonly status: MaintenanceStatus;
  /**
   * The severity of the incident.
   */
  readonly severity: IncidentSeverity;
  /**
   * The titles of the incident in various locales.
   */
  readonly titles: Record<Locale, string>;
  /**
   * The updates for the incident.
   */
  readonly updates: StatusUpdate[];
  /**
   * The date the incident was created.
   */
  readonly createdAt: Date;
  /**
   * The date the incident was last updated.
   */
  readonly updatedAt: Date;
  /**
   * The date the incident was archived.
   */
  readonly archiveAt: Date;
  /**
   * The platforms affected by the incident.
   */
  readonly platforms: StatusPlatform[];

  /**
   * Creates a new incident status.
   * @param data - The data for the incident status.
   */
  constructor(data: IStatus) {
    this.id = data.id;
    this.status = data.maintenance_status;
    this.severity = data.incident_severity;
    this.titles = Object.fromEntries(data.titles.map((t) => [t.locale, t.content])) as Record<Locale, string>;
    this.updates = data.updates.map((u) => new StatusUpdate(u));
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
    this.archiveAt = new Date(data.archive_at);
    this.platforms = data.platforms;
  }
}
