/**
 * The partial clash tournament player data as returned by the API.
 */
export interface TournamentPlayerData {
  summonerId: string;
  position: 'UNSELECTED' | 'FILL' | 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';
  role: 'CAPTAIN' | 'MEMBER';
}

/**
 * The complete clash tournament player data as returned by the API.
 */
export interface TournamentPlayerFullData extends TournamentPlayerData {
  teamId: string;
}
