---
title: ItemManager
description: An item manager - to fetch and manage all item data.
---

## ItemManager class

An item manager - to fetch and manage all item data.

**Signature:**

```ts
export declare class ItemManager implements BaseManager<Item> 
```

Implements: BaseManager&lt;Item&gt;

**References:** [BaseManager](/api/BaseManager.md), [Item](/api/Item.md)

---

### Constructor

```ts
new ItemManager (client: Client, cacheSettings: {
        enable: boolean;
        root: string;
    })
```

Constructs a new instance of the `ItemManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this manager belongs to. |
| cacheSettings | {         enable: boolean;         root: string;     } | The basic caching settings. |
---

### Properties

#### cache

A collection of the items cached in the memory.


Only use this if you absolutely must. Prioritize using [fetch](/api/ItemManager.md#fetch) instead.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/Item.md) \>

---

#### client

The client this manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch (key, options)

Fetch an item by its 4-digit ID. The ID must be a string of 4 digits (not a number)




**Signature:**

```ts
fetch(key: string, options?: FetchOptions): Promise<Item>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the item to fetch. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/Item.md) \>

---

#### .findByName (name)

Find an item by its name. The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
findByName(name: string): Promise<Item | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the item to look for. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/Item.md) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

