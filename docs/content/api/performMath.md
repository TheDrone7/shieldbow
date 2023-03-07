---
title: performMath() function
description: A function that takes in calculations and performs the necessary operations to generate appropriate tooltips.
---

## performMath(calculation, effects, datavalue, maxRank, options) function

A function that takes in calculations and performs the necessary operations to generate appropriate tooltips.

**Signature:**

```ts
export declare function performMath(calculation: {
    [key: string]: any;
    __type: string;
}, effects: {
    value: number[];
}[], datavalue: {
    [name: string]: number[];
}, maxRank: number, options: {
    percent: boolean;
}): string;
```

### Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| calculation | {     [key: string]: any;     __type: string; } | The calculations. |
| effects | {     value: number[]; }[] | The effect values. |
| datavalue | {     [name: string]: number[]; } | The named data values. |
| maxRank | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The max applicable spell rank. |
| options | {     percent: boolean; } | Additional spell math options. |


**Return type :** [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

