/**
 * The champion ban data as returned by the API.
 */
export interface TeamBanData {
  championId: number;
  pickTurn: number;
}

/**
 * The champion ban data as returned by the API.
 */
export interface CurrentGameBanData extends TeamBanData {
  teamId: number;
}
