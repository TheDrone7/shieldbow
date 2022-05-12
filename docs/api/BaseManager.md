---
title: BaseManager
description: A base for any manager classes.
---

## BaseManager interface

A base for any manager classes.

**Signature:**

```ts
export interface BaseManager<T> 
```

### Properties

#### cache

The cache to store any data that can be avoided fetching repeatedly.



**Type**: Collection\<any, T\>

---

#### client

The client this manager is being used by.



**Type**: [Client](/shieldbow/api/Client.md)

---

### Methods

#### .fetch (id, options)

The method to actually fetch the data.




**Signature:**

```ts
fetch(id: any, options: {
        force: boolean;
    }): Promise<T>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | any | The ID of the data entity being fetched. |
| options | {         force: boolean;     } | Basic fetch options, setting the force option to `true` must ignore the cache. |

**Return type**: Promise\<T\>

---

