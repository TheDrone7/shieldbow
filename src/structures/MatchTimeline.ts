import type { MatchTimelineData } from '../types';

/**
 * A representation of the timeline data for a match.
 */
export class MatchTimeline {
  /**
   * The version of the timeline data.
   */
  readonly dataVersion: string;
  /**
   * The ID of the match.
   */
  readonly matchId: string;
  /**
   * The interval between frames.
   */
  readonly frameInterval: number;
  /**
   * The IDs of the participants in the match.
   */
  readonly participantIds: string[];

  /**
   * Creates a new match timeline instance.
   *
   * @param data - the raw timeline data from the API.
   */
  constructor(data: MatchTimelineData) {
    this.dataVersion = data.metadata.dataVersion;
    this.matchId = data.metadata.matchId;
    this.participantIds = data.metadata.participants;
    this.frameInterval = data.info.frameInterval;
  }
}
