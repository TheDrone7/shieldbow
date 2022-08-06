---
title: WardKillEvent
description: A representation of the ward kill event.
---

## WardKillEvent class

A representation of the ward kill event.

**Signature:**

```ts
export declare class WardKillEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new WardKillEvent (data: WardKillEventData)
```

Constructs a new instance of the `WardKillEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [WardKillEventData](/api/WardKillEventData.md) |  |
---

### Properties

#### killerId

The ID of the participant that killed the ward.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'WARD_KILL'

---

#### wardType

The type of the ward that was killed.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

