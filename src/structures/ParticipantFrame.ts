import type { ParticipantChampionStatsData, ParticipantFrameData, ParticipantDamageStatsData } from '../types';
import { Position } from './Position';

/**
 * A representation of the participant's champion stats in a {@link ParticipantFrame}.
 */
export class ParticipantFrameChampionStats {
  /**
   * The amount of ability haste the participant has.
   *
   * This scales linearly.
   */
  readonly abilityHaste: number;
  /**
   * The amount of ability power the participant has.
   */
  readonly abilityPower: number;
  /**
   * The amount of armor the participant has.
   */
  readonly armor: number;
  /**
   * The amount of flat armor penetration the participant has.
   *
   * Also called "lethality" in the game.
   */
  readonly armorPen: number;
  /**
   * The amount of percent armor penetration the participant has.
   */
  readonly armorPenPercent: number;
  /**
   * The amount of attack damage the participant has.
   */
  readonly attackDamage: number;
  /**
   * The amount of attack speed the participant has.
   */
  readonly attackSpeed: number;
  /**
   * The amount of bonus percent armor penetration the participant has.
   */
  readonly bonusArmorPenPercent: number;
  /**
   * The amount of bonus percent magic penetration the participant has.
   */
  readonly bonusMagicPenPercent: number;
  /**
   * The amount of tenacity the participant has.
   */
  readonly tenacity: number;
  /**
   * The amount of cooldown reduction the participant has.
   *
   * This scales exponentially.
   */
  readonly cooldownReduction: number;
  /**
   * The amount of HP the participant currently has (current health).
   */
  readonly health: number;
  /**
   * The maximum amount of HP the participant can have (max HP).
   */
  readonly healthMax: number;
  /**
   * The amount of HP the participant recovers each second.
   */
  readonly healthRegen: number;
  /**
   * The amount of lifesteal the participant has.
   */
  readonly lifesteal: number;
  /**
   * The amount of flat magic penetration the participant has.
   */
  readonly magicPen: number;
  /**
   * The amount of percent magic penetration the participant has.
   */
  readonly magicPenPercent: number;
  /**
   * The amount of magic resist the participant has.
   */
  readonly magicResist: number;
  /**
   * The participant's movement speed.
   */
  readonly movementSpeed: number;
  /**
   * The amount of omnivamp the participant has.
   */
  readonly omnivamp: number;
  /**
   * The amount of physical vamp the participant has.
   */
  readonly physicalVamp: number;
  /**
   * The amount of power the participant currently has.
   *
   * Power refers to mostly mana or energy.
   */
  readonly power: number;
  /**
   * The max amount of power the participant can have.
   *
   * Power refers to mostly mana or energy.
   */
  readonly powerMax: number;
  /**
   * The amount of power the participant regenerates each second.
   *
   * Power refers to mostly mana or energy.
   */
  readonly powerRegen: number;
  /**
   * The amount of spell vamp the participant has.
   */
  readonly spellVamp: number;

  /**
   * Create a new participant frame champion stats instance.
   * @param data - The raw data from the API.
   */
  constructor(data: ParticipantChampionStatsData) {
    this.abilityHaste = data.abilityHaste;
    this.abilityPower = data.abilityPower;
    this.armor = data.armor;
    this.armorPen = data.armorPen;
    this.armorPenPercent = data.armorPenPercent;
    this.attackDamage = data.attackDamage;
    this.attackSpeed = data.attackSpeed;
    this.bonusArmorPenPercent = data.bonusArmorPenPercent;
    this.bonusMagicPenPercent = data.bonusMagicPenPercent;
    this.tenacity = data.ccReduction;
    this.cooldownReduction = data.cooldownReduction;
    this.health = data.health;
    this.healthMax = data.healthMax;
    this.healthRegen = data.healthRegen;
    this.lifesteal = data.lifesteal;
    this.magicPen = data.magicPen;
    this.magicPenPercent = data.magicPenPercent;
    this.magicResist = data.magicResist;
    this.movementSpeed = data.movementSpeed;
    this.omnivamp = data.omnivamp;
    this.physicalVamp = data.physicalVamp;
    this.power = data.power;
    this.powerMax = data.powerMax;
    this.powerRegen = data.powerRegen;
    this.spellVamp = data.spellVamp;
  }
}

/**
 * A representation of the participant's damage stats in a {@link ParticipantFrame}.
 */
