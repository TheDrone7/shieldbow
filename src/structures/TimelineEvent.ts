import type {
  BuildingKillEventData,
  ChampionKillEventData,
  ChampionSpecialKillEventData,
  DamageDealtData,
  EliteMonsterKillEventData,
  GameEndEventData,
  ItemDestroyedEventData,
  ItemPurchasedEventData,
  ItemSoldEventData,
  ItemUndoEventData,
  LevelUpEventData,
  ObjectiveBountyPrestartEventData,
  PauseEndEventData,
  SkillLevelUpEventData,
  TimelineEventData,
  TurretPlateDestroyedEventData,
  WardKillEventData,
  WardPlacedEventData
} from '../types';
import { Position } from './Position';
import { Bounty } from './Bounty';
import type { Client } from '../client';
import type { Item } from './Item';

/**
 * A representation of an event in a match timeline.
 */
export class TimelineEvent {
  readonly timestamp: number;
  readonly type: string;
  readonly rawData: any;
  constructor(data: TimelineEventData) {
    this.timestamp = data.timestamp;
    this.type = data.type;
    this.rawData = data;
  }
}

export class PauseEndEvent extends TimelineEvent {
  readonly type: 'PAUSE_END';
  readonly realTimestamp: number;
  constructor(data: PauseEndEventData) {
    super(data);
    this.type = 'PAUSE_END';
    this.realTimestamp = data.realTimestamp;
  }

  get realTime(): Date {
    return new Date(this.realTimestamp);
  }
}

export class SkillLevelUpEvent extends TimelineEvent {
  readonly type: 'SKILL_LEVEL_UP';
  readonly levelUpType: string;
  readonly participantId: number;
  readonly skillSlot: number;

  constructor(data: SkillLevelUpEventData) {
    super(data);
    this.type = 'SKILL_LEVEL_UP';
    this.levelUpType = data.levelUpType;
    this.participantId = data.participantId;
    this.skillSlot = data.skillSlot;
  }

  get skillSlotLetter(): 'Q' | 'W' | 'E' | 'R' {
    const slots = ['Q', 'W', 'E', 'R'] as const;
    return slots[this.skillSlot - 1];
  }

  get isUltimate(): boolean {
    return this.skillSlot === 4;
  }
}

export class ItemPurchasedEvent extends TimelineEvent {
  readonly type: 'ITEM_PURCHASED';
  readonly item: Item;
  readonly participantId: number;

  constructor(client: Client, data: ItemPurchasedEventData) {
    super(data);
    this.type = 'ITEM_PURCHASED';
    this.item = client.items.cache.get(data.itemId.toString())!;
    this.participantId = data.participantId;
  }
}

export class ItemUndoEvent extends TimelineEvent {
  readonly type: 'ITEM_UNDO';
  readonly after: Item;
  readonly before: Item;
  readonly goldGain: number;
  readonly participantId: number;

  constructor(client: Client, data: ItemUndoEventData) {
    super(data);
    this.type = 'ITEM_UNDO';
    this.after = client.items.cache.get(data.afterId.toString())!;
    this.before = client.items.cache.get(data.beforeId.toString())!;
    this.goldGain = data.goldGain;
    this.participantId = data.participantId;
  }
}

export class WardPlacedEvent extends TimelineEvent {
  readonly type: 'WARD_PLACED';
  readonly creatorId: number;
  readonly wardType: string;

  constructor(data: WardPlacedEventData) {
    super(data);
    this.type = 'WARD_PLACED';
    this.creatorId = data.creatorId;
    this.wardType = data.wardType;
  }
}

export class ItemDestroyedEvent extends TimelineEvent {
  readonly type: 'ITEM_DESTROYED';
  readonly item: Item;
  readonly participantId: number;
  constructor(client: Client, data: ItemDestroyedEventData) {
    super(data);
    this.type = 'ITEM_DESTROYED';
    this.item = client.items.cache.get(data.itemId.toString())!;
    this.participantId = data.participantId;
  }
}

