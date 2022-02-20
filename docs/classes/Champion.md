[league.ts](../README.md) / [Exports](../modules.md) / Champion

# Class: Champion

The representation of a League of Legends champion.

## Table of contents

### Constructors

- [constructor](Champion.md#constructor)

### Properties

- [allyTips](Champion.md#allytips)
- [blurb](Champion.md#blurb)
- [classes](Champion.md#classes)
- [client](Champion.md#client)
- [enemyTips](Champion.md#enemytips)
- [icon](Champion.md#icon)
- [id](Champion.md#id)
- [key](Champion.md#key)
- [lore](Champion.md#lore)
- [name](Champion.md#name)
- [passive](Champion.md#passive)
- [ratings](Champion.md#ratings)
- [resource](Champion.md#resource)
- [skins](Champion.md#skins)
- [spells](Champion.md#spells)
- [stats](Champion.md#stats)
- [title](Champion.md#title)

### Accessors

- [defaultLoadingScreen](Champion.md#defaultloadingscreen)
- [defaultSplashArt](Champion.md#defaultsplashart)

## Constructors

### constructor

• **new Champion**(`client`, `data`, `damage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |
| `data` | [`ChampionData`](../interfaces/ChampionData.md) |
| `damage` | [`SpellDamageData`](../interfaces/SpellDamageData.md) |

#### Defined in

[data/Champion.ts:89](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L89)

## Properties

### allyTips

• `Readonly` **allyTips**: `string`[]

An array of tips to play as/along this champion.

#### Defined in

[data/Champion.ts:58](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L58)

___

### blurb

• `Readonly` **blurb**: `string`

A shortened version of the champion's lore.

#### Defined in

[data/Champion.ts:50](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L50)

___

### classes

• `Readonly` **classes**: `string`[]

The champion classes this champion belongs to, such as - Fighter, Tank, Assassin, etc.

#### Defined in

[data/Champion.ts:62](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L62)

___

### client

• `Readonly` **client**: [`Client`](Client.md)

#### Defined in

[data/Champion.ts:10](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L10)

___

### enemyTips

• `Readonly` **enemyTips**: `string`[]

An array of tips to play against this champion.

#### Defined in

[data/Champion.ts:54](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L54)

___

### icon

• `Readonly` **icon**: `string`

A URL to the champion's icon.

#### Defined in

[data/Champion.ts:42](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L42)

___

### id

• `Readonly` **id**: `string`

The ID of the champion. To get the ID, in the champion's name
- Capitalize the words
- Remove any spaces and special characters
- The words after a `'` - such as in Kai'sa, remain lowercase.

Examples:
- Kayn -> Kayn
- Cho'Gath -> Chogath
- Dr. Mundo -> DrMundo

There are 2 exceptions to this rule.
1. Wukong -> MonkeyKing
2. Renata Glasc -> Renata

#### Defined in

[data/Champion.ts:30](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L30)

___

### key

• `Readonly` **key**: `string`

The key - a 3-digit number, that is used to identify the champion.

#### Defined in

[data/Champion.ts:34](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L34)

___

### lore

• `Readonly` **lore**: `string`

The complete lore of the champion.

#### Defined in

[data/Champion.ts:46](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L46)

___

### name

• `Readonly` **name**: `string`

The name of the champion.

#### Defined in

[data/Champion.ts:14](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L14)

___

### passive

• `Readonly` **passive**: `Object`

The champion's passive ability summarized.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `icon` | `string` |
| `name` | `string` |

#### Defined in

[data/Champion.ts:87](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L87)

___

### ratings

• `Readonly` **ratings**: `Object`

The champion's magic, defense, attack, difficulty ratings.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attack` | `number` |
| `defense` | `number` |
| `difficulty` | `number` |
| `magic` | `number` |

#### Defined in

[data/Champion.ts:83](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L83)

___

### resource

• `Readonly` **resource**: `string`

The resource represented by the bar below this champion's health bar in game.

#### Defined in

[data/Champion.ts:66](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L66)

___

### skins

• `Readonly` **skins**: `Collection`<`number`, [`ChampionSkin`](ChampionSkin.md)\>

A collection of the available skins for this champion.
The default skin always has the id - `0`.

#### Defined in

[data/Champion.ts:75](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L75)

___

### spells

• `Readonly` **spells**: `Collection`<``"Q"`` \| ``"W"`` \| ``"E"`` \| ``"R"``, [`ChampionSpell`](ChampionSpell.md)\>

The champion's spells (abilities), mapped by the key they are assigned to, by default - Q, W, E, R, respectively.

#### Defined in

[data/Champion.ts:79](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L79)

___

### stats

• `Readonly` **stats**: `Collection`<[`stats`](../modules.md#stats), [`ChampionStat`](ChampionStat.md)\>

A collection of the champion's base stats.

#### Defined in

[data/Champion.ts:70](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L70)

___

### title

• `Readonly` **title**: `string`

A title given to the champion based on their lore.

#### Defined in

[data/Champion.ts:38](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L38)

## Accessors

### defaultLoadingScreen

• `get` **defaultLoadingScreen**(): `string`

The champion's default skin loading screen art.

#### Returns

`string`

#### Defined in

[data/Champion.ts:148](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L148)

___

### defaultSplashArt

• `get` **defaultSplashArt**(): `string`

The champion's default skin splash art.

#### Returns

`string`

#### Defined in

[data/Champion.ts:141](https://github.com/TheDrone7/league.ts/blob/f012637/src/data/Champion.ts#L141)
