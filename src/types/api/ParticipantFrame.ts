import type { PositionData } from './TimelineEvent';

/**
 * The participant champion stats as returned by the API.
 */
export interface ParticipantChampionStatsData {
  abilityHaste: number;
  abilityPower: number;
  armor: number;
  armorPen: number;
  armorPenPercent: number;
  attackDamage: number;
  attackSpeed: number;
  bonusArmorPenPercent: number;
  bonusMagicPenPercent: number;
  ccReduction: number;
  cooldownReduction: number;
  health: number;
  healthMax: number;
  healthRegen: number;
  lifesteal: number;
  magicPen: number;
  magicPenPercent: number;
  magicResist: number;
  movementSpeed: number;
  omnivamp: number;
  physicalVamp: number;
  power: number;
  powerMax: number;
  powerRegen: number;
  spellVamp: number;
}

/**
 * The participant damage stats as returned by the API.
 */
export interface ParticipantDamageStatsData {
  magicDamageDone: number;
  magicDamageDoneToChampions: number;
  magicDamageTaken: number;
  physicalDamageDone: number;
  physicalDamageDoneToChampions: number;
  physicalDamageTaken: number;
  trueDamageDone: number;
  trueDamageDoneToChampions: number;
  trueDamageTaken: number;
  totalDamageDone: number;
  totalDamageDoneToChampions: number;
  totalDamageTaken: number;
}

/**
 * The Participant Frame as returned by the API.
 */
export interface ParticipantFrameData {
  championStats: ParticipantChampionStatsData;
  currentGold: number;
  damageStats: ParticipantDamageStatsData;
  goldPerSecond: number;
  jungleMinionsKilled: number;
  level: number;
  minionsKilled: number;
  participantId: number;
  position: PositionData;
  timeEnemySpentControlled: number;
  totalGold: number;
  xp: number;
}
