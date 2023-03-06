---
title: SummonerManager
description: A summoner manager - to fetch and manage all the summoner data.
---

# SummonerManager class

---

A summoner manager - to fetch and manage all the summoner data.

**Signature:**

```ts
export declare class SummonerManager implements BaseManager<Summoner> 
```

Implements: BaseManager&lt;Summoner&gt;

**References:** [BaseManager](/api/basemanager), [Summoner](/api/summoner)

---

### Constructor

```ts
new SummonerManager (client: Client)
```

Constructs a new instance of the `SummonerManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client this summoner manager belongs to. |
---

### Properties

#### client

The client this summoner manager belongs to.



**Type**: [Client](/api/client)

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
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/summoner) \>

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
| playerId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Account](/api/account) | The PUUID of the summoner or associated RIOT account. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/summoner) \>

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
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/summoner) \>

---

