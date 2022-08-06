import { ParticipantFrame } from './ParticipantFrame';
import type { MatchTimelineFrameData } from '../types';
import { type TimelineEvent, TimelineEventFactory } from './TimelineEvent';
import type { Client } from '../client';

/**
 * A representation of a frame in a match timeline.
 */
export class TimelineFrame {
  /**
   * The events that took place in this frame.
   */
  readonly events: TimelineEvent[];
  /**
   * The participant frames for this timeline frame.
   */
  readonly participantFrames: ParticipantFrame[];

  /**
   * Create a new timeline frame.
   * @param client - The client that created this frame.
   * @param data - The raw data from the API.
   */
  constructor(client: Client, data: MatchTimelineFrameData) {
    this.events = data.events.map((event) => TimelineEventFactory.create(client, event));
    this.participantFrames = Object.values(data.participantFrames).map((frame) => new ParticipantFrame(frame));
  }
}
