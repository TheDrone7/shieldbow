import { ParticipantFrame } from './ParticipantFrame';
import type { MatchTimelineFrameData } from '../types';
import { type TimelineEvent, TimelineEventFactory } from './TimelineEvent';
import type { Client } from '../client';

export class TimelineFrame {
  readonly events: TimelineEvent[];
  readonly participantFrames: ParticipantFrame[];

  constructor(client: Client, data: MatchTimelineFrameData) {
    this.events = data.events.map((event) => TimelineEventFactory.create(client, event));
    this.participantFrames = Object.values(data.participantFrames).map((frame) => new ParticipantFrame(frame));
  }
}
