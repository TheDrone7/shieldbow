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

The caching settings. Alternatively, you can pass `true` or `false` to enable or disable caching without further configuration.



**Type**: [CacheConfig](/api/cacheconfig) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### fetch

The data to fetch beforehand when initializing the client. This can delay the initialization but makes the rest of the processes much faster. Alternatively, you can pass `true` or `false` to enable or disable all the data fetching.



**Type**: [PreFetchConfig](/api/prefetchconfig) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### locale

The locale in which to fetch all the data (defaults to region's default)



**Type**: [Locales](/api/locales)

---

#### logger

The client's logger utility configuration. Alternatively, you can pass `true` to use the default logger configuration. Or you can pass `false` to disable logging.



**Type**: [LoggerConfig](/api/loggerconfig) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### ratelimiter

The rate limiter options to modify the behaviour of the part of the client that sends requests to the APIs.



**Type**: [RateLimiterOptions](/api/ratelimiteroptions)

---

#### region

The initial region to fetch all the data from (defaults to `na`)



**Type**: [Region](/api/region)

---

#### storage

The storage settings. Alternatively, you can pass `true` or `false` to enable or disable storage without further configuration.



**Type**: [StorageConfig](/api/storageconfig) \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### version

The data dragon CDN version (defaults to latest as per the specified region)



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

