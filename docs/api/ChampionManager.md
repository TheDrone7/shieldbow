---
title: ChampionManager
description: A champion manager - to fetch and manage all the champion data.   Does not require an API Key. (Except for [ChampionManager.fetchRotations](/api/ChampionManager.md#fetchrotations)).
---

## ChampionManager class

A champion manager - to fetch and manage all the champion data.   Does not require an API Key. (Except for [ChampionManager.fetchRotations](/api/ChampionManager.md#fetchrotations)).

**Signature:**

```ts
export declare class ChampionManager implements BaseManager<Champion> 
```

Implements: BaseManager&lt;Champion&gt;

**References:** [BaseManager](/api/BaseManager.md), [Champion](/api/Champion.md)

---

### Constructor

```ts
new ChampionManager (client: Client)
```

Constructs a new instance of the `ChampionManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this champion manager belongs to. |
---

### Properties

#### client

The client that this champion manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch ()

Fetches a champion by the champion ID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<Champion>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The [ID](/api/Champion.md#id) of the champion whose data needs to be fetched. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Champion](/api/Champion.md) \>

---

#### .fetchAll ()

Fetch all the champions and store it in the cache.


This always fetches freshly from data dragon, community dragon and meraki analytics.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Collection<string, Champion>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options (only `cache` and `store` affect this method). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \> \>

---

#### .fetchByKey ()

Fetch and cache champion by their unique 3-digit keys.


This is mostly for internal use while fetching match (or live match) data to improve performance.




**Signature:**

```ts
fetchByKey(key: number, options?: FetchOptions): Promise<Champion | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The key of the champions to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Champion](/api/Champion.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .fetchByKeys ()

Fetch and cache champions by their unique 3-digit keys.


This is mostly for internal use while fetching match (or live match) data to improve performance. Ideally, any user would be using [fetch](/api/ChampionManager.md#fetch).




**Signature:**

```ts
fetchByKeys(keys: number[], options?: FetchOptions): Promise<Collection<string, Champion>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| keys | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[] | The keys of the champions to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \> \>

---

#### .fetchByName ()

Fetch a champion by their name (instead of ID, which is very similar but not the same as the name). The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
fetchByName(name: string, options?: FetchOptions): Promise<Champion | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the champions to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Champion](/api/Champion.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .fetchByNames ()

Fetch and cache champions by their names.




**Signature:**

```ts
fetchByNames(names: string[], options?: FetchOptions): Promise<Collection<string, Champion>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| names | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] | The names of the champions to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \> \>

---

#### .fetchRotations ()

Fetch champion rotation data from Champion v3 API.


This is the only method that needs a valid API key in this manager. Needs access to the Champion v3 API.




**Signature:**

```ts
fetchRotations(options?: FetchOptions): Promise<Collection<string, Champion[]>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md)[] \> \>

---

