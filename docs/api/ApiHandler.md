---
title: ApiHandler
description: A class that handles API requests and rate limits for the RIOT API.
---

## ApiHandler class

A class that handles API requests and rate limits for the RIOT API.

**Signature:**

```ts
export declare class ApiHandler 
```

---

### Constructor

```ts
new ApiHandler (client: Client, apiKey: string)
```

Constructs a new instance of the `ApiHandler` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client to use. |
| apiKey | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | your RIOT API key. |
---

### Methods

#### .makeApiRequest ()

Make an API request




**Signature:**

```ts
makeApiRequest(url: string, options: ApiRequestOptions): Promise<AxiosResponse<any, any>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The path to make the request to. |
| options | [ApiRequestOptions](/api/ApiRequestOptions.md) | Some options to make the promise rejection messages more meaningful. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< AxiosResponse \< any, any \> \>

---