export class LevelUpEvent extends TimelineEvent {
  readonly type: 'LEVEL_UP';
  readonly participantId: number;
  readonly level: number;
  constructor(data: LevelUpEventData) {
    super(data);
    this.type = 'LEVEL_UP';
    this.participantId = data.participantId;
    this.level = data.level;
  }
}

export class ChampionKillEvent extends TimelineEvent {
  readonly assistingParticipantIds: number[];
  readonly bounty: Bounty;
  readonly killStreakLength: number;
  readonly killerId: number;
  readonly position: Position;
  readonly victimDamageDealt: DamageDealtData[];
  readonly victimDamageReceived: DamageDealtData[];
  readonly victimId: number;
  readonly shutdownBounty: number;
  readonly type: 'CHAMPION_KILL';

  constructor(data: ChampionKillEventData) {
    super(data);
    this.type = 'CHAMPION_KILL';
    this.killerId = data.killerId;
    this.victimId = data.victimId;
    this.assistingParticipantIds = data.assistingParticipantIds || [];
    this.bounty = new Bounty(data.bountyLevel);
    this.killStreakLength = data.killStreakLength;
    this.position = new Position(data.position);
    this.victimDamageDealt = data.victimDamageDealt || [];
    this.victimDamageReceived = data.victimDamageReceived || [];
    this.shutdownBounty = data.shutdownBounty;
  }
}

export class ChampionSpecialKillEvent extends TimelineEvent {
  readonly killerId: number;
  readonly position: Position;
  readonly killType: string;
  readonly type: 'CHAMPION_SPECIAL_KILL';
  constructor(data: ChampionSpecialKillEventData) {
    super(data);
    this.type = 'CHAMPION_SPECIAL_KILL';
    this.killerId = data.killerId;
    this.killType = data.killType;
    this.position = new Position(data.position);
  }
}

export class TurretPlateDestroyedEvent extends TimelineEvent {
  readonly type: 'TURRET_PLATE_DESTROYED';
  readonly killerId: number;
  readonly position: Position;
  readonly laneType: string;
  readonly teamId: number;
  constructor(data: TurretPlateDestroyedEventData) {
    super(data);
    this.type = 'TURRET_PLATE_DESTROYED';
    this.killerId = data.killerId;
    this.position = new Position(data.position);
    this.laneType = data.laneType;
    this.teamId = data.teamId;
  }

  get team() {
    return this.teamId === 100 ? 'blue' : 'red';
  }
}

export class EliteMonsterKillEvent extends TimelineEvent {
  readonly type: 'ELITE_MONSTER_KILL';
  readonly assistingParticipants: number[];
  readonly bounty: number;
  readonly killerId: number;
  readonly killerTeamId: number;
  readonly position: Position;
  readonly monsterType: string;
  readonly monsterSubType: string;
  constructor(data: EliteMonsterKillEventData) {
    super(data);
    this.type = 'ELITE_MONSTER_KILL';
    this.assistingParticipants = data.assistingParticipantIds;
    this.bounty = data.bounty;
    this.killerTeamId = data.killerTeamId;
    this.killerId = data.killerId;
    this.position = new Position(data.position);
    this.monsterType = data.monsterType;
    this.monsterSubType = data.monsterSubType;
  }
}

export class ItemSoldEvent extends TimelineEvent {
  readonly type: 'ITEM_SOLD';
  readonly item: Item;
  readonly participantId: number;
  constructor(client: Client, data: ItemSoldEventData) {
    super(data);
    this.type = 'ITEM_SOLD';
    this.item = client.items.cache.get(data.itemId.toString())!;
    this.participantId = data.participantId;
  }
}

export class ObjectiveBountyPrestartEvent extends TimelineEvent {
  readonly type: 'OBJECTIVE_BOUNTY_PRESTART';
  readonly actualStartTime: number;
  readonly teamId: number;
  constructor(data: ObjectiveBountyPrestartEventData) {
    super(data);
    this.type = 'OBJECTIVE_BOUNTY_PRESTART';
    this.actualStartTime = data.actualStartTime;
    this.teamId = data.teamId;
  }

