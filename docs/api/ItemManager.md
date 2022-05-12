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

Implements: [BaseManager](/shieldbow/api/BaseManager.html)<[Item](/shieldbow/api/Item.html)>

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
| client | [Client](/shieldbow/api/Client.html) | The client this manager belongs to. |
| cacheSettings | {         enable: boolean;         root: string;     } | The basic caching settings. |
---

### Properties

#### cache

A collection of the items cached in the memory.



**Type**: Collection\<string, [Item](/shieldbow/api/Item.html)\>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.html)

---

### Methods

#### .fetch (key, options)

Fetch an item by its 4-digit ID. The ID must be a string of 4 digits (not a number)




**Signature:**

```ts
fetch(key: string, options?: {
        force: boolean;
    }): Promise<Item>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | string | The ID of the item to fetch. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[Item](/shieldbow/api/Item.html)\>

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
| name | string | The name of the item to look for. |

**Return type**: Promise\<[Item](/shieldbow/api/Item.html) \| undefined\>

---

