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
new ApiError (status: number, url: string, headers: AxiosRequestHeaders, response?: AxiosResponse)
```

Constructs a new instance of the `ApiError` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| status | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |  |
| url | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
| headers | AxiosRequestHeaders |  |
| response | AxiosResponse |  |
---

### Properties

#### headers

The headers sent with the request.



**Type**: AxiosRequestHeaders

---

#### response

The received response object.



**Type**: AxiosResponse

---

#### url

The requested URL.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

