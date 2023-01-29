---
title: LocalStorage
description: A basic storage plugin that stores data to the local file system.
---

## LocalStorage class

A basic storage plugin that stores data to the local file system.

**Signature:**

```ts
export declare class LocalStorage implements IStorage 
```

Implements: IStorage

**References:** [IStorage](/api/IStorage.md)

---

### Constructor

```ts
new LocalStorage (client: Client, root: string)
```

Constructs a new instance of the `LocalStorage` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client to use. |
| root | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The root path to use. |
---

### Methods

#### .fetch ()

Fetches a value from storage.




**Signature:**

```ts
fetch<T>(key: string, id: string): Promise<T>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The path to the value to fetch. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The file name of the value to fetch. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< T \>

---

#### .remove ()

Deletes a value from storage.




**Signature:**

```ts
remove(key: string, id: string): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The path to the value to delete. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The file name of the value to delete. |

**Return type**: void

---

#### .save ()

Saves a value to storage.




**Signature:**

```ts
save<T>(value: T, key: string, id: string): Promise<T>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| value | T | The value to save. |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The path to the value to save. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The file name of the value to save. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< T \>

---

#### .search ()



**Signature:**

```ts
search<T>(key: string, query: {
        [key: string]: any;
    }): Promise<T[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
| query | {         [key: string]: any;     } |  |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< T[] \>

---

