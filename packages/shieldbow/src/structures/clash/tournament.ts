import { IClashTournament } from 'types';
import { ClashSchedule } from './schedule';

/**
 * Represents a clash tournament.
 */
export class ClashTournament {
  /**
   * The ID of the tournament.
   */
  readonly id: number;
  /**
   * The theme ID of the tournament.
   */
  readonly themeId: number;
  /**
   * The key of the tournament name.
   */
  readonly nameKey: string;
  /**
   * The secondary key of the tournament name.
   */
  readonly nameKeySecondary: string;
  /**
   * The schedules of the tournament.
   */
  readonly schedules: ClashSchedule[];

  /**
   * Creates a new instance of the ClashTournament class.
   * @param data - The raw data of the tournament from the API.
   */
  constructor(data: IClashTournament) {
    this.id = data.id;
    this.themeId = data.themeId;
    this.nameKey = data.nameKey;
    this.nameKeySecondary = data.nameKeySecondary;
    this.schedules = data.schedule.map((schedule) => new ClashSchedule(schedule));
  }
}
