---
title: CacheConfig
description: Client's caching plugin configuration.
---

## CacheConfig interface

Client's caching plugin configuration.

**Signature:**

```ts
export interface CacheConfig 
```

### Properties

#### custom

The custom cache plugin to use. This will override the default memory cache plugin.



**Type**: [ICache](/api/interfaces/icache)

---

#### enable

Whether to enable caching of fetched data (defaults to true for all). Can be set to true to enable for all, or false to disable for all.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \| [ManagersConfig](/api/interfaces/managersconfig)

---

