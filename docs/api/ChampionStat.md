---
title: ChampionStat
description: A representation of the champion's base stats.
---

## ChampionStat class

A representation of the champion's base stats.

**Signature:**

```ts
export declare class ChampionStat 
```

---

### Constructor

```ts
new ChampionStat (base: number, increment: number)
```

Constructs a new instance of the `ChampionStat` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| base | number |  |
| increment | number |  |
---

### Properties

#### base

The base value of the stat - the value at level 1.



**Type**: number

---

#### increment

The value at which this stat increases every level (the scaling).



**Type**: number

---

### Methods

#### .at (level)

A utility to calculate the base value of this stat at a certain level.




**Signature:**

```ts
at(level: number): number;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| level | number | The level at which the base value of this stat is needed. |

**Return type**: number

---

