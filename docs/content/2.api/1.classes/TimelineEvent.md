---
title: TimelineEvent
description: A representation of an event in a match timeline.
---

# TimelineEvent class

---

A representation of an event in a match timeline.

**Signature:**

```ts
export declare class TimelineEvent 
```

---

### Constructor

```ts
new TimelineEvent (data: TimelineEventData)
```

Constructs a new instance of the `TimelineEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TimelineEventData](/api/interfaces/timelineeventdata) | The raw data of the event. |
---

### Properties

#### rawData

The raw data of this event - in case the event is not defined in the library.


If you ever encounter an event where you need to access this, please create a GitHub issue as well with the event type and the raw data at https://github.com/TheDrone7/shieldbow/issues.



**Type**: any

---

#### timestamp

The timestamp (in milliseconds) of the event since the start of the game.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of event.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

