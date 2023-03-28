---
title: RuneTreeManager
description: A rune trees manager - to fetch and manage rune trees data.
---

# RuneTreeManager class

---

A rune trees manager - to fetch and manage rune trees data.

**Signature:**

```ts
export declare class RuneTreeManager implements BaseManager<RuneTree> 
```

Implements: BaseManager&lt;RuneTree&gt;

**References:** [BaseManager](/api/interfaces/basemanager), [RuneTree](/api/classes/runetree)

---

### Constructor

```ts
new RuneTreeManager (client: Client)
```

Constructs a new instance of the `RuneTreeManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) | The client this rune tree manager belongs to. |
---

### Properties

#### client

The client this rune tree manager belongs to.



**Type**: [Client](/api/classes/client)

---

### Methods

#### .fetch ()

Fetch a rune tree by its key. The key is the same as the rune tree's name, for example - `Domination`.




**Signature:**

```ts
fetch(key: string, options?: FetchOptions): Promise<RuneTree>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the rune tree to fetch. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | Additional fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [RuneTree](/api/classes/runetree) \>

---

#### .fetchAll ()

Fetch all rune trees.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Collection<string, RuneTree>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/classes/runetree) \> \>

---

#### .fetchAllRunes ()

Fetch all runes.




**Signature:**

```ts
fetchAllRunes(options?: FetchOptions): Promise<Rune[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/api/classes/rune)[] \>

---

#### .fetchById ()

Find a rune tree by its numerical ID.




**Signature:**

```ts
fetchById(id: number, options?: FetchOptions): Promise<RuneTree | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The numerical ID of the rune tree to look for. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [RuneTree](/api/classes/runetree) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .fetchByName ()

Fetch a rune tree by its name. The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
fetchByName(name: string, options?: FetchOptions): Promise<RuneTree | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the rune tree to look for. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [RuneTree](/api/classes/runetree) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .fetchRune ()

Fetch a rune by its key. The key is mostly the same as the rune name, for example - `Electrocute`.




**Signature:**

```ts
fetchRune(key: string, options?: FetchOptions): Promise<Rune>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the rune. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | Additional fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/api/classes/rune) \>

---

#### .fetchRuneById ()

Fetch a rune by its numerical ID.




**Signature:**

```ts
fetchRuneById(id: number, options?: FetchOptions): Promise<Rune | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The numerical ID of the rune to look for. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/api/classes/rune) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .fetchRuneByName ()

Fetch a rune by its name. The search is case-insensitive. The special characters are not ignored.




**Signature:**

```ts
fetchRuneByName(name: string, options?: FetchOptions): Promise<Rune | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the rune to look for. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Rune](/api/classes/rune) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

