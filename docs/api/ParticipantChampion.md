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



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'Q' \| 'W' \| 'E' \| 'R', [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \>

---

#### champ

A reference to the actual champion.



**Type**: [Champion](/api/Champion.md)

---

#### form

ONLY APPLICABLE FOR KAYN.


0 = No form. 1 = Darkin Slayer. 2 = Shadow Assassin.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### id

The name of the champion.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### key

The numerical ID of the champion.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### level

The level of the champion.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### xp

The amount of experience earned by this champion.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

