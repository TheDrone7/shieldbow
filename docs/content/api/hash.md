---
title: hash() function
description: A simple fnv1a hashing utility - to help with community dragon data parsing.
---

## hash(str, { size }) function

A simple fnv1a hashing utility - to help with community dragon data parsing.

**Signature:**

```ts
export declare function hash(str: string, { size }?: {
    size?: number | undefined;
}): string;
```

### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| str | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The string that needs to be hashed. |
| { size } | {     size?: number \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined); } |  |


**Return type :** [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

