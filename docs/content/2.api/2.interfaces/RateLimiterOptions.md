---
title: RateLimiterOptions
description: The rate limiter options.
---

## RateLimiterOptions interface

The rate limiter options.

**Signature:**

```ts
export interface RateLimiterOptions 
```

### Properties

#### appLimit

The rate limit config for the app.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[]

---

#### methodLimit

The rate limit config for the methods.



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[] \| [MethodRateLimitOptions](/api/interfaces/methodratelimitoptions)

---

#### retry

The retry options.



**Type**: [RetryOptions](/api/interfaces/retryoptions)

---

#### strategy

The strategy to use when the rate limit is reached. - `burst`: The request will be sent immediately. - `spread`: The request will be slightly delayed to avoid going over rate limit. Default: `burst`



**Type**: 'burst' \| 'spread'

---

#### throw

Whether to throw an error when the rate limit is reached.


Default: `true`


If `false`, the request will be retried automatically, and the promise will be resolved late.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

