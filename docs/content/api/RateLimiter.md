---
title: RateLimiter
description: The rate limiter class. Used to send requests to the API.
---

# RateLimiter class

---

The rate limiter class. Used to send requests to the API.

**Signature:**

```ts
export declare class RateLimiter 
```

---

### Constructor

```ts
new RateLimiter (client: Client, options: RateLimiterOptions, apiKey: string)
```

Constructs a new instance of the `RateLimiter` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) |  |
| options | [RateLimiterOptions](/api/ratelimiteroptions) |  |
| apiKey | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
---

### Methods

#### .request ()

Send a request to the API.




**Signature:**

```ts
request(url: string, options: ApiRequestOptions): Promise<AxiosResponse>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The URL to send the request to. |
| options | [ApiRequestOptions](/api/apirequestoptions) | The request options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< AxiosResponse \>

---

