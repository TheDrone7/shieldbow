---
title: ChampionStat
description: A representation of the champion's base stats.
---

# ChampionStat class

---

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
| base | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The base value of the stat. |
| increment | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The value at which this stat increases every level. |
---

### Properties

#### base

The base value of the stat - the value at level 1.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### increment

The value at which this stat increases every level (the scaling).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

### Methods

#### .at ()

A utility to calculate the base value of this stat at a certain level.




**Signature:**

```ts
at(level: number): number;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| level | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The level at which the base value of this stat is needed. |

**Return type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