  get actualStartAt() {
    return new Date(this.actualStartTime);
  }
}

export class BuildingKillEvent extends TimelineEvent {
  readonly type: 'BUILDING_KILL';
  readonly assistingParticipantIds: number[];
  readonly bounty: number;
  readonly buildingType: string;
  readonly killerId: number;
  readonly laneType: string;
  readonly position: Position;
  readonly teamId: number;
  readonly towerType?: string;
  constructor(data: BuildingKillEventData) {
    super(data);
    this.type = 'BUILDING_KILL';
    this.assistingParticipantIds = data.assistingParticipantIds || [];
    this.buildingType = data.buildingType;
    this.bounty = data.bounty;
    this.killerId = data.killerId;
    this.laneType = data.laneType;
    this.teamId = data.teamId;
    this.position = new Position(data.position);
    this.towerType = data.towerType;
  }
}

export class WardKillEvent extends TimelineEvent {
  readonly type: 'WARD_KILL';
  readonly wardType: string;
  readonly killerId: number;
  constructor(data: WardKillEventData) {
    super(data);
    this.type = 'WARD_KILL';
    this.wardType = data.wardType;
    this.killerId = data.killerId;
  }
}

export class GameEndEvent extends TimelineEvent {
  readonly type: 'GAME_END';
  readonly gameId: number;
  readonly realTimestamp: number;
  readonly winningTeamId: 100 | 200;
  constructor(data: GameEndEventData) {
    super(data);
    this.type = 'GAME_END';
    this.gameId = data.gameId;
    this.realTimestamp = data.realTimestamp;
    this.winningTeamId = data.winningTeam;
  }

  get winningTeam() {
    return this.winningTeamId === 100 ? 'blue' : 'red';
  }

  get realTime() {
    return new Date(this.realTimestamp);
  }
}

export class TimelineEventFactory {
  static create(client: Client, data: TimelineEventData): TimelineEvent {
    switch (data.type) {
      case 'PAUSE_END':
        return new PauseEndEvent(data as PauseEndEventData);
      case 'SKILL_LEVEL_UP':
        return new SkillLevelUpEvent(data as SkillLevelUpEventData);
      case 'ITEM_PURCHASED':
        return new ItemPurchasedEvent(client, data as ItemPurchasedEventData);
      case 'ITEM_UNDO':
        return new ItemUndoEvent(client, data as ItemUndoEventData);
      case 'WARD_PLACED':
        return new WardPlacedEvent(data as WardPlacedEventData);
      case 'ITEM_DESTROYED':
        return new ItemDestroyedEvent(client, data as ItemDestroyedEventData);
      case 'LEVEL_UP':
        return new LevelUpEvent(data as LevelUpEventData);
      case 'CHAMPION_KILL':
        return new ChampionKillEvent(data as ChampionKillEventData);
      case 'CHAMPION_SPECIAL_KILL':
        return new ChampionSpecialKillEvent(data as ChampionSpecialKillEventData);
      case 'TURRET_PLATE_DESTROYED':
        return new TurretPlateDestroyedEvent(data as TurretPlateDestroyedEventData);
      case 'ELITE_MONSTER_KILL':
        return new EliteMonsterKillEvent(data as EliteMonsterKillEventData);
      case 'ITEM_SOLD':
        return new ItemSoldEvent(client, data as ItemSoldEventData);
      case 'OBJECTIVE_BOUNTY_PRESTART':
        return new ObjectiveBountyPrestartEvent(data as ObjectiveBountyPrestartEventData);
      case 'BUILDING_KILL':
        return new BuildingKillEvent(data as BuildingKillEventData);
      case 'WARD_KILL':
        return new WardKillEvent(data as WardKillEventData);
      case 'GAME_END':
        return new GameEndEvent(data as GameEndEventData);
      default:
        return new TimelineEvent(data);
    }
  }
}
