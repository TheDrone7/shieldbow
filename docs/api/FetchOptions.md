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

Whether to cache the returned data. Defaults to true.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### force

Whether to ignore the cache and request data from the API. Defaults to false.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### region

The region to fetch from. Defaults to the client's region.



**Type**: [Region](/api/Region.md)

---

