export interface TimelineEventData {
  timestamp: number;
  type: string;
}

export interface PositionData {
  x: number;
  y: number;
}

export interface DamageDealtData {
  basic: boolean;
  magicDamage: number;
  name: string;
  participantId: number;
  physicalDamage: number;
  spellName: string;
  spellSlot: number;
  trueDamage: number;
  type: 'OTHER' | 'TOWER' | 'MINION';
}

export interface PauseEndEventData extends TimelineEventData {
  realTimestamp: number;
  type: 'PAUSE_END';
}

export interface SkillLevelUpEventData extends TimelineEventData {
  levelUpType: 'NORMAL';
  participantId: number;
  skillSlot: number;
  type: 'SKILL_LEVEL_UP';
}

export interface ItemPurchasedEventData extends TimelineEventData {
  itemId: number;
  participantId: number;
  type: 'ITEM_PURCHASED';
}

export interface ItemUndoEventData extends TimelineEventData {
  afterId: number;
  beforeId: number;
  goldGain: number;
  participantId: number;
  type: 'ITEM_UNDO';
}

export interface WardPlacedEventData extends TimelineEventData {
  creatorId: number;
  wardType: string;
  type: 'WARD_PLACED';
}

export interface ItemDestroyedEventData extends TimelineEventData {
  itemId: number;
  participantId: number;
  type: 'ITEM_DESTROYED';
}

export interface LevelUpEventData extends TimelineEventData {
  participantId: number;
  level: number;
  type: 'LEVEL_UP';
}

export interface ChampionKillEventData extends TimelineEventData {
  assistingParticipantIds?: number[];
  bountyLevel: number;
  killStreakLength: number;
  killerId: number;
  position: PositionData;
  victimDamageDealt: DamageDealtData[];
  victimDamageReceived: DamageDealtData[];
  victimId: number;
  shutdownBounty: number;
  type: 'CHAMPION_KILL';
}

export interface ChampionSpecialKillEventData extends TimelineEventData {
  killType: string;
  killerId: number;
  position: PositionData;
  type: 'CHAMPION_SPECIAL_KILL';
}

export interface TurretPlateDestroyedEventData extends TimelineEventData {
  killerId: number;
  laneType: string;
  position: PositionData;
  teamId: number;
  type: 'TURRET_PLATE_DESTROYED';
}

export interface EliteMonsterKillEventData extends TimelineEventData {
  assistingParticipantIds: number[];
  bounty: number;
  killerId: number;
  killerTeamId: number;
  monsterType: string;
  monsterSubType: string;
  position: PositionData;
  type: 'ELITE_MONSTER_KILL';
}

export interface ItemSoldEventData extends TimelineEventData {
  itemId: number;
  participantId: number;
  type: 'ITEM_SOLD';
}

export interface ObjectiveBountyPrestartEventData extends TimelineEventData {
  actualStartTime: number;
  teamId: number;
  type: 'OBJECTIVE_BOUNTY_PRESTART';
}

export interface BuildingKillEventData extends TimelineEventData {
  bounty: number;
  buildingType: string;
  killerId: number;
  laneType: string;
  position: PositionData;
  teamId: number;
  towerType?: string;
  type: 'BUILDING_KILL';
}

export interface WardKillEventData extends TimelineEventData {
  killerId: number;
  wardType: string;
  type: 'WARD_KILL';
}

export interface GameEndEventData extends TimelineEventData {
  gameId: number;
  realTimestamp: number;
  type: 'GAME_END';
  winningTeam: 100 | 200;
}
