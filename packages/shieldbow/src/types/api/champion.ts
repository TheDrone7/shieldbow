/**
 * The raw champion rotation data received from the Riot API.
 */
export interface IChampionRotation {
  maxNewPlayerLevel: number;
  freeChampionIdsForNewPlayers: number[];
  freeChampionIds: number[];
}
