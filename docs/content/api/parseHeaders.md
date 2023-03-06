---
title: parseHeaders() function
description: Parses the rate limit headers.
---

## parseHeaders(headers) function

Parses the rate limit headers.

**Signature:**

```ts
export declare function parseHeaders(headers: RawAxiosResponseHeaders | AxiosResponseHeaders): {
    app: RateLimitConfig[];
    method: RateLimitConfig[];
    usage: {
        app: number[];
        method: number[];
    };
};
```

### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| headers | RawAxiosResponseHeaders \| AxiosResponseHeaders | The headers to parse. |


**Return type :** {     app: RateLimitConfig[];     method: RateLimitConfig[];     usage: {         app: number[];         method: number[];     }; }

---

