---
title: RateLimiter
description: 
---

## RateLimiter class



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
| client | [Client](/api/Client.md) |  |
| options | [RateLimiterOptions](/api/RateLimiterOptions.md) |  |
| apiKey | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
---

### Methods

#### .request ()



**Signature:**

```ts
request(url: string, options: ApiRequestOptions): Promise<AxiosResponse>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
| options | [ApiRequestOptions](/api/ApiRequestOptions.md) |  |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< AxiosResponse \>

---

