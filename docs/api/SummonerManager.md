---
title: SummonerManager
description: A summoner manager - to fetch and manage all the summoner data.
---

## SummonerManager class

A summoner manager - to fetch and manage all the summoner data.

**Signature:**

```ts
export declare class SummonerManager implements BaseManager<Summoner> 
```

Implements: BaseManager&lt;Summoner&gt;

**References:** [BaseManager](/api/BaseManager.md), [Summoner](/api/Summoner.md)

---

### Constructor

```ts
new SummonerManager (client: Client)
```

Constructs a new instance of the `SummonerManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that instantiated this manager. |
---

### Properties

#### cache

The summoners cached in the memory.


Only use this if you absolutely must. Prioritize using [fetch](/api/SummonerManager.md#fetch), [fetchBySummonerName](/api/SummonerManager.md#fetchBySummonerName) or [fetchByPlayerId](/api/SummonerManager.md#fetchByPlayerId) instead.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Summoner](/api/Summoner.md) \>

---

#### client

The client this manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch ()

Fetch a summoner by its summoner ID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner ID of the summoner. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/Summoner.md) \>

---

#### .fetchByPlayerId ()

Fetch a summoner by its unique PUUID.




**Signature:**

```ts
fetchByPlayerId(playerId: string | Account, options?: FetchOptions): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| playerId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Account](/api/Account.md) | The PUUID of the summoner or associated RIOT account. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/Summoner.md) \>

---

#### .fetchBySummonerName ()

Fetch a summoner by its summoner name.




**Signature:**

```ts
fetchBySummonerName(name: string, options?: FetchOptions): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner name of the summoner to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/Summoner.md) \>

---

