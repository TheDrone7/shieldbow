[league.ts](../README.md) / [Exports](../modules.md) / ChampionSpell

# Class: ChampionSpell

The representation of a champion's spell (ability).

## Table of contents

### Constructors

- [constructor](ChampionSpell.md#constructor)

### Properties

- [cooldown](ChampionSpell.md#cooldown)
- [cooldownByLevel](ChampionSpell.md#cooldownbylevel)
- [cost](ChampionSpell.md#cost)
- [costByLevel](ChampionSpell.md#costbylevel)
- [costType](ChampionSpell.md#costtype)
- [description](ChampionSpell.md#description)
- [icon](ChampionSpell.md#icon)
- [id](ChampionSpell.md#id)
- [maxAmmo](ChampionSpell.md#maxammo)
- [maxRank](ChampionSpell.md#maxrank)
- [name](ChampionSpell.md#name)

### Accessors

- [rawTooltip](ChampionSpell.md#rawtooltip)
- [tooltip](ChampionSpell.md#tooltip)

## Constructors

### constructor

• **new ChampionSpell**(`champ`, `data`, `damage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `champ` | [`Champion`](Champion.md) |
| `data` | [`SpellData`](../interfaces/SpellData.md) |
| `damage` | [`SpellDamageData`](../interfaces/SpellDamageData.md) |

#### Defined in

[data/ChampionSpell.ts:68](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L68)

## Properties

### cooldown

• `Readonly` **cooldown**: `string`

The cooldown of this ability (in seconds).

If the cooldown scales with rank of the ability, will be of the format - `r1/r2/r3...`

Where `r1` is the cooldown at rank 1, `r2` is the cooldown at rank 2, and so on.

#### Defined in

[data/ChampionSpell.ts:39](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L39)

___

### cooldownByLevel

• `Readonly` **cooldownByLevel**: `number`[]

Numerical representation of the spell's cooldown.
The array contains the cooldown sorted by ranks.

To get the cooldown at rank 3, you can use `spell.cooldownByLevel[2]`.

#### Defined in

[data/ChampionSpell.ts:46](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L46)

___

### cost

• `Readonly` **cost**: `string`

The cost of using this spell (contains the resource used/generated).

#### Defined in

[data/ChampionSpell.ts:50](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L50)

___

### costByLevel

• `Readonly` **costByLevel**: `number`[]

The numerical representation of the spell's costs.
The array contains the cost sorted by ranks.

To get the cost at rank 3, you can use `spell.costByLevel[2]`.

#### Defined in

[data/ChampionSpell.ts:57](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L57)

___

### costType

• `Readonly` **costType**: `string`

The resource needed to use the ability.

#### Defined in

[data/ChampionSpell.ts:61](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L61)

___

### description

• `Readonly` **description**: `string`

A short textual description of the ability.

#### Defined in

[data/ChampionSpell.ts:22](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L22)

___

### icon

• `Readonly` **icon**: `string`

The URL to the icon of this ability.

#### Defined in

[data/ChampionSpell.ts:27](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L27)

___

### id

• `Readonly` **id**: `string`

The ID of the spell.

#### Defined in

[data/ChampionSpell.ts:14](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L14)

___

### maxAmmo

• `Readonly` **maxAmmo**: `number`

The number of times this ability can be used.
-1 indicates it has no ammo system.

#### Defined in

[data/ChampionSpell.ts:66](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L66)

___

### maxRank

• `Readonly` **maxRank**: `number`

The max number of skill points (gained by leveling up the champion) that can be put into this spell.

#### Defined in

[data/ChampionSpell.ts:31](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L31)

___

### name

• `Readonly` **name**: `string`

The displayed name of the ability.

#### Defined in

[data/ChampionSpell.ts:18](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L18)

## Accessors

### rawTooltip

• `get` **rawTooltip**(): `string`

The raw tooltip of the champion spell.
This is a more detailed description and contains the numbers of any effects and damage the spell applies.

The raw tooltip also contains some HTML-like tags such as `<scaleAP>`
to help style it better if you are making a website that needs to use this.

#### Returns

`string`

#### Defined in

[data/ChampionSpell.ts:124](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L124)

___

### tooltip

• `get` **tooltip**(): `string`

The tooltip of the champion spell.
This is a more detailed description and contains the numbers of any effects and damage the spell applies.

The tooltip is cleaned off of any HTML-like tags to display text in a nicer format.

#### Returns

`string`

#### Defined in

[data/ChampionSpell.ts:134](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSpell.ts#L134)
