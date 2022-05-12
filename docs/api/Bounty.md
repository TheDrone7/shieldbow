---
title: Bounty
description: A representation of the bounty on a match participant.
---

## Bounty class

A representation of the bounty on a match participant.

**Signature:**

```ts
export declare class Bounty 
```

---

### Constructor

```ts
new Bounty (level: number)
```

Constructs a new instance of the `Bounty` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| level | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | the bounty level of the participant. |
---

### Properties

#### announcement

The announcement that is made when the participant kills an enemy.


This is only available for bounty levels \> 2.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### assistBounty

The amount of gold assisting in killing the participant will earn.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### consecutiveDeaths

The number of consecutive deaths the participant has (to earn them this bounty).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### consecutiveKills

The number of consecutive kills the participant has (to earn them this bounty).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### killBounty

The amount of gold killing the participant will earn.


The maximum amount that can be earned at once is 1000. The rest is carried over when the participant respawns.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### level

The bounty level.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

