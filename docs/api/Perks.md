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
| client | [Client](/shieldbow/api/Client.md) |  |
| data | [PerksData](/shieldbow/api/PerksData.md) |  |
---

### Properties

#### primaryStyle

The primary perk style (keystone + primary runes).



**Type**: [PerkStyle](/shieldbow/api/PerkStyle.md)

---

#### secondaryStyle

The secondary perk style (secondary runes).



**Type**: [PerkStyle](/shieldbow/api/PerkStyle.md)

---

#### stats

The stat runes that were picked by the player.



**Type**: {         flex: StatPerk;         offense: StatPerk;         defense: StatPerk;     }

---

