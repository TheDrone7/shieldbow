import type { ParticipantFrameData } from './ParticipantFrame';
import type { TimelineEventData } from './TimelineEvent';

/**
 * The match timeline metadata as returned by the API.
 */
export interface MatchTimelineMetadata {
  dataVersion: string;
  matchId: string;
  participants: string[];
}

/**
 * The match timeline frame as returned by the API.
 */
export interface MatchTimelineFrameData {
  events: TimelineEventData[];
  participantFrames: { [id: `${number}`]: ParticipantFrameData };
}

/**
 * The match timeline details as returned by the API.
 */
export interface MatchTimelineInfo {
  frameInterval: number;
  frames: MatchTimelineFrameData[];
}

/**
 * The match timeline data as returned by the API.
 */
export interface MatchTimelineData {
  metadata: MatchTimelineMetadata;
  info: MatchTimelineInfo;
}
