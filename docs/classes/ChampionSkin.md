[league.ts](../README.md) / [Exports](../modules.md) / ChampionSkin

# Class: ChampionSkin

A representation of a champion's skin (visual modification).

## Table of contents

### Constructors

- [constructor](ChampionSkin.md#constructor)

### Properties

- [champ](ChampionSkin.md#champ)
- [chromas](ChampionSkin.md#chromas)
- [id](ChampionSkin.md#id)
- [internalId](ChampionSkin.md#internalid)
- [name](ChampionSkin.md#name)

### Accessors

- [loadingScreen](ChampionSkin.md#loadingscreen)
- [splashArt](ChampionSkin.md#splashart)

## Constructors

### constructor

• **new ChampionSkin**(`champ`, `data`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `champ` | [`Champion`](Champion.md) |
| `data` | `Object` |
| `data.chromas` | `boolean` |
| `data.id` | `string` |
| `data.name` | `string` |
| `data.num` | `number` |

#### Defined in

[data/ChampionSkin.ts:28](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L28)

## Properties

### champ

• `Readonly` **champ**: [`Champion`](Champion.md)

The champion this skin belongs to.

#### Defined in

[data/ChampionSkin.ts:10](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L10)

___

### chromas

• `Readonly` **chromas**: `boolean`

Whether the skin has chromas or not.

#### Defined in

[data/ChampionSkin.ts:26](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L26)

___

### id

• `Readonly` **id**: `number`

The numerical ID of this skin.

#### Defined in

[data/ChampionSkin.ts:14](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L14)

___

### internalId

• `Readonly` **internalId**: `string`

The ID this skin is identified by internally (the game).

#### Defined in

[data/ChampionSkin.ts:22](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L22)

___

### name

• `Readonly` **name**: `string`

The name of the skin displayed in game. U

#### Defined in

[data/ChampionSkin.ts:18](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L18)

## Accessors

### loadingScreen

• `get` **loadingScreen**(): `string`

#### Returns

`string`

#### Defined in

[data/ChampionSkin.ts:40](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L40)

___

### splashArt

• `get` **splashArt**(): `string`

#### Returns

`string`

#### Defined in

[data/ChampionSkin.ts:36](https://github.com/TheDrone7/league.ts/blob/18e3369/src/data/ChampionSkin.ts#L36)
