import type {
  BuildingKillEventData,
  ChampionKillEventData,
  ChampionSpecialKillEventData,
  ChampionTransformEventData,
  DamageDealtData,
  DragonSoulGivenEventData,
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
} from '../../types';
import { Position } from '../Position';
import { Bounty } from './Bounty';
import type { Item } from '../dragon';
import type { Collection } from '@discordjs/collection';

/**
 * A representation of an event in a match timeline.
 */
export class TimelineEvent {
  /**
   * The timestamp (in milliseconds) of the event since the start of the game.
   */
  readonly timestamp: number;
  /**
   * The type of event.
   */
  readonly type: string;
  /**
   * The raw data of this event - in case the event is not defined in the library.
   *
   * If you ever encounter an event where you need to access this, please create a GitHub issue as well
   * with the event type and the raw data at https://github.com/TheDrone7/shieldbow/issues.
   */
  readonly rawData: any;

  /**
   * Create a new timeline event.
   * @param data - The raw data of the event.
   */
  constructor(data: TimelineEventData) {
    this.timestamp = data.timestamp;
    this.type = data.type;
    this.rawData = data;
  }
}

/**
 * A representation of the Pause end event.
 *
 * Takes place when a game pause ends or when the game first begins after the loading screen.
 */
export class PauseEndEvent extends TimelineEvent {
  /**
   * The type of the event;
   */
  readonly type: 'PAUSE_END';
  /**
   * The real timestamp - the actual time when this pause ended.
   */
  readonly realTimestamp: number;

  /**
   * Create a new pause end event.
   * @param data - The raw data of the event.
   */
  constructor(data: PauseEndEventData) {
    super(data);
    this.type = 'PAUSE_END';
    this.realTimestamp = data.realTimestamp;
  }

  /**
   * The real time when the pause ended.
   */
  get realTime(): Date {
    return new Date(this.realTimestamp);
  }
}

/**
 * A representation of the Skill Level Up event.
 */
export class SkillLevelUpEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'SKILL_LEVEL_UP';
  /**
   * The type of the level up - usually 'NORMAL'.
   */
  readonly levelUpType: string;
  /**
   * The participant ID of the participant who leveled up.
   */
  readonly participantId: number;
  /**
   * The skill slot that was leveled up - 1/2/3/4.
   */
  readonly skillSlot: number;

  /**
   * Create a new skill level up event.
   * @param data - The raw data of the event.
   */
  constructor(data: SkillLevelUpEventData) {
    super(data);
    this.type = 'SKILL_LEVEL_UP';
    this.levelUpType = data.levelUpType;
    this.participantId = data.participantId;
    this.skillSlot = data.skillSlot;
  }

  /**
   * The skill slot that was leveled up - Q/W/E/R.
   */
  get skillSlotLetter(): 'Q' | 'W' | 'E' | 'R' {
    const slots = ['Q', 'W', 'E', 'R'] as const;
    return slots[this.skillSlot - 1];
  }

  /**
   * Whether the leveled up skill was the ultimate skill of the champion.
   */
  get isUltimate(): boolean {
    return this.skillSlot === 4;
  }
}

/**
 * A representation of the Item Purchased event.
 */
export class ItemPurchasedEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'ITEM_PURCHASED';
  /**
   * The item that was purchased.
   */
  readonly item: Item;
  /**
   * The participant who purchased the item.
   */
  readonly participantId: number;

  /**
   * Create a new item purchased event.
   * @param data - The raw data of the event.
   * @param item - The item that was purchased.
   */
  constructor(data: ItemPurchasedEventData, item: Item) {
    super(data);
    this.type = 'ITEM_PURCHASED';
    this.item = item;
    this.participantId = data.participantId;
  }
}

/**
 * A representation of the Item Undo event.
 */
export class ItemUndoEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'ITEM_UNDO';
  /**
   * The item in the item slot after the undo (might be nothing).
   */
  readonly after?: Item;
  /**
   * The item in the item slot before the undo.
   */
  readonly before?: Item;
  /**
   * The amount of gold that was gained by the undo.
   */
  readonly goldGain: number;
  /**
   * The participant who undid the item.
   */
  readonly participantId: number;

  /**
   * Create a new item undo event.
   * @param data - The raw data of the event.
   * @param after - The item in the item slot after the undo (might be nothing).
   * @param before - The item in the item slot before the undo.
   */
  constructor(data: ItemUndoEventData, after?: Item, before?: Item) {
    super(data);
    this.type = 'ITEM_UNDO';
    this.after = after;
    this.before = before;
    this.goldGain = data.goldGain;
    this.participantId = data.participantId;
  }
}

