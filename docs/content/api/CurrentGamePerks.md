---
title: CurrentGamePerks
description: A representation of the rune setup of a live game participant.
---

# CurrentGamePerks class

---

A representation of the rune setup of a live game participant.

**Signature:**

```ts
export declare class CurrentGamePerks 
```

---

### Constructor

```ts
new CurrentGamePerks (runeTrees: Collection<string, RuneTree>, data: CurrentGamePerksData)
```

Constructs a new instance of the `CurrentGamePerks` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/runetree) \> | The collection of the runes in the game. |
| data | [CurrentGamePerksData](/api/currentgameperksdata) | The raw current game participant perks data from the API. |
---

### Properties

#### primaryTree

The primary rune tree selected by the participant.



**Type**: [RuneTree](/api/runetree)

---

#### secondaryTree

The secondary rune tree selected by the participant.



**Type**: [RuneTree](/api/runetree)

---

#### selected

The runes selected by the participant.



**Type**: [Rune](/api/rune)[]

---

#### stats

The stat runes selected by the participant.



**Type**: [StatPerk](/api/statperk)[]

---

