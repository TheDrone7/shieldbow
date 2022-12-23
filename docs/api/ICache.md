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
clear(): Promise<any> | void;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< any \> \| void

---

#### .find ()

Find a value in the cache using a predicate and a filter.




**Signature:**

```ts
find<T>(predicate: (t: T) => boolean, filter?: (o: any) => o is T): Promise<T> | T | undefined;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| predicate | (t: T) = \> boolean | The predicate to use to find the value. |
| filter | (o: any) = \> o is T | The filter to use to filter the cache for appropriate type. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< T \> \| T \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### .get ()

Get a value from the cache.




**Signature:**

```ts
get<T>(key: string): Promise<T> | T;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the value to get. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< T \> \| T

---

#### .has ()



**Signature:**

```ts
has(key: string): Promise<boolean> | boolean;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \> \| [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### .keys ()

Fetches all keys in the cache.



**Signature:**

```ts
keys(): Promise<string[]> | string[];
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] \> \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[]

---

#### .remove ()

Remove a value from the cache.




**Signature:**

```ts
remove(key: string): Promise<any> | void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the value to remove. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< any \> \| void

---

#### .set ()

Set a value in the cache.




**Signature:**

```ts
set<T>(key: string, value: T): Promise<any> | void;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| key | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The key of the value to set. |
| value | T | The value to set. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< any \> \| void

---

#### .values ()

Fetches all values stored in the cache.



**Signature:**

```ts
values(): Promise<any[]> | any[];
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< any[] \> \| any[]

---

