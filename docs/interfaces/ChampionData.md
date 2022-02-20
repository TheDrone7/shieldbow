[league.ts](../README.md) / [Exports](../modules.md) / ChampionData

# Interface: ChampionData

A representation of the champion data returned by Data Dragon.

## Table of contents

### Properties

- [allytips](ChampionData.md#allytips)
- [blurb](ChampionData.md#blurb)
- [enemytips](ChampionData.md#enemytips)
- [id](ChampionData.md#id)
- [image](ChampionData.md#image)
- [info](ChampionData.md#info)
- [key](ChampionData.md#key)
- [lore](ChampionData.md#lore)
- [name](ChampionData.md#name)
- [partype](ChampionData.md#partype)
- [passive](ChampionData.md#passive)
- [skins](ChampionData.md#skins)
- [spells](ChampionData.md#spells)
- [stats](ChampionData.md#stats)
- [tags](ChampionData.md#tags)
- [title](ChampionData.md#title)

## Properties

### allytips

• **allytips**: `string`[]

#### Defined in

[types/champion.ts:60](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L60)

___

### blurb

• **blurb**: `string`

#### Defined in

[types/champion.ts:59](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L59)

___

### enemytips

• **enemytips**: `string`[]

#### Defined in

[types/champion.ts:61](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L61)

___

### id

• **id**: `string`

#### Defined in

[types/champion.ts:47](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L47)

___

### image

• **image**: [`ImageData`](ImageData.md)

#### Defined in

[types/champion.ts:51](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L51)

___

### info

• **info**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attack` | `number` |
| `defense` | `number` |
| `difficulty` | `number` |
| `magic` | `number` |

#### Defined in

[types/champion.ts:64](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L64)

___

### key

• **key**: `string`

#### Defined in

[types/champion.ts:48](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L48)

___

### lore

• **lore**: `string`

#### Defined in

[types/champion.ts:58](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L58)

___

### name

• **name**: `string`

#### Defined in

[types/champion.ts:49](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L49)

___

### partype

• **partype**: `string`

#### Defined in

[types/champion.ts:63](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L63)

___

### passive

• **passive**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `description` | `string` |
| `image` | [`ImageData`](ImageData.md) |
| `name` | `string` |

#### Defined in

[types/champion.ts:93](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L93)

___

### skins

• **skins**: { `chromas`: `boolean` ; `id`: `string` ; `name`: `string` ; `num`: `number`  }[]

#### Defined in

[types/champion.ts:52](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L52)

___

### spells

• **spells**: [`SpellData`](SpellData.md)[]

#### Defined in

[types/champion.ts:92](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L92)

___

### stats

• **stats**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `armor` | `number` |
| `armorperlevel` | `number` |
| `attackdamage` | `number` |
| `attackdamageperlevel` | `number` |
| `attackrange` | `number` |
| `attackspeed` | `number` |
| `attackspeedperlevel` | `number` |
| `crit` | `number` |
| `critperlevel` | `number` |
| `hp` | `number` |
| `hpperlevel` | `number` |
| `hpregen` | `number` |
| `hpregenperlevel` | `number` |
| `movespeed` | `number` |
| `mp` | `number` |
| `mpperlevel` | `number` |
| `mpregen` | `number` |
| `mpregenperlevel` | `number` |
| `spellblock` | `number` |
| `spellblockperlevel` | `number` |

#### Defined in

[types/champion.ts:70](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L70)

___

### tags

• **tags**: `string`[]

#### Defined in

[types/champion.ts:62](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L62)

___

### title

• **title**: `string`

#### Defined in

[types/champion.ts:50](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/champion.ts#L50)
