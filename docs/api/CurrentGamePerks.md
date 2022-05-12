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
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [CurrentGamePerksData](/shieldbow/api/CurrentGamePerksData.html) |  |
---

### Properties

#### primaryTree

The primary rune tree selected by the participant.



**Type**: [RuneTree](/shieldbow/api/RuneTree.html)

---

#### secondaryTree

The secondary rune tree selected by the participant.



**Type**: [RuneTree](/shieldbow/api/RuneTree.html)

---

#### selected

The runes selected by the participant.



**Type**: [Rune](/shieldbow/api/Rune.html)[]

---

#### stats

The stat runes selected by the participant.



**Type**: [StatPerk](/shieldbow/api/StatPerk.html)[]

---

