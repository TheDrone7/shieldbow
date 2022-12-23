---
title: IStorage
description: The base storage interface for the storage plugin to be used.
---

## IStorage interface

The base storage interface for the storage plugin to be used.

**Signature:**

```ts
export interface IStorage 
```

### Methods

#### .fetch ()

Fetch a value from storage.




**Signature:**

```ts
fetch<T>(key: string, id: string): Promise<T> | T;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | A key to help distinguish the collection where the element is stored. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The id of the element to fetch. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< T \> \| T

---

#### .remove ()

Delete a value from storage.




**Signature:**

```ts
remove(key: string, id: string): void | Promise<any>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | A key to help distinguish the collection where the element is stored. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The id of the element to delete. |

**Return type**: void \| [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< any \>

---

#### .save ()

Save a value in storage.




**Signature:**

```ts
save<T>(value: T, key: string, id: string): void | Promise<any>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| value | T | The value to set. |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | A key to help distinguish the collection where the element is stored. |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The id of the element to save. |

**Return type**: void \| [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< any \>

---

