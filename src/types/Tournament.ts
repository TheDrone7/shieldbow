/**
 * The clash tournament schedule data as returned by the API.
 */
export interface TournamentScheduleData {
  id: number;
  registrationTime: number;
  startTime: number;
  cancelled: boolean;
}

/**
 * The clash tournament data as returned by the API.
 */
export interface TournamentData {
  id: number;
  themeId: number;
  nameKey: string;
  nameKeySecondary: string;
  schedule: TournamentScheduleData[];
}
