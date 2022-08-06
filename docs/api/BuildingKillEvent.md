---
title: BuildingKillEvent
description: A representation of the building kill event.
---

## BuildingKillEvent class

A representation of the building kill event.

**Signature:**

```ts
export declare class BuildingKillEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new BuildingKillEvent (data: BuildingKillEventData)
```

Constructs a new instance of the `BuildingKillEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [BuildingKillEventData](/api/BuildingKillEventData.md) |  |
---

### Properties

#### assistingParticipantIds

The IDs of the participants that assisted in destroying the building.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[]

---

#### bounty

The bounty earned by destroying the building.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### buildingType

The type of the building.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### killerId

The ID of the participant that destroyed the building.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### laneType

The lane where the building was destroyed.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### position

The position at which the building was destroyed.



**Type**: [Position](/api/Position.md)

---

#### teamId

The ID of the team that destroyed the building.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### towerType

The type of the tower that was destroyed (if it was a tower).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### type

The type of the event.



**Type**: 'BUILDING_KILL'

---

