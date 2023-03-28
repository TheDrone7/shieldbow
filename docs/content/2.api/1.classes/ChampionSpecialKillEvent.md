---
title: ChampionSpecialKillEvent
description: A representation of the Champion special kill event.
---

# ChampionSpecialKillEvent class

---

A representation of the Champion special kill event.

**Signature:**

```ts
export declare class ChampionSpecialKillEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/timelineevent)

---

### Constructor

```ts
new ChampionSpecialKillEvent (data: ChampionSpecialKillEventData)
```

Constructs a new instance of the `ChampionSpecialKillEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ChampionSpecialKillEventData](/api/championspecialkilleventdata) | The raw data of the event. |
---

### Properties

#### killerId

The ID of the participant that performed the special kill.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### killType

The type of the special kill.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### position

The position at which the special kill took place.



**Type**: [Position](/api/position)

---

#### type

The type of the event.



**Type**: 'CHAMPION_SPECIAL_KILL'

---

