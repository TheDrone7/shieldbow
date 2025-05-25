export type PingType =
  | 'allIn'
  | 'assistMe'
  | 'basic'
  | 'command'
  | 'danger'
  | 'enemyMissing'
  | 'enemyVision'
  | 'getBack'
  | 'hold'
  | 'needVision'
  | 'onMyWay'
  | 'push'
  | 'retreat'
  | 'visionCleared';

export type { IMatch, IMatchInfo, IMatchMetadata } from './match';
export type { IMatchParticipant } from './participant';
export type { IMatchTeam, IMatchTeamBan, IMatchTeamObjective, TeamObjective } from './team';
export type {
  IMatchParticipantPerkStyle,
  IMatchParticipantPerkStyleSelection,
  IMatchParticipantPerks,
  IMatchParticipantStatPerks
} from './perks';
