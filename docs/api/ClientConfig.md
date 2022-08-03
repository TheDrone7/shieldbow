---
title: ClientConfig
description: The basic configuration for the shieldbow Client.
---

## ClientConfig interface

The basic configuration for the shieldbow Client.

**Signature:**

```ts
export interface ClientConfig 
```

### Properties

#### cache

The local caching settings. Alternatively, you can pass `true` or `false` to enable or disable caching without configuration.



**Type**: [CacheConfig](/api/CacheConfig.md) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### fetch

The data to fetch beforehand when initializing the client. This can delay the initialization but makes the rest of the processes much faster. Alternatively, you can pass `true` or `false` to enable or disable all of the data fetching.



**Type**: [PreFetchConfig](/api/PreFetchConfig.md) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### locale

The locale in which to fetch all the data (defaults to region's default)



**Type**: [Locales](/api/Locales.md)

---

#### region

The initial region to fetch all the data from (defaults to `na`)



**Type**: [Region](/api/Region.md)

---

#### version

The data dragon CDN version (defaults to latest as per the specified region)



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

