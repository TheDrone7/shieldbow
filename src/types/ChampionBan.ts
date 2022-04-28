export interface TeamBanData {
  championId: number;
  pickTurn: number;
}

export interface CurrentGameBanData extends TeamBanData {
  teamId: number;
}
