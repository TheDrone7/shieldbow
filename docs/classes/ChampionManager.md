[league.ts](../README.md) / [Exports](../modules.md) / ChampionManager

# Class: ChampionManager

A champion manager - to help fetch and manage all the champion data.

## Implements

- [`BaseManager`](../interfaces/BaseManager.md)

## Table of contents

### Constructors

- [constructor](ChampionManager.md#constructor)

### Properties

- [cache](ChampionManager.md#cache)
- [client](ChampionManager.md#client)

### Methods

- [fetch](ChampionManager.md#fetch)
- [fetchAll](ChampionManager.md#fetchall)

## Constructors

### constructor

• **new ChampionManager**(`client`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](Client.md) |

#### Defined in

[managers/ChampionManager.ts:19](https://github.com/TheDrone7/league.ts/blob/f012637/src/managers/ChampionManager.ts#L19)

## Properties

### cache

• `Readonly` **cache**: `Collection`<`string`, [`Champion`](Champion.md)\>

The in-memory cache that contains all the champion data that has been fetched so far.

#### Implementation of

[BaseManager](../interfaces/BaseManager.md).[cache](../interfaces/BaseManager.md#cache)

#### Defined in

[managers/ChampionManager.ts:13](https://github.com/TheDrone7/league.ts/blob/f012637/src/managers/ChampionManager.ts#L13)

___

### client

• `Readonly` **client**: [`Client`](Client.md)

The client that this manager belongs to.

#### Implementation of

[BaseManager](../interfaces/BaseManager.md).[client](../interfaces/BaseManager.md#client)

#### Defined in

[managers/ChampionManager.ts:17](https://github.com/TheDrone7/league.ts/blob/f012637/src/managers/ChampionManager.ts#L17)

## Methods

### fetch

▸ **fetch**(`id`, `options?`): `Promise`<`unknown`\>

Fetches a champion's data (from the cache, if already available), or from data dragon and community dragon.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The [ID](Champion.md#id) of the champion whose data needs to be fetched. |
| `options` | `Object` | The options to modify the behavior of this method. If force is set to `true`, cache will be ignored. |
| `options.force` | `boolean` | - |

#### Returns

`Promise`<`unknown`\>

#### Implementation of

[BaseManager](../interfaces/BaseManager.md).[fetch](../interfaces/BaseManager.md#fetch)

#### Defined in

[managers/ChampionManager.ts:61](https://github.com/TheDrone7/league.ts/blob/f012637/src/managers/ChampionManager.ts#L61)

___

### fetchAll

▸ **fetchAll**(): `Promise`<`unknown`\>

Fetch all the champions' data and store it in the cache.

This always fetches freshly from data dragon and community dragon.

#### Returns

`Promise`<`unknown`\>

#### Defined in

[managers/ChampionManager.ts:29](https://github.com/TheDrone7/league.ts/blob/f012637/src/managers/ChampionManager.ts#L29)
