import { IClashTournamentSchedule } from 'types';

/**
 * Represents a schedule for a clash tournament.
 */
export class ClashSchedule {
  /**
   * The ID of the schedule.
   */
  readonly id: number;
  /**
   * The timestamp when registration opens.
   */
  readonly registrationTimestamp: number;
  /**
   * The timestamp when the tournament starts.
   */
  readonly startTimestamp: number;
  /**
   * Whether the tournament is cancelled.
   */
  readonly isCancelled: boolean;

  /**
   * Creates a new instance of the ClashSchedule class.
   * @param data - The raw data of the schedule from the API.
   */
  constructor(data: IClashTournamentSchedule) {
    this.id = data.id;
    this.registrationTimestamp = data.registrationTime;
    this.startTimestamp = data.startTime;
    this.isCancelled = data.cancelled;
  }

  /**
   * The time when registration opens.
   */
  get registrationTime() {
    return new Date(this.registrationTimestamp);
  }

  /**
   * The time when the tournament starts.
   */
  get startTime() {
    return new Date(this.startTimestamp);
  }

  /**
   * Whether the tournament registration is over.
   */
  get hasRegistrationClosed() {
    return Date.now() > this.registrationTimestamp;
  }

  /**
   * Whether the tournament has started.
   */
  get hasStarted() {
    return Date.now() > this.startTimestamp && !this.isCancelled;
  }
}
