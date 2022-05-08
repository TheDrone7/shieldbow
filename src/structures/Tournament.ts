import type { TournamentData } from '../types';
import { TournamentSchedule } from './TournamentSchedule';

/**
 * A class representing a clash tournament.
 */
export class Tournament {
  /**
   * The ID of the tournament.
   */
  readonly id: number;
  /**
   * The ID of the theme of the tournament.
   */
  readonly themeId: number;
  /**
   * The name (title) of the tournament.
   */
  readonly title: string;
  /**
   * The description (day) of the tournament.
   */
  readonly subtitle: string;
  /**
   * The tournament's schedule.
   */
  readonly schedule: TournamentSchedule[];

  constructor(data: TournamentData) {
    this.id = data.id;
    this.themeId = data.themeId;
    this.title = data.nameKey;
    this.subtitle = data.nameKeySecondary;
    this.schedule = data.schedule.map((s) => new TournamentSchedule(s));
  }
}
