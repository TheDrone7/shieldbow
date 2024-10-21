/**
 * The position assigned to a player in a Clash team.
 */
export type ClashPlayerPosition = 'UNSELECTED' | 'FILL' | 'TOP' | 'JUNGLE' | 'MIDDLE' | 'BOTTOM' | 'UTILITY';
/**
 * The role of a player in a Clash team.
 */
export type ClashPlayerRole = 'CAPTAIN' | 'MEMBER';

/**
 * The raw data of a player in a Clash tournament.
 */
export interface IClashPlayer {
  summonerId: string;
  teamId: string;
  position: ClashPlayerPosition;
  role: ClashPlayerRole;
}
