import { IMatchParticipant } from 'types';

/**
 * Represents the vision-related statistics of a match participant.
 */
export class ParticipantVision {
  /**
   * The vision score of the participant.
   *
   * This is a composite score that represents the participant's vision control.
   * It factors the number of wards placed, wards killed, and other vision-related actions.
   */
  readonly score: number;
  /**
   * The number of vision wards bought in the game (control wards).
   */
  readonly visionWardsBought: number;
  /**
   * The number of sight wards bought in the game (yellow trinkets).
   */
  readonly sightWardsBought: number;
  /**
   * The number of control wards placed by the participant on the map.
   */
  readonly detectorWardsPlaced: number;
  /**
   * The number of wards killed/destroyed by the participant.
   */
  readonly wardsKilled: number;
  /**
   * The number of wards (yellow or blue trinkets) placed by the participant.
   */
  readonly wardsPlaced: number;

  /**
   * Creates a new instance of the ParticipantVision class.
   * @param data - The raw match participant data from the API.
   */
  constructor(data: IMatchParticipant) {
    this.score = data.visionScore;
    this.visionWardsBought = data.visionWardsBoughtInGame;
    this.sightWardsBought = data.sightWardsBoughtInGame;
    this.detectorWardsPlaced = data.detectorWardsPlaced;
    this.wardsKilled = data.wardsKilled;
    this.wardsPlaced = data.wardsPlaced;
  }
}
