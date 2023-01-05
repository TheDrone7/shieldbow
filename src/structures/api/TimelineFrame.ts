import { ParticipantFrame } from './ParticipantFrame';
import type { MatchTimelineFrameData } from '../../types';
import { type TimelineEvent, TimelineEventFactory } from './TimelineEvent';
import type { Collection } from '@discordjs/collection';
import type { Item } from '../dragon/Item';

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
   * @param data - The raw data from the API.
   * @param items - A collection of all items in the game.
   */
  constructor(data: MatchTimelineFrameData, items: Collection<string, Item>) {
    this.events = data.events.map((event) => TimelineEventFactory.create(event, items));
    this.participantFrames = Object.values(data.participantFrames).map((frame) => new ParticipantFrame(frame));
  }
}
