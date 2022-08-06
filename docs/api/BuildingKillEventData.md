---
title: BuildingKillEventData
description: The event data for building kill event.
---

## BuildingKillEventData interface

The event data for building kill event.

**Signature:**

```ts
export interface BuildingKillEventData extends TimelineEventData 
```

**References:** [TimelineEventData](/api/TimelineEventData.md)

### Properties

#### assistingParticipantIds



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[]

---

#### bounty



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### buildingType



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### killerId



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### laneType



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### position



**Type**: [PositionData](/api/PositionData.md)

---

#### teamId



**Type**: 100 \| 200

---

#### towerType



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### type



**Type**: 'BUILDING_KILL'

---

