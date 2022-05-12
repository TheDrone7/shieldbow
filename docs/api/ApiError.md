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
| request | string |  |
| message | string |  |
---

### Properties

#### request

A textual representation of contents of the request that errored..



**Type**: string

---

#### response

The received response object.



**Type**: AxiosResponse

---

