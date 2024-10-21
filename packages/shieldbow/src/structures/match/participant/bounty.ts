/**
 * A representation of the bounty on a match participant.
 */
export class ParticipantBounty {
  /**
   * The bounty level.
   */
  readonly level: number;
  /**
   * The amount of gold killing the participant will earn.
   *
   * The maximum amount that can be earned at once is 1000.
   * The rest is carried over when the participant respawns.
   */
  readonly killBounty: number;
  /**
   * The amount of gold assisting in killing the participant will earn.
   */
  readonly assistBounty: number;
  /**
   * The number of consecutive kills the participant has (to earn them this bounty).
   */
  readonly consecutiveKills: number;
  /**
   * The number of consecutive deaths the participant has (to earn them this bounty).
   */
  readonly consecutiveDeaths: number;
  /**
   * The announcement that is made when the participant kills an enemy.
   *
   * This is only available for bounty levels \> 2.
   */
  readonly announcement?: string;

  /**
   * Creates a new bounty instance.
   * @param level - the bounty level of the participant.
   */
  constructor(level: number) {
    this.level = level;
    this.killBounty = 300;
    this.assistBounty = 150;
    if (level < 0) {
      this.consecutiveKills = 0;
      this.consecutiveDeaths = -level;
    } else {
      this.consecutiveKills = level;
      this.consecutiveDeaths = 0;
    }
    if (level < -5) {
      this.killBounty = 100;
      this.assistBounty = 50;
    } else if (level > 7) {
      this.killBounty = 1000 + (level - 7) * 100;
      this.assistBounty = 150;
      this.announcement = 'Legendary';
    } else
      switch (level) {
        case -5:
          this.killBounty = 112;
          this.assistBounty = 56;
          break;
        case -4:
          this.killBounty = 140;
          this.assistBounty = 70;
          break;
        case -3:
          this.killBounty = 176;
          this.assistBounty = 88;
          break;
        case -2:
          this.killBounty = 220;
          this.assistBounty = 110;
          break;
        case -1:
          this.killBounty = 274;
          this.assistBounty = 137;
          break;
        case 2:
          this.killBounty = 450;
          break;
        case 3:
          this.killBounty = 600;
          this.announcement = 'Killing Spree';
          break;
        case 4:
          this.killBounty = 700;
          this.announcement = 'Rampage';
          break;
        case 5:
          this.killBounty = 800;
          this.announcement = 'Unstoppable';
          break;
        case 6:
          this.killBounty = 900;
          this.announcement = 'Dominating';
          break;
        case 7:
          this.killBounty = 1000;
          this.announcement = 'Godlike';
          break;
      }
  }
}
