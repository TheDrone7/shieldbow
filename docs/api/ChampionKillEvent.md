---
title: ChampionKillEvent
description: The representation of the Champion Kill event.
---

## ChampionKillEvent class

The representation of the Champion Kill event.

**Signature:**

```ts
export declare class ChampionKillEvent extends TimelineEvent 
```

**Extends: TimelineEvent**

**References:** [TimelineEvent](/api/TimelineEvent.md)

---

### Constructor

```ts
new ChampionKillEvent (data: ChampionKillEventData)
```

Constructs a new instance of the `ChampionKillEvent` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ChampionKillEventData](/api/ChampionKillEventData.md) |  |
---

### Properties

#### assistingParticipantIds

The participants who assisted in the kill.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[]

---

#### bounty

The bounty achieved by the killer.



**Type**: [Bounty](/api/Bounty.md)

---

#### killerId

The ID of the participant who landed the killing blow.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### killStreakLength

The kill streak length of the killer.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### position

The position at which the kill took place.



**Type**: [Position](/api/Position.md)

---

#### shutdownBounty

The bounty earned by the killer.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The type of the event.



**Type**: 'CHAMPION_KILL'

---

#### victimDamageDealt

The damage dealt by the victim.



**Type**: [DamageDealtData](/api/DamageDealtData.md)[]

---

#### victimDamageReceived

The damage dealt to the victim.



**Type**: [DamageDealtData](/api/DamageDealtData.md)[]

---

#### victimId

The ID of the participant that died.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

