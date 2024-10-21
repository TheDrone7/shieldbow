import { IMatchParticipant } from 'types';

/**
 * Represents the damage stats of a participant in a match.
 */
export class ParticipantDamageDealt {
  /**
   * The total damage dealt to buildings.
   *
   * This includes turrets, inhibitors, and the nexus.
   */
  readonly toBuildings: number;
  /**
   * The total damage dealt to neutral objectives.
   *
   * This includes dragons, grubs, rift herald, and baron.
   */
  readonly toObjectives: number;
  /**
   * The total damage dealt to turrets only.
   */
  readonly toTurrets: number;
  /**
   * The total damage self-mitigated by the participant.
   */
  readonly selfMitigated: number;
  /**
   * Creates a new instance of ParticipantDamageDealt.
   * @param data - The raw match participant data.
   */
  constructor(data: IMatchParticipant) {
    this.toBuildings = data.damageDealtToBuildings;
    this.toObjectives = data.damageDealtToObjectives;
    this.toTurrets = data.damageDealtToTurrets;
    this.selfMitigated = data.damageSelfMitigated;
  }
}

/**
 * Represents the amount of damage of a specific type for a participant in a match.
 */
export class ParticipantDamage {
  /**
   * The total damage dealt.
   */
  readonly dealt: number;
  /**
   * The total damage dealt to champions.
   */
  readonly toChampions: number;
  /**
   * The total damage taken.
   */
  readonly taken: number;
  /**
   * Creates a new instance of ParticipantDamage.
   * @param data - The raw match participant data.
   */
  constructor(data: IMatchParticipant) {
    this.dealt = data.totalDamageDealt;
    this.toChampions = data.totalDamageDealtToChampions;
    this.taken = data.totalDamageTaken;
  }
}
