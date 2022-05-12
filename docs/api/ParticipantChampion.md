---
title: ParticipantChampion
description: The participant's champion details.
---

## ParticipantChampion interface

The participant's champion details.

**Signature:**

```ts
export interface ParticipantChampion 
```

### Properties

#### abilitiesCasted

The count of how many times did the participant case each of the champion's abilities.



**Type**: Collection\<'Q' \| 'W' \| 'E' \| 'R', number\>

---

#### champ

A reference to the actual champion.



**Type**: [Champion](/shieldbow/api/Champion.md)

---

#### form

ONLY APPLICABLE FOR KAYN.


0 = No form. 1 = Darkin Slayer. 2 = Shadow Assassin.



**Type**: number

---

#### id

The name of the champion.



**Type**: string

---

#### key

The numerical ID of the champion.



**Type**: number

---

#### level

The level of the champion.



**Type**: number

---

#### xp

The amount of experience earned by this champion.



**Type**: number

---