export class ParticipantFrameDamageStats {
  /**
   * The total amount of magic damage the participant dealt.
   */
  readonly magicDamageDealt: number;
  /**
   * The total amount of magic damage the participant dealt to enemy champions.
   */
  readonly magicDamageDealtToChampions: number;
  /**
   * The total amount of magic damage the participant took from the enemy.
   */
  readonly magicDamageTaken: number;
  /**
   * The total amount of physical damage the participant dealt.
   */
  readonly physicalDamageDealt: number;
  /**
   * The total amount of physical damage the participant dealt to enemy champions.
   */
  readonly physicalDamageDealtToChampions: number;
  /**
   * The total amount of physical damage the participant took from the enemy.
   */
  readonly physicalDamageTaken: number;
  /**
   * The total amount of true damage the participant dealt.
   */
  readonly trueDamageDealt: number;
  /**
   * The total amount of true damage the participant dealt to enemy champions.
   */
  readonly trueDamageDealtToChampions: number;
  /**
   * The total amount of true damage the participant took from the enemy.
   */
  readonly trueDamageTaken: number;
  /**
   * The total amount of damage the participant dealt.
   */
  readonly totalDamageDealt: number;
  /**
   * The total amount of damage the participant dealt to enemy champions.
   */
  readonly totalDamageDealtToChampions: number;
  /**
   * The total amount of damage the participant took from the enemy.
   */
  readonly totalDamageTaken: number;

  /**
   * Create a new participant frame damage stats instance.
   * @param data - The raw data from the API.
   */
  constructor(data: ParticipantDamageStatsData) {
    this.magicDamageDealt = data.magicDamageDone;
    this.magicDamageDealtToChampions = data.magicDamageDoneToChampions;
    this.magicDamageTaken = data.magicDamageTaken;
    this.physicalDamageDealt = data.physicalDamageDone;
    this.physicalDamageDealtToChampions = data.physicalDamageDoneToChampions;
    this.physicalDamageTaken = data.physicalDamageTaken;
    this.trueDamageDealt = data.trueDamageDone;
    this.trueDamageDealtToChampions = data.trueDamageDoneToChampions;
    this.trueDamageTaken = data.trueDamageTaken;
    this.totalDamageDealt = data.totalDamageDone;
    this.totalDamageDealtToChampions = data.totalDamageDoneToChampions;
    this.totalDamageTaken = data.totalDamageTaken;
  }
}

/**
 * A representation of a participant's stats at a point in the timeline.
 */
export class ParticipantFrame {
  /**
   * The participant's champion stats.
   */
  readonly championStats: ParticipantFrameChampionStats;
  /**
   * The amount of gold the participant currently has.
   */
  readonly currentGold: number;
  /**
   * The participant's damage stats.
   */
  readonly damageStats: ParticipantFrameDamageStats;
  /**
   * The amount of gold that this participant is getting each second.
   */
  readonly goldPerSecond: number;
  /**
   * The creep score this participant has accumulated by killing jungle monsters.
   */
  readonly jungleMinionsKilled: number;
  /**
   * The participant's champion's level.
   */
  readonly level: number;
  /**
   * The number of lane minions killed by this participant.
   */
  readonly minionsKilled: number;
  /**
   * The total creep score of this participant.
   */
  readonly cs: number;
  /**
   * The participant ID.
   */
  readonly id: number;
  /**
   * The position of this participant on the map.
   */
  readonly position: Position;
  /**
   * The participant's crowd control score.
   */
  readonly timeEnemySpentControlled: number;
  /**
   * The total amount of gold the participant has earned so far.
   */
  readonly totalGold: number;
  /**
   * The amount of XP the participant has accumulated so far.
   */
  readonly xp: number;

  /**
   * Create a new participant frame instance.
   * @param data - The raw data from the API.
   */
  constructor(data: ParticipantFrameData) {
    this.championStats = new ParticipantFrameChampionStats(data.championStats);
    this.currentGold = data.currentGold;
    this.damageStats = new ParticipantFrameDamageStats(data.damageStats);
    this.goldPerSecond = data.goldPerSecond;
    this.jungleMinionsKilled = data.jungleMinionsKilled;
    this.level = data.level;
    this.minionsKilled = data.minionsKilled;
    this.cs = data.minionsKilled + data.jungleMinionsKilled;
    this.id = data.participantId;
    this.position = new Position(data.position);
    this.timeEnemySpentControlled = data.timeEnemySpentControlled;
    this.totalGold = data.totalGold;
    this.xp = data.xp;
  }
}
