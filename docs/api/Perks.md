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
new Perks (client: Client, data: PerksData)
```

Constructs a new instance of the `Perks` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client requesting this data. |
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

