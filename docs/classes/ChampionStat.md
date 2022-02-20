[league.ts](../README.md) / [Exports](../modules.md) / ChampionStat

# Class: ChampionStat

A representation of the champion's base stats.

## Table of contents

### Constructors

- [constructor](ChampionStat.md#constructor)

### Properties

- [base](ChampionStat.md#base)
- [increment](ChampionStat.md#increment)

### Methods

- [at](ChampionStat.md#at)

## Constructors

### constructor

• **new ChampionStat**(`base`, `increment`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | `number` |
| `increment` | `number` |

#### Defined in

[data/ChampionStat.ts:13](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionStat.ts#L13)

## Properties

### base

• `Readonly` **base**: `number`

The base value of the stat - the value at level 1.

#### Defined in

[data/ChampionStat.ts:8](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionStat.ts#L8)

___

### increment

• `Readonly` **increment**: `number`

The value at which this stat increases every level (the scaling).

#### Defined in

[data/ChampionStat.ts:12](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionStat.ts#L12)

## Methods

### at

▸ **at**(`level`): `number`

A utility to calculate the base value of this stat at a certain level.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `level` | `number` | The level at which the base value of this stat is needed. |

#### Returns

`number`

#### Defined in

[data/ChampionStat.ts:22](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionStat.ts#L22)
