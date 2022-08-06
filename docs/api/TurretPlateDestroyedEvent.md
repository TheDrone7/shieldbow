---
title: TurretPlateDestroyedEvent
description: A representation of the Turret place destroyed event.
---

## TurretPlateDestroyedEvent class

A representation of the Turret place destroyed event.

**Signature:**

```ts
export declare class TurretPlateDestroyedEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new TurretPlateDestroyedEvent (data: TurretPlateDestroyedEventData)
```

Constructs a new instance of the `TurretPlateDestroyedEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TurretPlateDestroyedEventData](/api/TurretPlateDestroyedEventData.md) |  |
---

### Properties

#### killerId

The ID of the participant that destroyed the turret plating.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### laneType

The lane of the turret plating that was destroyed.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### position

The position at which the turret plating was destroyed.



**Type**: [Position](/api/Position.md)

---

#### team

The team that destroyed the turret plating.



**Type**: "red" \| "blue"

---

#### teamId

The ID of the team that destroyed the turret plating.



**Type**: 100 \| 200

---

#### type

The type of the event.



**Type**: 'TURRET_PLATE_DESTROYED'

---

