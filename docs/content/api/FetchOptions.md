---
title: FetchOptions
description: The basic fetching options for various fetch methods in the managers.
---

## FetchOptions interface

The basic fetching options for various fetch methods in the managers.

**Signature:**

```ts
export interface FetchOptions 
```

### Properties

#### cache

Whether to cache the returned data. Defaults to client configuration.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### ignoreCache

Whether to ignore the cache and request data from the storage / API. Defaults to false.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### ignoreStorage

Whether to ignore the storage and request data from the API. Defaults to false.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### region

The region to fetch from. Defaults to the client's region.



**Type**: [Region](/api/region)

---

#### store

Whether to store the returned data in the database. Defaults to client configuration.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

