---
title: Perks
description: A representation of the perks (runes) selected by a summoner for a match.
---

## Perks class

A representation of the perks (runes) selected by a summoner for a match.

**Signature:**

```ts
export declare class Perks 
```

---

### Constructor

```ts
new Perks (runeTrees: Collection<string, RuneTree>, data: PerksData)
```

Constructs a new instance of the `Perks` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/RuneTree.md) \> | The collection of rune trees in the game. |
| data | [PerksData](/api/PerksData.md) | The raw perks data from the API. |
---

### Properties

#### primaryStyle

The primary perk style (keystone + primary runes).



**Type**: [PerkStyle](/api/PerkStyle.md)

---

#### secondaryStyle

The secondary perk style (secondary runes).



**Type**: [PerkStyle](/api/PerkStyle.md)

---

#### stats

The stat runes that were picked by the player.



**Type**: [StatPerks](/api/StatPerks.md)

---

