---
title: MemoryCache
description: A basic caching manager that caches to the system memory using a Map.
---

# MemoryCache class

---

A basic caching manager that caches to the system memory using a Map.

**Signature:**

```ts
export declare class MemoryCache implements ICache 
```

Implements: ICache

**References:** [ICache](/api/icache)

---

### Constructor

```ts
new MemoryCache ()
```

Constructs a new instance of the `MemoryCache` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
---

### Methods

#### .clear ()

Clears the cache.



**Signature:**

```ts
clear(): void;
```


**Return type**: void

---

#### .find ()

Finds a value in the cache using a predicate and a filter.




**Signature:**

```ts
find<T>(predicate: (t: T) => boolean): T | undefined;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| predicate | (t: T) = \> boolean | The predicate to use to find the value. |

**Return type**: T \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### .get ()

Gets a value from the cache.




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

#### .has ()



**Signature:**

```ts
has(key: string): boolean;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |

**Return type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### .keys ()

Fetches all keys in the cache.



**Signature:**

```ts
keys(): string[];
```


**Return type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

#### .remove ()

Removes a value from the cache.




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

Sets a value in the cache.




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

#### .values ()

Fetches all values stored in the cache.



**Signature:**

```ts
values(): any[];
```


**Return type**: any[]

---

