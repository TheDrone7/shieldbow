---
title: PerkStyle
description: A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected.
---

# PerkStyle class

---

A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected.

**Signature:**

```ts
export declare class PerkStyle 
```

---

### Constructor

```ts
new PerkStyle (runeTrees: Collection<string, RuneTree>, data: {
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
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/runetree) \> | The collection of rune trees in the game. |
| data | {         description: string;         selections: {             perk: number;             var1: number;             var2: number;             var3: number;         }[];         style: number;     } | The raw perk style data from the API. |
---

### Properties

#### selected

The selected runes.



**Type**: [Rune](/api/rune)[]

---

#### tree

The rune tree that this perk style is based on.



**Type**: [RuneTree](/api/runetree)

---

