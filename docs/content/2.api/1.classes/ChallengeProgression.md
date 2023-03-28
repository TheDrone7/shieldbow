---
title: ChallengeProgression
description: A representation of a summoner's challenge progression data.
---

# ChallengeProgression class

---

A representation of a summoner's challenge progression data.

**Signature:**

```ts
export declare class ChallengeProgression 
```

---

### Constructor

```ts
new ChallengeProgression (data: ChallengeProgressionData)
```

Constructs a new instance of the `ChallengeProgression` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [ChallengeProgressionData](/api/challengeprogressiondata) |  |
---

### Properties

#### achievedAt

The time of when this challenge was achieved.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

#### achievedTimestamp

The timestamp of when this challenge tier was achieved by the summoner.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### id

The ID of this challenge.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### percentile

The percentile of this summoner in this challenge. (0-100 %)



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tier

The tier this summoner has reached in this challenge.



**Type**: [TierType](/api/tiertype)

---

#### value

The current progression of this summoner in this challenge.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

