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

Implements: [BaseManager](/shieldbow/api/BaseManager.html)<[Summoner](/shieldbow/api/Summoner.html)>

**References:** [BaseManager](/shieldbow/api/BaseManager.html), [Summoner](/shieldbow/api/Summoner.html)

---

### Constructor

```ts
new SummonerManager (client: Client)
```

Constructs a new instance of the `SummonerManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
---

### Properties

#### cache

The summoners cached in the memory.



**Type**: Collection\<string, [Summoner](/shieldbow/api/Summoner.html)\>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.html)

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
| id | string | The summoner ID of the summoner. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Summoner](/shieldbow/api/Summoner.html)\>

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
| account | [Account](/shieldbow/api/Account.html) | The associated RIOT account. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Summoner](/shieldbow/api/Summoner.html)\>

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
| id | string | The account ID of the summoner to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Summoner](/shieldbow/api/Summoner.html)\>

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
| id | string | The PUUID of the summoner to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Summoner](/shieldbow/api/Summoner.html)\>

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
| name | string | The summoner name of the summoner to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Summoner](/shieldbow/api/Summoner.html)\>

---

