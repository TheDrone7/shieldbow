---
title: RuneTreeManager
description: A rune trees manager - to fetch and manage rune trees data.
---

## RuneTreeManager class

A rune trees manager - to fetch and manage rune trees data.

**Signature:**

```ts
export declare class RuneTreeManager implements BaseManager<RuneTree> 
```

Implements: BaseManager<RuneTree\>

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [RuneTree](/shieldbow/api/RuneTree.md)

---

### Constructor

```ts
new RuneTreeManager (client: Client, cacheSettings: {
        enable: boolean;
        root: string;
    })
```

Constructs a new instance of the `RuneTreeManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client this manager belongs to. |
| cacheSettings | {         enable: boolean;         root: string;     } | The basic caching settings. |
---

### Properties

#### cache

A collection of the rune trees cached in the memory.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/shieldbow/api/RuneTree.md) \>

---

#### cachedRunes

An array of runes that have been saved in the cache.


This is similar to the cache but the cache is a collection of Rune Trees and this is an array of runes.



**Type**: [Rune](/shieldbow/api/Rune.md)[]

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.md)

---

### Methods

#### .fetch (key, options)

Fetch a rune tree by its key. The key is the same as the rune tree's name, for example - `Domination`.




**Signature:**

```ts
fetch(key: string, options?: {
        force: boolean;
    }): Promise<RuneTree>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the rune tree to fetch. |
| options | {         force: boolean;     } | Additional fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [RuneTree](/shieldbow/api/RuneTree.md) \>

---

#### .fetchRune (key, options)

Fetch a rune by its key. The key is mostly the same as the rune name, for example - `Electrocute`.




**Signature:**

```ts
fetchRune(key: string, options?: {
        force: boolean;
    }): Promise<Rune>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the rune. |
| options | {         force: boolean;     } | Additional fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/shieldbow/api/Rune.md) \>

---

#### .findById (id)

Find a rune tree by its numerical ID.




**Signature:**

```ts
findById(id: number): Promise<RuneTree | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The numerical ID of the rune tree to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [RuneTree](/shieldbow/api/RuneTree.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .findByName (name)

Find a rune tree by its name. The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
findByName(name: string): Promise<RuneTree | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the rune tree to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [RuneTree](/shieldbow/api/RuneTree.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .findRuneById (id)

Find a rune by its numerical ID.




**Signature:**

```ts
findRuneById(id: number): Promise<Rune | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The numerical ID of the rune to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/shieldbow/api/Rune.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .findRuneByName (name)

Find a rune by its name. The search is case-insensitive. The special characters are not ignored.




**Signature:**

```ts
findRuneByName(name: string): Promise<Rune | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the rune to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/shieldbow/api/Rune.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

