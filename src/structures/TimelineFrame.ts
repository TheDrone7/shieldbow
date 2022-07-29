export class TimelineFrame {
  readonly events: any[];
  readonly participantFrames: any[];

  constructor(data: any) {
    this.events = data.events;
    this.participantFrames = data.participantFrames;
  }
}
