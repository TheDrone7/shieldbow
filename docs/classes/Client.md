[league.ts](../README.md) / [Exports](../modules.md) / Client

# Class: Client

The league.ts client that enables you to interact with Riot Games' League of Legends API.
Also connects to the Data Dragon + Community Dragon CDNs.

**`example`**
Here is how to use the client:
```ts
const myClient = new Client();
client.initialize('euw').then(() => {
  // All your code goes here.
});
```

## Table of contents

### Constructors

- [constructor](Client.md#constructor)

### Accessors

- [base](Client.md#base)
- [champions](Client.md#champions)
- [http](Client.md#http)
- [language](Client.md#language)
- [patch](Client.md#patch)
- [version](Client.md#version)

### Methods

- [initialize](Client.md#initialize)

## Constructors

### constructor

• **new Client**()

#### Defined in

[client.ts:27](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L27)

## Accessors

### base

• `get` **base**(): `string`

The Data Dragon CDN Base URL

#### Returns

`string`

#### Defined in

[client.ts:67](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L67)

___

### champions

• `get` **champions**(): [`ChampionManager`](ChampionManager.md)

The default champions manager used by the client;

#### Returns

[`ChampionManager`](ChampionManager.md)

#### Defined in

[client.ts:74](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L74)

___

### http

• `get` **http**(): `AxiosInstance`

The axios instance that handles all the requests being made to the API.

#### Returns

`AxiosInstance`

#### Defined in

[client.ts:60](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L60)

___

### language

• `get` **language**(): ``"en_US"`` \| ``"cs_CZ"`` \| ``"de_DE"`` \| ``"el_GR"`` \| ``"en_AU"`` \| ``"en_GB"`` \| ``"en_PH"`` \| ``"en_SG"`` \| ``"es_AR"`` \| ``"es_ES"`` \| ``"es_MX"`` \| ``"fr_FR"`` \| ``"hu_HU"`` \| ``"id_ID"`` \| ``"it_IT"`` \| ``"ja_JP"`` \| ``"ko_KR"`` \| ``"pl_PL"`` \| ``"pt_BR"`` \| ``"ro_RO"`` \| ``"ru_RU"`` \| ``"th_TH"`` \| ``"tr_TR"`` \| ``"vn_VN"`` \| ``"zh_CN"`` \| ``"zh_MY"`` \| ``"zh_TW"``

The locale in which all the data is going to be fetched in.

#### Returns

``"en_US"`` \| ``"cs_CZ"`` \| ``"de_DE"`` \| ``"el_GR"`` \| ``"en_AU"`` \| ``"en_GB"`` \| ``"en_PH"`` \| ``"en_SG"`` \| ``"es_AR"`` \| ``"es_ES"`` \| ``"es_MX"`` \| ``"fr_FR"`` \| ``"hu_HU"`` \| ``"id_ID"`` \| ``"it_IT"`` \| ``"ja_JP"`` \| ``"ko_KR"`` \| ``"pl_PL"`` \| ``"pt_BR"`` \| ``"ro_RO"`` \| ``"ru_RU"`` \| ``"th_TH"`` \| ``"tr_TR"`` \| ``"vn_VN"`` \| ``"zh_CN"`` \| ``"zh_MY"`` \| ``"zh_TW"``

#### Defined in

[client.ts:95](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L95)

• `set` **language**(`locale`): `void`

The locale in which all the data is going to be fetched in.

#### Parameters

| Name | Type |
| :------ | :------ |
| `locale` | ``"en_US"`` \| ``"cs_CZ"`` \| ``"de_DE"`` \| ``"el_GR"`` \| ``"en_AU"`` \| ``"en_GB"`` \| ``"en_PH"`` \| ``"en_SG"`` \| ``"es_AR"`` \| ``"es_ES"`` \| ``"es_MX"`` \| ``"fr_FR"`` \| ``"hu_HU"`` \| ``"id_ID"`` \| ``"it_IT"`` \| ``"ja_JP"`` \| ``"ko_KR"`` \| ``"pl_PL"`` \| ``"pt_BR"`` \| ``"ro_RO"`` \| ``"ru_RU"`` \| ``"th_TH"`` \| ``"tr_TR"`` \| ``"vn_VN"`` \| ``"zh_CN"`` \| ``"zh_MY"`` \| ``"zh_TW"`` |

#### Returns

`void`

#### Defined in

[client.ts:99](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L99)

___

### patch

• `get` **patch**(): `string`

The patch of the game currently in use.

#### Returns

`string`

#### Defined in

[client.ts:88](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L88)

• `set` **patch**(`patch`): `void`

The patch of the game currently in use.

#### Parameters

| Name | Type |
| :------ | :------ |
| `patch` | `string` |

#### Returns

`void`

#### Defined in

[client.ts:103](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L103)

___

### version

• `get` **version**(): `string`

The current Data Dragon CDN version.

#### Returns

`string`

#### Defined in

[client.ts:81](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L81)

## Methods

### initialize

▸ **initialize**(`region?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `region?` | [`regions`](../modules.md#regions) |

#### Returns

`Promise`<`void`\>

#### Defined in

[client.ts:37](https://github.com/TheDrone7/league.ts/blob/18e3369/src/client.ts#L37)
