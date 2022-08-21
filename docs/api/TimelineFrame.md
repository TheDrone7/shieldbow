---
title: TimelineFrame
description: A representation of a frame in a match timeline.
---

## TimelineFrame class

A representation of a frame in a match timeline.

**Signature:**

```ts
export declare class TimelineFrame 
```

---

### Constructor

```ts
new TimelineFrame (client: Client, data: MatchTimelineFrameData)
```

Constructs a new instance of the `TimelineFrame` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that created this frame. |
| data | [MatchTimelineFrameData](/api/MatchTimelineFrameData.md) | The raw data from the API. |
---

### Properties

#### events

The events that took place in this frame.



**Type**: [TimelineEvent](/api/TimelineEvent.md)[]

---

#### participantFrames

The participant frames for this timeline frame.



**Type**: [ParticipantFrame](/api/ParticipantFrame.md)[]

---

