---
title: ParticipantFrame
description: A representation of a participant's stats at a point in the timeline.
---

## ParticipantFrame class

A representation of a participant's stats at a point in the timeline.

**Signature:**

```ts
export declare class ParticipantFrame 
```

---

### Constructor

```ts
new ParticipantFrame (data: ParticipantFrameData)
```

Constructs a new instance of the `ParticipantFrame` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ParticipantFrameData](/api/ParticipantFrameData.md) | The raw data from the API. |
---

### Properties

#### championStats

The participant's champion stats.



**Type**: [ParticipantFrameChampionStats](/api/ParticipantFrameChampionStats.md)

---

#### cs

The total creep score of this participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### currentGold

The amount of gold the participant currently has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### damageStats

The participant's damage stats.



**Type**: [ParticipantFrameDamageStats](/api/ParticipantFrameDamageStats.md)

---

#### goldPerSecond

The amount of gold that this participant is getting each second.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### id

The participant ID.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### jungleMinionsKilled

The creep score this participant has accumulated by killing jungle monsters.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### level

The participant's champion's level.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### minionsKilled

The number of lane minions killed by this participant.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### position

The position of this participant on the map.



**Type**: [Position](/api/Position.md)

---

#### timeEnemySpentControlled

The participant's crowd control score.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### totalGold

The total amount of gold the participant has earned so far.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### xp

The amount of XP the participant has accumulated so far.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

