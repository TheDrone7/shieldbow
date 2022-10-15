---
title: Challenge
description: A class representing the details of a challenge.
---

## Challenge class

A class representing the details of a challenge.

**Signature:**

```ts
export declare class Challenge 
```

---

### Constructor

```ts
new Challenge (client: Client, data: ChallengeConfigData, percentiles: {
        [key in TierType]: number;
    })
```

Constructs a new instance of the `Challenge` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) |  |
| data | [ChallengeConfigData](/api/ChallengeConfigData.md) |  |
| percentiles | {         [key in TierType]: number;     } |  |
---

### Properties

#### description

The long description of the challenge (as per the client's locale).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### descriptions

The long descriptions of the challenge mapped by locale.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Locales](/api/Locales.md), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \>

---

#### id

The ID of the challenge.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### leaderboard

Whether the challenge has a leaderboard.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### name

The name of the challenge (as per the client's locale).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### names

The names of the challenge mapped by locale.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Locales](/api/Locales.md), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \>

---

#### percentiles

The percentile of player base that have reached a specific tier (mapped by tier).



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [TierType](/api/TierType.md), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \>

---

#### shortDescription

The short description of the challenge (as per the client's locale).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### shortDescriptions

The short descriptions of the challenge mapped by locale.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Locales](/api/Locales.md), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \>

---

#### state

The state of the challenge.



**Type**: 'ENABLED' \| 'DISABLED'

---

#### thresholds

The thresholds of the challenge mapped by tier.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [TierType](/api/TierType.md), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \>

---