/**
 * A representation of the Ward Placed event.
 */
export class WardPlacedEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'WARD_PLACED';
  /**
   * The ID of the participant who placed the ward.
   */
  readonly creatorId: number;
  /**
   * The type of the ward that was placed.
   */
  readonly wardType: string;

  /**
   * Create a new ward placed event.
   * @param data - The raw data of the event.
   */
  constructor(data: WardPlacedEventData) {
    super(data);
    this.type = 'WARD_PLACED';
    this.creatorId = data.creatorId;
    this.wardType = data.wardType;
  }
}

/**
 * A representation of the Item destroyed event.
 */
export class ItemDestroyedEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'ITEM_DESTROYED';
  /**
   * The destroyed item.
   */
  readonly item: Item;
  /**
   * The ID of the participant that destroyed the item.
   */
  readonly participantId: number;

  /**
   * Create a new item destroyed event.
   * @param data - The raw data of the event.
   * @param item - The destroyed item.
   */
  constructor(data: ItemDestroyedEventData, item: Item) {
    super(data);
    this.type = 'ITEM_DESTROYED';
    this.item = item;
    this.participantId = data.participantId;
  }
}

/**
 * A representation of the Level up event.
 */
export class LevelUpEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'LEVEL_UP';
  /**
   * The ID of the participant who leveled up.
   */
  readonly participantId: number;
  /**
   * The level the participant reached.
   */
  readonly level: number;

  /**
   * Create a new level up event.
   * @param data - The raw data of the event.
   */
  constructor(data: LevelUpEventData) {
    super(data);
    this.type = 'LEVEL_UP';
    this.participantId = data.participantId;
    this.level = data.level;
  }
}

/**
 * The representation of the Champion Kill event.
 */
export class ChampionKillEvent extends TimelineEvent {
  /**
   * The participants who assisted in the kill.
   */
  readonly assistingParticipantIds: number[];
  /**
   * The bounty achieved by the killer.
   */
  readonly bounty: Bounty;
  /**
   * The kill streak length of the killer.
   */
  readonly killStreakLength: number;
  /**
   * The ID of the participant who landed the killing blow.
   */
  readonly killerId: number;
  /**
   * The position at which the kill took place.
   */
  readonly position: Position;
  /**
   * The damage dealt by the victim.
   */
  readonly victimDamageDealt: DamageDealtData[];
  /**
   * The damage dealt to the victim.
   */
  readonly victimDamageReceived: DamageDealtData[];
  /**
   * The ID of the participant that died.
   */
  readonly victimId: number;
  /**
   * The bounty earned by the killer.
   */
  readonly shutdownBounty: number;
  /**
   * The type of the event.
   */
  readonly type: 'CHAMPION_KILL';

  /**
   * Create a new champion kill event.
   * @param data - The raw data of the event.
   */
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

/**
 * A representation of the Champion special kill event.
 */
export class ChampionSpecialKillEvent extends TimelineEvent {
  /**
   * The ID of the participant that performed the special kill.
   */
  readonly killerId: number;
  /**
   * The position at which the special kill took place.
   */
  readonly position: Position;
  /**
   * The type of the special kill.
   */
  readonly killType: string;
  /**
   * The type of the event.
   */
  readonly type: 'CHAMPION_SPECIAL_KILL';

  /**
   * Create a new champion special kill event.
   * @param data - The raw data of the event.
   */
  constructor(data: ChampionSpecialKillEventData) {
    super(data);
    this.type = 'CHAMPION_SPECIAL_KILL';
    this.killerId = data.killerId;
    this.killType = data.killType;
    this.position = new Position(data.position);
  }
}

/**
 * A representation of the Turret place destroyed event.
 */
export class TurretPlateDestroyedEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'TURRET_PLATE_DESTROYED';
  /**
   * The ID of the participant that destroyed the turret plating.
   */
  readonly killerId: number;
  /**
   * The position at which the turret plating was destroyed.
   */
  readonly position: Position;
  /**
   * The lane of the turret plating that was destroyed.
   */
  readonly laneType: string;
  /**
   * The ID of the team that destroyed the turret plating.
   */
  readonly teamId: 100 | 200;

