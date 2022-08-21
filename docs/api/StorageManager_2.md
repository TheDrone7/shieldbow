---
title: StorageManager_2
description: A basic manager for storing and fetching the local cached JSON files.
---

## StorageManager_2 class

A basic manager for storing and fetching the local cached JSON files.

**Signature:**

```ts
export declare class StorageManager implements BaseManager<any> 
```

Implements: BaseManager<any>\>

**References:** [BaseManager](/api/BaseManager.md)

---

### Constructor

```ts
new StorageManager_2 (client: Client, pathName: string, root: string)
```

Constructs a new instance of the `StorageManager_2` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this manager belongs to. |
| pathName | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The path to the directory where the JSON files are stored. |
| root | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The root directory of the project's storage. |
---

### Properties

#### cache

An in-memory cache that stores the JSON data to serve data faster.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), any \>

---

#### client

The client this Manager belongs to.



**Type**: [Client](/api/Client.md)

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
fetch(id: string): any | void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the JSON file. |

**Return type**: any \| void

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

