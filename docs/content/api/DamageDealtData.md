---
title: DamageDealtData
description: The data of the damage dealt on a champion during their death on the map.
---

## DamageDealtData interface

The data of the damage dealt on a champion during their death on the map.

**Signature:**

```ts
export interface DamageDealtData 
```

### Properties

#### basic

Whether the damage was dealt by a basic attack.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### magicDamage

The amount of magic damage dealt.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### name

The name of the source of the damage.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### participantId

The participant that dealt the damage.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### physicalDamage

The amount of physical damage dealt.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### spellName

The name of the spell that was used to deal the damage.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### spellSlot

The slot of the spell that was used to deal the damage.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### trueDamage

The amount of true damage dealt.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### type

The source of the damage.



**Type**: 'OTHER' \| 'TOWER' \| 'MINION'

---

