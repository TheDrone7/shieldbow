/**
 * The raw data of a Clash tournament schedule.
 */
export interface IClashTournamentSchedule {
  id: number;
  registrationTime: number;
  startTime: number;
  cancelled: boolean;
}

/**
 * The raw data of a Clash tournament.
 */
export interface IClashTournament {
  id: number;
  themeId: number;
  nameKey: string;
  nameKeySecondary: string;
  schedule: IClashTournamentSchedule[];
}
