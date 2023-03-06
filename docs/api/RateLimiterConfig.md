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



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[]

---

#### methodLimit



**Type**: [MethodRateLimitConfig](/api/MethodRateLimitConfig.md)

---

#### retry



**Type**: [RetryOptions](/api/RetryOptions.md)

---

#### strategy



**Type**: 'burst' \| 'spread'

---

#### throw



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

