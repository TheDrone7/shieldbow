---
title: RateLimiterOptions
description: 
---

## RateLimiterOptions interface



**Signature:**

```ts
export interface RateLimiterOptions 
```

### Properties

#### appLimit



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[]

---

#### methodLimit



**Type**: [RateLimitConfig](/api/RateLimitConfig.md)[] \| [MethodRateLimitOptions](/api/MethodRateLimitOptions.md)

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

