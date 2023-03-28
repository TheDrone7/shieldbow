---
title: RateLimiterConfig
description: The rate limiter config (internal).
---

## RateLimiterConfig interface

The rate limiter config (internal).

**Signature:**

```ts
export interface RateLimiterConfig 
```

### Properties

#### appLimit



**Type**: [RateLimitConfig](/api/interfaces/ratelimitconfig)[]

---

#### methodLimit



**Type**: [MethodRateLimitConfig](/api/interfaces/methodratelimitconfig)

---

#### retry



**Type**: [RetryOptions](/api/interfaces/retryoptions)

---

#### strategy



**Type**: 'burst' \| 'spread'

---

#### throw



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

