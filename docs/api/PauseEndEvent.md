---
title: PauseEndEvent
description: A representation of the Pause end event.   Takes place when a game pause ends or when the game first begins after the loading screen.
---

## PauseEndEvent class

A representation of the Pause end event.   Takes place when a game pause ends or when the game first begins after the loading screen.

**Signature:**

```ts
export declare class PauseEndEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new PauseEndEvent (data: PauseEndEventData)
```

Constructs a new instance of the `PauseEndEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [PauseEndEventData](/api/PauseEndEventData.md) | The raw data of the event. |
---

### Properties

#### realTime

The real time when the pause ended.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

#### realTimestamp

The real timestamp - the actual time when this pause ended.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event;



**Type**: 'PAUSE_END'

---

