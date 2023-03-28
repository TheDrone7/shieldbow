---
title: EliteMonsterKillEvent
description: A representation of the Elite monster kill event.
---

# EliteMonsterKillEvent class

---

A representation of the Elite monster kill event.

**Signature:**

```ts
export declare class EliteMonsterKillEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/classes/timelineevent)

---

### Constructor

```ts
new EliteMonsterKillEvent (data: EliteMonsterKillEventData)
```

Constructs a new instance of the `EliteMonsterKillEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [EliteMonsterKillEventData](/api/interfaces/elitemonsterkilleventdata) | The raw data of the event. |
---

### Properties

#### assistingParticipants

The IDs of the participants that assisted in the kill.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[]

---

#### bounty

The amount of bounty earned by the killing team (objective bounty).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### killerId

The ID of the participant that landed the killing blow.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### killerTeamId

The ID of the team that killed the monster.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### monsterSubType

The subtype of the monster that was killed.


Eg: 'OCEAN', 'CLOUD', etc.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### monsterType

The type of the monster that was killed.


Eg: 'DRAGON', 'BARON NASHOR', etc.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### position

The position at which the monster was killed.



**Type**: [Position](/api/classes/position)

---

#### type

The type of the event.



**Type**: 'ELITE_MONSTER_KILL'

---

