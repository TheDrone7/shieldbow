export interface TeamBanData {
  championId: number;
  pickTurn: number;
}

export interface TeamObjectiveData {
  first: boolean;
  kills: number;
}

export interface TeamObjectivesData {
  baron: TeamObjectiveData;
  champion: TeamObjectiveData;
  dragon: TeamObjectiveData;
  inhibitor: TeamObjectiveData;
  riftHerald: TeamObjectiveData;
  tower: TeamObjectiveData;
}

export interface TeamData {
  bans: TeamBanData[];
  objectives: TeamObjectivesData;
  teamId: number;
  win: boolean;
}