  /**
   * Create a new turret plating destroyed event.
   * @param data - The raw data of the event.
   */
  constructor(data: TurretPlateDestroyedEventData) {
    super(data);
    this.type = 'TURRET_PLATE_DESTROYED';
    this.killerId = data.killerId;
    this.position = new Position(data.position);
    this.laneType = data.laneType;
    this.teamId = data.teamId;
  }

  /**
   * The team that destroyed the turret plating.
   */
  get team() {
    return this.teamId === 100 ? 'blue' : 'red';
  }
}

/**
 * A representation of the Elite monster kill event.
 */
export class EliteMonsterKillEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'ELITE_MONSTER_KILL';
  /**
   * The IDs of the participants that assisted in the kill.
   */
  readonly assistingParticipants: number[];
  /**
   * The amount of bounty earned by the killing team (objective bounty).
   */
  readonly bounty: number;
  /**
   * The ID of the participant that landed the killing blow.
   */
  readonly killerId: number;
  /**
   * The ID of the team that killed the monster.
   */
  readonly killerTeamId: number;
  /**
   * The position at which the monster was killed.
   */
  readonly position: Position;
  /**
   * The type of the monster that was killed.
   *
   * Eg: 'DRAGON', 'BARON NASHOR', etc.
   */
  readonly monsterType: string;
  /**
   * The subtype of the monster that was killed.
   *
   * Eg: 'OCEAN', 'CLOUD', etc.
   */
  readonly monsterSubType: string;

  /**
   * Create a new elite monster kill event.
   * @param data - The raw data of the event.
   */
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

/**
 * A representation of the item sold event.
 */
export class ItemSoldEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'ITEM_SOLD';
  /**
   * The item that was sold.
   */
  readonly item: Item;
  /**
   * The ID of the participant that sold the item.
   */
  readonly participantId: number;

  /**
   * Create a new item sold event.
   * @param data - The raw data of the event.
   * @param item - The item that was sold.
   */
  constructor(data: ItemSoldEventData, item: Item) {
    super(data);
    this.type = 'ITEM_SOLD';
    this.item = item;
    this.participantId = data.participantId;
  }
}

/**
 * A representation of the objective bounty prestart event.
 */
export class ObjectiveBountyPrestartEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'OBJECTIVE_BOUNTY_PRESTART';
  /**
   * The timestamp at which the objective bounty will actually start.
   */
  readonly actualStartTime: number;
  /**
   * The ID of the team that is going to get the objective bounty.
   */
  readonly teamId: number;

  /**
   * Create a new objective bounty prestart event.
   * @param data - The raw data of the event.
   */
  constructor(data: ObjectiveBountyPrestartEventData) {
    super(data);
    this.type = 'OBJECTIVE_BOUNTY_PRESTART';
    this.actualStartTime = data.actualStartTime;
    this.teamId = data.teamId;
  }
}

/**
 * A representation of the building kill event.
 */
export class BuildingKillEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'BUILDING_KILL';
  /**
   * The IDs of the participants that assisted in destroying the building.
   */
  readonly assistingParticipantIds: number[];
  /**
   * The bounty earned by destroying the building.
   */
  readonly bounty: number;
  /**
   * The type of the building.
   */
  readonly buildingType: string;
  /**
   * The ID of the participant that destroyed the building.
   */
  readonly killerId: number;
  /**
   * The lane where the building was destroyed.
   */
  readonly laneType: string;
  /**
   * The position at which the building was destroyed.
   */
  readonly position: Position;
  /**
   * The ID of the team that destroyed the building.
   */
  readonly teamId: number;
  /**
   * The type of the tower that was destroyed (if it was a tower).
   */
  readonly towerType?: string;

  /**
   * Create a new building kill event.
   * @param data - The raw data of the event.
   */
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

/**
 * A representation of the ward kill event.
 */
