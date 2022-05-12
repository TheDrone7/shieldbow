---
title: ApiError
description: API error class.
---

## ApiError class

API error class.

**Signature:**

```ts
export declare class ApiError extends Error 
```

**Extends: Error**

**References:** [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

---

### Constructor

```ts
new ApiError (response: AxiosResponse, request: string, message?: string)
```

Constructs a new instance of the `ApiError` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| response | AxiosResponse |  |
| request | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
| message | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
---

### Properties

#### request

A textual representation of contents of the request that errored..



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### response

The received response object.



**Type**: AxiosResponse

---

