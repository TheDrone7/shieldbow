---
title: ChampionSpell
description: The representation of a champion's spell (ability).
---

## ChampionSpell class

The representation of a champion's spell (ability).

**Signature:**

```ts
export declare class ChampionSpell 
```

---

### Constructor

```ts
new ChampionSpell (client: Client, champ: Champion, data: SpellData, damage: SpellDamageData)
```

Constructs a new instance of the `ChampionSpell` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| champ | [Champion](/shieldbow/api/Champion.html) |  |
| data | [SpellData](/shieldbow/api/SpellData.html) |  |
| damage | [SpellDamageData](/shieldbow/api/SpellDamageData.html) |  |
---

### Properties

#### cooldown

The cooldown of this ability (in seconds).


If the cooldown scales with rank of the ability, will be of the format - `r1/r2/r3...`


Where `r1` is the cooldown at rank 1, `r2` is the cooldown at rank 2, and so on.



**Type**: string

---

#### cooldownByLevel

Numerical representation of the spell's cooldown. The array contains the cooldown sorted by ranks.


To get the cooldown at rank 3, you can use `spell.cooldownByLevel[2]`.



**Type**: number[]

---

#### cost

The cost of using this spell (contains the resource used/generated).



**Type**: string

---

#### costByLevel

The numerical representation of the spell's costs. The array contains the cost sorted by ranks.


To get the cost at rank 3, you can use `spell.costByLevel[2]`.



**Type**: number[]

---

#### costType

The resource needed to use the ability.



**Type**: string

---

#### description

A short textual description of the ability.



**Type**: string

---

#### icon

The URL to the icon of this ability.



**Type**: string

---

#### id

The ID of the spell.



**Type**: string

---

#### maxAmmo

The number of times this ability can be used. -1 indicates it has no ammo system.



**Type**: number

---

#### maxRank

The max number of skill points (gained by leveling up the champion) that can be put into this spell.



**Type**: number

---

#### name

The displayed name of the ability.



**Type**: string

---

#### rawTooltip

The raw tooltip of the champion spell. This is a more detailed description and contains the numbers of any effects and damage the spell applies.


The raw tooltip also contains some HTML-like tags such as `<scaleAP>` to help style it better if you are making a website that needs to use this.



**Type**: string

---

#### tooltip

The tooltip of the champion spell. This is a more detailed description and contains the numbers of any effects and damage the spell applies.


The tooltip is cleaned off of any HTML-like tags to display text in a nicer format.



**Type**: string

---

