---
title: StorageManager
description: A basic manager for storing and fetching the local cached JSON files.
---

## StorageManager class

A basic manager for storing and fetching the local cached JSON files.

**Signature:**

```ts
export declare class StorageManager implements BaseManager<any> 
```

Implements: BaseManager\>

**References:** [BaseManager](/shieldbow/api/BaseManager.md)

---

### Constructor

```ts
new StorageManager (client: Client, pathName: string, root: string)
```

Constructs a new instance of the `StorageManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
| pathName | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
| root | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
---

### Properties

#### cache

An in-memory cache that stores the JSON data to serve data faster.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), any \>

---

#### client

The client this Manager belongs to.



**Type**: [Client](/shieldbow/api/Client.md)

---

#### pathName

The path of the base directory to fetch/store files from/in



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

### Methods

#### .fetch (id)

Fetch the locally stored JSON file by its name.




**Signature:**

```ts
fetch(id: string): any;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the JSON file. |

**Return type**: any

---

#### .store (id, data)

Store a JSON file locally.




**Signature:**

```ts
store(id: string, data: any): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the JSON file. |
| data | any | The JSON data that needs to be stored. |

**Return type**: void

---

