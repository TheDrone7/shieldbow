---
title: TimelineFrame
description: A representation of a frame in a match timeline.
---

# TimelineFrame class

---

A representation of a frame in a match timeline.

**Signature:**

```ts
export declare class TimelineFrame 
```

---

### Constructor

```ts
new TimelineFrame (data: MatchTimelineFrameData, items: Collection<string, Item>)
```

Constructs a new instance of the `TimelineFrame` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [MatchTimelineFrameData](/api/interfaces/matchtimelineframedata) | The raw data from the API. |
| items | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/classes/item) \> | A collection of all items in the game. |
---

### Properties

#### events

The events that took place in this frame.



**Type**: [TimelineEvent](/api/classes/timelineevent)[]

---

#### participantFrames

The participant frames for this timeline frame.



**Type**: [ParticipantFrame](/api/classes/participantframe)[]

---

