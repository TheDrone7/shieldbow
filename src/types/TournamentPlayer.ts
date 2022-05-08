export interface TournamentPlayerData {
  summonerId: string;
  position: 'UNSELECTED' | 'FILL' | 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';
  role: 'CAPTAIN' | 'MEMBER';
}

export interface TournamentPlayerFullData extends TournamentPlayerData {
  teamId: string;
}
