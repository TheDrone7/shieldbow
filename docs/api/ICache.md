---
title: ICache
description: The base cache interface for the cache plugin to be used.
---

## ICache interface

The base cache interface for the cache plugin to be used.

**Signature:**

```ts
export interface ICache 
```

### Methods

#### .clear ()

Clear the cache.



**Signature:**

```ts
clear(): void;
```


**Return type**: void

---

#### .get ()

Get a value from the cache.




**Signature:**

```ts
get<T>(key: string): T;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the value to get. |

**Return type**: T

---

#### .remove ()

Remove a value from the cache.




**Signature:**

```ts
remove(key: string): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the value to remove. |

**Return type**: void

---

#### .set ()

Set a value in the cache.




**Signature:**

```ts
set<T>(key: string, value: T): void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the value to set. |
| value | T | The value to set. |

**Return type**: void

---

