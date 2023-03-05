---
title: ApiRequestOptions
description: The API request options.
---

## ApiRequestOptions interface

The API request options.

**Signature:**

```ts
export interface ApiRequestOptions 
```

### Properties

#### api

The API that is going to be requested (excluding the version, shieldbow only uses the latest versions).



**Type**: keyof MethodRateLimitConfig

---

#### method

The method that is being used, used for rate limiting.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### params

A string containing parameters to be used for error messages.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### region

The region to make the request to.



**Type**: [Region](/api/Region.md)

---

#### regional

Whether to use regional routing values (euw, na) or region API bases (americas, europe).



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

