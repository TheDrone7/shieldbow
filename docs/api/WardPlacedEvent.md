---
title: WardPlacedEvent
description: A representation of the Ward Placed event.
---

## WardPlacedEvent class

A representation of the Ward Placed event.

**Signature:**

```ts
export declare class WardPlacedEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new WardPlacedEvent (data: WardPlacedEventData)
```

Constructs a new instance of the `WardPlacedEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [WardPlacedEventData](/api/WardPlacedEventData.md) | The raw data of the event. |
---

### Properties

#### creatorId

The ID of the participant who placed the ward.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'WARD_PLACED'

---

#### wardType

The type of the ward that was placed.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

