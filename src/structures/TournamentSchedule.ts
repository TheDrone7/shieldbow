import type { TournamentScheduleData } from '../types';

/**
 * A representation of a clash tournament schedule.
 */
export class TournamentSchedule {
  /**
   * The ID of the tournament schedule.
   */
  readonly id: number;
  /**
   * The timestamp at which the registration begins.
   */
  readonly registrationTimestamp: number;
  /**
   * The timestamp at which the tournament begins.
   */
  readonly startTimestamp: number;
  /**
   * Whether the events as per this schedule have been cancelled.
   */
  readonly cancelled: boolean;

  constructor(data: TournamentScheduleData) {
    this.id = data.id;
    this.registrationTimestamp = data.registrationTime;
    this.startTimestamp = data.startTime;
    this.cancelled = data.cancelled;
  }

  /**
   * The time at which the registration begins.
   */
  get registrationTime() {
    return new Date(this.registrationTimestamp);
  }

  /**
   * The time at which the tournament begins.
   */
  get startTime() {
    return new Date(this.startTimestamp);
  }
}
