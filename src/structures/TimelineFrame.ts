import { ParticipantFrame } from './ParticipantFrame';
import type { MatchTimelineFrameData } from '../types';

export class TimelineFrame {
  readonly events: any[];
  readonly participantFrames: ParticipantFrame[];

  constructor(data: MatchTimelineFrameData) {
    this.events = data.events;
    this.participantFrames = Object.values(data.participantFrames).map((frame) => new ParticipantFrame(frame));
  }
}
