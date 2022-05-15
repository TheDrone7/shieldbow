---
title: CurrentGamePerks
description: A representation of the rune setup of a live game participant.
---

## CurrentGamePerks class

A representation of the rune setup of a live game participant.

**Signature:**

```ts
export declare class CurrentGamePerks 
```

---

### Constructor

```ts
new CurrentGamePerks (client: Client, data: CurrentGamePerksData)
```

Constructs a new instance of the `CurrentGamePerks` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [CurrentGamePerksData](/api/CurrentGamePerksData.md) | The raw current game participant perks data from the API. |
---

### Properties

#### primaryTree

The primary rune tree selected by the participant.



**Type**: [RuneTree](/api/RuneTree.md)

---

#### secondaryTree

The secondary rune tree selected by the participant.



**Type**: [RuneTree](/api/RuneTree.md)

---

#### selected

The runes selected by the participant.



**Type**: [Rune](/api/Rune.md)[]

---

#### stats

The stat runes selected by the participant.



**Type**: [StatPerk](/api/StatPerk.md)[]

---

