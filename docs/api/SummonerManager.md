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

Implements: BaseManager<Summoner\>

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [Summoner](/shieldbow/api/Summoner.md)

---

### Constructor

```ts
new SummonerManager (client: Client)
```

Constructs a new instance of the `SummonerManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
---

### Properties

#### cache

The summoners cached in the memory.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Summoner](/shieldbow/api/Summoner.md) \>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetch a summoner by its summoner ID.




**Signature:**

```ts
fetch(id: string, options?: {
        force: boolean;
    }): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner ID of the summoner. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/shieldbow/api/Summoner.md) \>

---

#### .fetchByAccount (account, options)

Fetch a summoner by a RIOT account associated to it.




**Signature:**

```ts
fetchByAccount(account: Account, options?: {
        force: boolean;
    }): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| account | [Account](/shieldbow/api/Account.md) | The associated RIOT account. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/shieldbow/api/Summoner.md) \>

---

#### .fetchByAccountId (id, options)

Fetch a summoner by its account ID.




**Signature:**

```ts
fetchByAccountId(id: string, options?: {
        force: boolean;
    }): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The account ID of the summoner to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/shieldbow/api/Summoner.md) \>

---

#### .fetchByPlayerId (id, options)

Fetch a summoner by its unique PUUID.




**Signature:**

```ts
fetchByPlayerId(id: string, options?: {
        force: boolean;
    }): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The PUUID of the summoner to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/shieldbow/api/Summoner.md) \>

---

#### .fetchBySummonerName (name, options)

Fetch a summoner by its summoner name.




**Signature:**

```ts
fetchBySummonerName(name: string, options?: {
        force: boolean;
    }): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner name of the summoner to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/shieldbow/api/Summoner.md) \>

---

