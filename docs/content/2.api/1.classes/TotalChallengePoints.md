---
title: TotalChallengePoints
description: A representation of the overview of a summoner's challenge data.
---

# TotalChallengePoints class

---

A representation of the overview of a summoner's challenge data.

**Signature:**

```ts
export declare class TotalChallengePoints 
```

---

### Constructor

```ts
new TotalChallengePoints (data: TotalChallengePointsData)
```

Constructs a new instance of the `TotalChallengePoints` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TotalChallengePointsData](/api/interfaces/totalchallengepointsdata) |  |
---

### Properties

#### current

The current progression of this summoner in challenges.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### max

The maximum progression of this summoner in challenges.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### percentile

The percentile of this summoner in challenges. (0-100 %)



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tier

The tier this summoner has reached in challenges.



**Type**: [TierType](/api/types/tiertype)

---

