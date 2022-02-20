[league.ts](../README.md) / [Exports](../modules.md) / BaseManager

# Interface: BaseManager

A base for any manager classes.

## Implemented by

- [`ChampionManager`](../classes/ChampionManager.md)

## Table of contents

### Properties

- [cache](BaseManager.md#cache)
- [client](BaseManager.md#client)

### Methods

- [fetch](BaseManager.md#fetch)

## Properties

### cache

• `Readonly` **cache**: `Collection`<`any`, `any`\>

The cache to store any data that can be avoided fetching repeatedly.

#### Defined in

[types/BaseManager.ts:11](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/BaseManager.ts#L11)

___

### client

• `Readonly` **client**: [`Client`](../classes/Client.md)

The client this manager is being used by.

#### Defined in

[types/BaseManager.ts:15](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/BaseManager.ts#L15)

## Methods

### fetch

▸ **fetch**(`id`, `options`): `Object`

The method to actually fetch the data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `any` | The ID of the data entity being fetched. |
| `options` | `Object` | Basic fetch options, setting the force option to `true` must ignore the cache. |
| `options.force` | `boolean` | - |

#### Returns

`Object`

#### Defined in

[types/BaseManager.ts:22](https://github.com/TheDrone7/league.ts/blob/18e3369/src/types/BaseManager.ts#L22)
