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

The local caching settings.



**Type**: [CacheConfig](/api/CacheConfig.md)

---

#### fetch

The data to fetch beforehand when initializing the client. This can delay the initialization but makes the rest of the processes much faster.



**Type**: [PreFetchConfig](/api/PreFetchConfig.md)

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

