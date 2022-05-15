---
title: Ratelimiter
description: A utility class that handles ratelimits.
---

## Ratelimiter class

A utility class that handles ratelimits.

**Signature:**

```ts
export declare class Ratelimiter 
```

---

### Constructor

```ts
new Ratelimiter ()
```

Constructs a new instance of the `Ratelimiter` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
---

### Methods

#### .update (region, response, method)

Parse and update ratelimits from a response.




**Signature:**

```ts
update(region: Region, response: AxiosResponse, method: string): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| region | [Region](/api/Region.md) | The region the response is from. |
| response | AxiosResponse | The response to parse. |
| method | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The method the response is for. |

**Return type**: void

---

#### .verify (region, method)

Verify if the request is going beyond the ratelimit.




**Signature:**

```ts
verify(region: Region, method: string): {
        pass: boolean;
        wait: number;
    };
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| region | [Region](/api/Region.md) | The region the request is for. |
| method | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The method the request is for. |

**Return type**: {         pass: boolean;         wait: number;     }

---