export class WardKillEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'WARD_KILL';
  /**
   * The type of the ward that was killed.
   */
  readonly wardType: string;
  /**
   * The ID of the participant that killed the ward.
   */
  readonly killerId: number;

  /**
   * Create a new ward kill event.
   * @param data - The raw data of the event.
   */
  constructor(data: WardKillEventData) {
    super(data);
    this.type = 'WARD_KILL';
    this.wardType = data.wardType;
    this.killerId = data.killerId;
  }
}

/**
 * A representation of the dragon soul given event.
 */
export class DragonSoulGivenEvent {
  /**
   * The type of the event.
   */
  readonly type: 'DRAGON_SOUL_GIVEN';
  /**
   * The name of the dragon soul that was earned.
   */
  readonly name: 'Mountain' | 'Ocean' | 'Infernal' | 'Hextech' | 'Cloud';
  /**
   * The ID of the team that received the dragon soul.
   */
  readonly teamId: 100 | 200;

  /**
   * Create a new dragon soul given event.
   * @param data - The raw data of the event.
   */
  constructor(data: DragonSoulGivenEventData) {
    this.type = 'DRAGON_SOUL_GIVEN';
    this.name = data.name;
    this.teamId = data.teamId;
  }

  /**
   * The team that received the dragon soul.
   */
  get team() {
    return this.teamId === 100 ? 'blue' : 'red';
  }
}

/**
 * A representation of the champion transform event.
 *
 * As of right now, this only applies to Kayn's transformations.
 */
export class ChampionTransformEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'CHAMPION_TRANSFORM';
  /**
   * The ID of the participant that transformed.
   */
  readonly participantId: number;
  /**
   * The new form that the participant took.
   */
  readonly transformType: 'ASSASSIN' | 'SLAYER';

  /**
   * Create a new champion transform event.
   * @param data - The raw data of the event.
   */
  constructor(data: ChampionTransformEventData) {
    super(data);
    this.type = 'CHAMPION_TRANSFORM';
    this.participantId = data.participantId;
    this.transformType = data.transformType;
  }
}

/**
 * A representation of the game end event.
 */
export class GameEndEvent extends TimelineEvent {
  /**
   * The type of the event.
   */
  readonly type: 'GAME_END';
  /**
   * The ID of the game.
   */
  readonly gameId: number;
  /**
   * The real world timestamp at which the game ended.
   */
  readonly realTimestamp: number;
  /**
   * The ID of the winning team.
   */
  readonly winningTeamId: 100 | 200;

  /**
   * Create a new game end event.
   * @param data - The raw data of the event.
   */
  constructor(data: GameEndEventData) {
    super(data);
    this.type = 'GAME_END';
    this.gameId = data.gameId;
    this.realTimestamp = data.realTimestamp;
    this.winningTeamId = data.winningTeam;
  }

  /**
   * The winning team.
   */
  get winningTeam() {
    return this.winningTeamId === 100 ? 'blue' : 'red';
  }

  /**
   * The real time at which the game ended.
   */
  get realTime() {
    return new Date(this.realTimestamp);
  }
}

/**
 * The timeline event factory - to create a timeline event from a raw data object.
 */
export class TimelineEventFactory {
  /**
   * Creates a timeline event from the given data.
   * @param data - The raw data.
   * @param items - A collection of all items.
   */
  static create(data: TimelineEventData, items: Collection<string, Item>): TimelineEvent {
    let details;
    switch (data.type) {
      case 'PAUSE_END':
        return new PauseEndEvent(data as PauseEndEventData);
      case 'SKILL_LEVEL_UP':
        return new SkillLevelUpEvent(data as SkillLevelUpEventData);
      case 'ITEM_PURCHASED':
        details = data as ItemPurchasedEventData;
        return new ItemPurchasedEvent(details, items.get(details.itemId.toString())!);
      case 'ITEM_UNDO':
        details = data as ItemUndoEventData;
        return new ItemUndoEvent(
          details,
          items.get(details.afterId.toString())!,
          items.get(details.beforeId.toString())!
        );
      case 'WARD_PLACED':
        return new WardPlacedEvent(data as WardPlacedEventData);
      case 'ITEM_DESTROYED':
        details = data as ItemDestroyedEventData;
        return new ItemDestroyedEvent(details, items.get(details.itemId.toString())!);
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
        details = data as ItemSoldEventData;
        return new ItemSoldEvent(details, items.get(details.itemId.toString())!);
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
