import { Locale } from '@shieldbow/web';
import { IPlatform } from 'types';
import { IncidentStatus } from './status';

/**
 * Represents the current state of a platform.
 */
export class PlatformData {
  /**
   * The ID of the platform (e.g. 'NA1').
   */
  readonly id: string;
  /**
   * The full name of the platform (e.g. 'North America').
   */
  readonly name: string;
  /**
   * The locales supported by the platform.
   */
  readonly locales: Locale[];
  /**
   * The maintenances for the platform.
   */
  readonly maintenances: IncidentStatus[];
  /**
   * The incidents for the platform.
   */
  readonly incidents: IncidentStatus[];

  /**
   * Creates a new platform data object.
   * @param data - The data for the platform.
   */
  constructor(data: IPlatform) {
    this.id = data.id;
    this.name = data.name;
    this.locales = data.locales;
    this.maintenances = data.maintenances.map((m) => new IncidentStatus(m));
    this.incidents = data.incidents.map((i) => new IncidentStatus(i));
  }
}
