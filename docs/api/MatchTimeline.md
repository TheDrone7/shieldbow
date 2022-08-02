---
title: MatchTimeline
description: A representation of the timeline data for a match.
---

## MatchTimeline class

A representation of the timeline data for a match.

**Signature:**

```ts
export declare class MatchTimeline 
```

---

### Constructor

```ts
new MatchTimeline (data: MatchTimelineData)
```

Constructs a new instance of the `MatchTimeline` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [MatchTimelineData](/api/MatchTimelineData.md) | the raw timeline data from the API. |
---

### Properties

#### dataVersion

The version of the timeline data.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### frameInterval

The interval between frames.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### matchId

The ID of the match.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### participantIds

The IDs of the participants in the match.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

