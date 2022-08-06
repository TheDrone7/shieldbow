import type { MatchTimelineData } from '../types';
import { TimelineFrame } from './TimelineFrame';
import type { Client } from '../client';

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
   * The returned frames in the match timeline.
   */
  readonly frames: TimelineFrame[];

  /**
   * Creates a new match timeline instance.
   *
   * @param client - The client that initialized the timeline.
   * @param data - The raw timeline data from the API.
   */
  constructor(client: Client, data: MatchTimelineData) {
    this.dataVersion = data.metadata.dataVersion;
    this.matchId = data.metadata.matchId;
    this.participantIds = data.metadata.participants;
    this.frameInterval = data.info.frameInterval;
    this.frames = data.info.frames.map((frame) => new TimelineFrame(client, frame));
  }
}
