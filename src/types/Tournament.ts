export interface TournamentScheduleData {
  id: number;
  registrationTime: number;
  startTime: number;
  cancelled: boolean;
}

export interface TournamentData {
  id: number;
  themeId: number;
  nameKey: string;
  nameKeySecondary: string;
  schedule: TournamentScheduleData[];
}
