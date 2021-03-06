---
title: ChampionManager
description: A champion manager - to fetch and manage all the champion data.
---

## ChampionManager class

A champion manager - to fetch and manage all the champion data.

**Signature:**

```ts
export declare class ChampionManager implements BaseManager<Champion> 
```

Implements: BaseManager<Champion\>

**References:** [BaseManager](/api/BaseManager.md), [Champion](/api/Champion.md)

---

### Constructor

```ts
new ChampionManager (client: Client, cacheSettings: {
        enable: boolean;
        root: string;
    })
```

Constructs a new instance of the `ChampionManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this manager belongs to. |
| cacheSettings | {         enable: boolean;         root: string;     } | The basic caching settings. |
---

### Properties

#### cache

The champions cached in the memory.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \>

---

#### client

The client that this manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetches a champion (from the cache, if already available), or from data dragon and community dragon.




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


This always fetches freshly from data dragon and community dragon.



**Signature:**

```ts
fetchAll(): Promise<Collection<string, Champion>>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \> \>

---

#### .fetchByKeys (keys)

Fetch and cache champions by their unique 3-digit keys.


This is mostly for internal use while fetching match (or live match) data to improve performance.




**Signature:**

```ts
fetchByKeys(keys: number[]): Promise<unknown>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| keys | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)[] | The keys of the champions to fetch. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< unknown \>

---

#### .findByKey (key)

Find a champion by their 3-digit key.




**Signature:**

```ts
findByKey(key: number): Promise<Champion | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The 3-digit key of the champion to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Champion](/api/Champion.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .findByName (name)

Find a champion by their name (instead of ID, which is very similar but not the same as the name). The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
findByName(name: string): Promise<Champion | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the champion to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Champion](/api/Champion.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

