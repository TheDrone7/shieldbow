import type { ParticipantChampionStatsData, ParticipantFrameData } from '../types';
import { Position } from './Position';

export class ParticipantChampionStats {
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
  readonly health: number;
  readonly healthMax: number;
  readonly healthRegen: number;
  readonly lifesteal: number;
  readonly magicPen: number;
  readonly magicPenPercent: number;
  readonly magicResist: number;
  readonly movementSpeed: number;
  readonly omnivamp: number;
  readonly physicalVamp: number;
  readonly power: number;
  readonly powerMax: number;
  readonly powerRegen: number;
  readonly spellVamp: number;

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

export class ParticipantDamageStats {}

export class ParticipantFrame {
  readonly championStats: ParticipantChampionStats;
  readonly currentGold: number;
  readonly damageStats: ParticipantDamageStats;
  readonly goldPerSecond: number;
  readonly jungleMinionsKilled: number;
  readonly level: number;
  readonly minionsKilled: number;
  readonly id: number;
  readonly position: Position;
  readonly timeEnemySpentControlled: number;
  readonly totalGold: number;
  readonly xp: number;

  constructor(data: ParticipantFrameData) {
    this.championStats = new ParticipantChampionStats(data.championStats);
    this.currentGold = data.currentGold;
    this.damageStats = new ParticipantDamageStats();
    this.goldPerSecond = data.goldPerSecond;
    this.jungleMinionsKilled = data.jungleMinionsKilled;
    this.level = data.level;
    this.minionsKilled = data.minionsKilled;
    this.id = data.participantId;
    this.position = new Position(data.position);
    this.timeEnemySpentControlled = data.timeEnemySpentControlled;
    this.totalGold = data.totalGold;
    this.xp = data.xp;
  }
}
