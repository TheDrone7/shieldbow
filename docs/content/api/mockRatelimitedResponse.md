---
title: mockRatelimitedResponse
description: A mock rate limit error response. This is sent by the rate limiter when the rate limit is exceeded. If it is an actual 429 response by the API, it is a problem with the rate limiter.
---

## mockRatelimitedResponse variable

A mock rate limit error response. This is sent by the rate limiter when the rate limit is exceeded. If it is an actual 429 response by the API, it is a problem with the rate limiter.

**Signature:**

```ts
mockRatelimitedResponse: {
    data: undefined;
    status: number;
    statusText: string;
    headers: {
        'Retry-After': string;
        'X-App-Rate-Limit': string;
        'X-App-Rate-Limit-Count': string;
        'X-Method-Rate-Limit': string;
        'X-Method-Rate-Limit-Count': string;
        'X-Rate-Limit-Type': string;
    };
    config: {
        headers: AxiosHeaders;
    };
}
```

**References:** AxiosHeaders

