---
title: PerkStyle
description: A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected.
---

## PerkStyle class

A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected.

**Signature:**

```ts
export declare class PerkStyle 
```

---

### Constructor

```ts
new PerkStyle (client: Client, data: {
        description: string;
        selections: {
            perk: number;
            var1: number;
            var2: number;
            var3: number;
        }[];
        style: number;
    })
```

Constructs a new instance of the `PerkStyle` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
| data | {         description: string;         selections: {             perk: number;             var1: number;             var2: number;             var3: number;         }[];         style: number;     } |  |
---

### Properties

#### selected

The selected runes.



**Type**: [Rune](/shieldbow/api/Rune.md)[]

---

#### tree

The rune tree that this perk style is based on.



**Type**: [RuneTree](/shieldbow/api/RuneTree.md)

---

