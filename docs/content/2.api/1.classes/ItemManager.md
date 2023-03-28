---
title: ItemManager
description: An item manager - to fetch and manage all item data.   Does not require an API Key.
---

# ItemManager class

---

An item manager - to fetch and manage all item data.   Does not require an API Key.

**Signature:**

```ts
export declare class ItemManager implements BaseManager<Item> 
```

Implements: BaseManager&lt;Item&gt;

**References:** [BaseManager](/api/basemanager), [Item](/api/item)

---

### Constructor

```ts
new ItemManager (client: Client)
```

Constructs a new instance of the `ItemManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client this item manager belongs to. |
---

### Properties

#### client

The client this item manager belongs to.



**Type**: [Client](/api/client)

---

### Methods

#### .fetch ()

Fetch an item by its 4-digit ID. The ID must be a string of 4 digits (not a number)




**Signature:**

```ts
fetch(key: string, options?: FetchOptions): Promise<Item>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the item to fetch. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/item) \>

---

#### .fetchAll ()

Fetch all items.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Collection<string, Item>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/item) \> \>

---

#### .fetchByName ()

Fetch an item by its name. The search is case-insensitive. The special characters are NOT ignored.




**Signature:**

```ts
fetchByName(name: string, options?: FetchOptions): Promise<Item | undefined>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| name | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the item to look for. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Item](/api/item) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) \>

---

#### .fetchMany ()

Fetch multiple items at once.




**Signature:**

```ts
fetchMany(keys: string[], options?: FetchOptions): Promise<Collection<string, Item>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| keys | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] | The keys of the items to fetch. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/item) \> \>

---

