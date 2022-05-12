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
new ApiHandler (region: Region, apiKey: string)
```

Constructs a new instance of the `ApiHandler` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| region | [Region](/shieldbow/api/Region.html) | the region to use for the API requests. |
| apiKey | string | your RIOT API key. |
---

### Properties

#### region

The region that the API handler will send the request to.



**Type**: [Region](/shieldbow/api/Region.html)

---

### Methods

#### .makeApiRequest (url, options)

Make an API request




**Signature:**

```ts
makeApiRequest(url: string, options: {
        name: string;
        params: string;
        regional: boolean;
    }): Promise<AxiosResponse<any, any>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| url | string | The path to make the request to. |
| options | {         name: string;         params: string;         regional: boolean;     } | Some options to make the promise rejection messages more meaningful. |

**Return type**: Promise\<AxiosResponse\<any, any\>\>

---

