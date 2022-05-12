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
| level | number | the bounty level of the participant. |
---

### Properties

#### announcement

The announcement that is made when the participant kills an enemy.


This is only available for bounty levels \> 2.



**Type**: string

---

#### assistBounty

The amount of gold assisting in killing the participant will earn.



**Type**: number

---

#### consecutiveDeaths

The number of consecutive deaths the participant has (to earn them this bounty).



**Type**: number

---

#### consecutiveKills

The number of consecutive kills the participant has (to earn them this bounty).



**Type**: number

---

#### killBounty

The amount of gold killing the participant will earn.


The maximum amount that can be earned at once is 1000. The rest is carried over when the participant respawns.



**Type**: number

---

#### level

The bounty level.



**Type**: number

---

