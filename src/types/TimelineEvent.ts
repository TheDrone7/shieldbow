/**
 * The base of a match timeline event.
 */
export interface TimelineEventData {
  timestamp: number;
  type: string;
}

/**
 * A representation of an object's position on the map.
 */
export interface PositionData {
  x: number;
  y: number;
}

/**
 * The data of the damage dealt on a champion during their death on the map.
 */
export interface DamageDealtData {
  /**
   * Whether the damage was dealt by a basic attack.
   */
  basic: boolean;
  /**
   * The amount of magic damage dealt.
   */
  magicDamage: number;
  /**
   * The name of the source of the damage.
   */
  name: string;
  /**
   * The participant that dealt the damage.
   */
  participantId: number;
  /**
   * The amount of physical damage dealt.
   */
  physicalDamage: number;
  /**
   * The name of the spell that was used to deal the damage.
   */
  spellName: string;
  /**
   * The slot of the spell that was used to deal the damage.
   */
  spellSlot: number;
  /**
   * The amount of true damage dealt.
   */
  trueDamage: number;
  /**
   * The source of the damage.
   */
  type: 'OTHER' | 'TOWER' | 'MINION';
}

/**
 * The event data for the pause end event.
 */
export interface PauseEndEventData extends TimelineEventData {
  realTimestamp: number;
  type: 'PAUSE_END';
}

/**
 * The event data for the skill level up event.
 */
export interface SkillLevelUpEventData extends TimelineEventData {
  levelUpType: string;
  participantId: number;
  skillSlot: number;
  type: 'SKILL_LEVEL_UP';
}

/**
 * The event data for the item purchased event.
 */
export interface ItemPurchasedEventData extends TimelineEventData {
  itemId: number;
  participantId: number;
  type: 'ITEM_PURCHASED';
}

/**
 * The event data for the item undo event.
 */
export interface ItemUndoEventData extends TimelineEventData {
  afterId: number;
  beforeId: number;
  goldGain: number;
  participantId: number;
  type: 'ITEM_UNDO';
}

/**
 * The event data for the ward placed event.
 */
export interface WardPlacedEventData extends TimelineEventData {
  creatorId: number;
  wardType: string;
  type: 'WARD_PLACED';
}

/**
 * The event data for the item destroyed event.
 */
export interface ItemDestroyedEventData extends TimelineEventData {
  itemId: number;
  participantId: number;
  type: 'ITEM_DESTROYED';
}

/**
 * The event data for the champion level up event.
 */
export interface LevelUpEventData extends TimelineEventData {
  participantId: number;
  level: number;
  type: 'LEVEL_UP';
}

/**
 * The event data for the champion kill event.
 */
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

/**
 * The event data for the champion special kill event.
 */
export interface ChampionSpecialKillEventData extends TimelineEventData {
  killType: string;
  killerId: number;
  position: PositionData;
  type: 'CHAMPION_SPECIAL_KILL';
}

/**
 * The event data for the turret plate destroyed event.
 */
export interface TurretPlateDestroyedEventData extends TimelineEventData {
  killerId: number;
  laneType: string;
  position: PositionData;
  teamId: 100 | 200;
  type: 'TURRET_PLATE_DESTROYED';
}

/**
 * The event data for the elite monster kill event.
 */
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

/**
 * The event data for the item sold event.
 */
export interface ItemSoldEventData extends TimelineEventData {
  itemId: number;
  participantId: number;
  type: 'ITEM_SOLD';
}

/**
 * The event data for the objective bounty prestart event.
 */
export interface ObjectiveBountyPrestartEventData extends TimelineEventData {
  actualStartTime: number;
  teamId: 100 | 200;
  type: 'OBJECTIVE_BOUNTY_PRESTART';
}

/**
 * The event data for building kill event.
 */
export interface BuildingKillEventData extends TimelineEventData {
  assistingParticipantIds?: number[];
  bounty: number;
  buildingType: string;
  killerId: number;
  laneType: string;
  position: PositionData;
  teamId: 100 | 200;
  towerType?: string;
  type: 'BUILDING_KILL';
}

/**
 * The event data for the ward kill event.
 */
export interface WardKillEventData extends TimelineEventData {
  killerId: number;
  wardType: string;
  type: 'WARD_KILL';
}

/**
 * The event data for the dragon soul given event.
 */
export interface DragonSoulGivenEventData extends TimelineEventData {
  name: 'Mountain' | 'Ocean' | 'Infernal' | 'Hextech' | 'Cloud';
  teamId: 100 | 200;
  type: 'DRAGON_SOUL_GIVEN';
}

/**
 * The event data for the champion transform event.
 */
export interface ChampionTransformEventData extends TimelineEventData {
  participantId: number;
  transformType: 'ASSASSIN' | 'SLAYER';
  type: 'CHAMPION_TRANSFORM';
}

/**
 * The event data for the game end event.
 */
export interface GameEndEventData extends TimelineEventData {
  gameId: number;
  realTimestamp: number;
  type: 'GAME_END';
  winningTeam: 100 | 200;
}
