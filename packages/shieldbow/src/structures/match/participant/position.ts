import { IMatchParticipant } from 'types';

/**
 * The position of the participant in the match.
 */
export class ParticipantPosition {
  /**
   * The detected *lane* of the participant.
   */
  readonly lane: string;
  /**
   * The detected *role* of the participant.
   */
  readonly role: string;
  /**
   * The detected *individual* position of the participant.
   */
  readonly individualPosition: string;
  /**
   * The detected *team* position of the participant.
   */
  readonly teamPosition: string;

  /**
   * Creates a new instance of the ParticipantPosition class.
   * @param data - The raw match participant data from the API.
   */
  constructor(data: IMatchParticipant) {
    this.lane = data.lane;
    this.role = data.role;
    this.individualPosition = data.individualPosition;
    this.teamPosition = data.teamPosition;
  }
}
