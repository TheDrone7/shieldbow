---
title: ParticipantFrameChampionStats
description: A representation of the participant's champion stats in a [ParticipantFrame](/api/ParticipantFrame.md#).
---

## ParticipantFrameChampionStats class

A representation of the participant's champion stats in a [ParticipantFrame](/api/ParticipantFrame.md#).

**Signature:**

```ts
export declare class ParticipantFrameChampionStats 
```

---

### Constructor

```ts
new ParticipantFrameChampionStats (data: ParticipantChampionStatsData)
```

Constructs a new instance of the `ParticipantFrameChampionStats` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ParticipantChampionStatsData](/api/ParticipantChampionStatsData.md) | The raw data from the API. |
---

### Properties

#### abilityHaste

The amount of ability haste the participant has.


This scales linearly.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### abilityPower

The amount of ability power the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### armor

The amount of armor the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### armorPen

The amount of flat armor penetration the participant has.


Also called "lethality" in the game.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### armorPenPercent

The amount of percent armor penetration the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### attackDamage

The amount of attack damage the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### attackSpeed

The amount of attack speed the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### bonusArmorPenPercent

The amount of bonus percent armor penetration the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### bonusMagicPenPercent

The amount of bonus percent magic penetration the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### cooldownReduction

The amount of cooldown reduction the participant has.


This scales exponentially.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### health

The amount of HP the participant currently has (current health).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### healthMax

The maximum amount of HP the participant can have (max HP).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### healthRegen

The amount of HP the participant recovers each second.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### lifesteal

The amount of lifesteal the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### magicPen

The amount of flat magic penetration the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### magicPenPercent

The amount of percent magic penetration the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### magicResist

The amount of magic resist the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### movementSpeed

The participant's movement speed.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### omnivamp

The amount of omnivamp the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### physicalVamp

The amount of physical vamp the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### power

The amount of power the participant currently has.


Power refers to mostly mana or energy.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### powerMax

The max amount of power the participant can have.


Power refers to mostly mana or energy.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### powerRegen

The amount of power the participant regenerates each second.


Power refers to mostly mana or energy.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### spellVamp

The amount of spell vamp the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tenacity

The amount of tenacity the participant has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

