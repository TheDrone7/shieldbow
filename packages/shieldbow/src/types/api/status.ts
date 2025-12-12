import { Locale } from '@shieldbow/web';

/**
 * Valid platforms for status issues.
 */
export type StatusPlatform = 'windows' | 'macos' | 'android' | 'ios' | 'ps4' | 'xbone' | 'switch';
/**
 * Valid locations to publish status updates.
 */
export type StatusPublishLocation = 'riotclient' | 'riotstatus' | 'game';
/**
 * Valid maintenance statuses.
 */
export type MaintenanceStatus = 'scheduled' | 'in_progress' | 'complete';
/**
 * Valid incident severities.
 */
export type IncidentSeverity = 'info' | 'warning' | 'critical';

/**
 * Status content for a specific locale.
 */
export interface StatusContent {
  locale: Locale;
  content: string;
}

/**
 * The raw status update object from the API.
 */
export interface IStatusUpdate {
  id: number;
  author: string;
  publish: boolean;
  publish_locations: StatusPublishLocation[];
  translations: StatusContent[];
  created_at: string;
  updated_at: string;
}

/**
 * The raw status incident object from the API.
 */
export interface IStatus {
  id: number;
  maintenance_status: MaintenanceStatus;
  incident_severity: IncidentSeverity;
  titles: StatusContent[];
  updates: IStatusUpdate[];
  created_at: string;
  archive_at: string;
  updated_at: string;
  platforms: StatusPlatform[];
}

/**
 * The raw status platform object from the API.
 */
export interface IPlatform {
  id: string;
  name: string;
  locales: Locale[];
  maintenances: IStatus[];
  incidents: IStatus[];
}
