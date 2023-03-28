---
title: ChallengeRank
description: A representation of the ranked challenges stats of a summoner.
---

# ChallengeRank class

---

A representation of the ranked challenges stats of a summoner.

**Signature:**

```ts
export declare class ChallengeRank 
```

---

### Constructor

```ts
new ChallengeRank (client: Client, data: ChallengeRankData, tier: TierType)
```

Constructs a new instance of the `ChallengeRank` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) |  |
| data | [ChallengeRankData](/api/interfaces/challengerankdata) |  |
| tier | [TierType](/api/types/tiertype) |  |
---

### Properties

#### playerId

The unique player ID of the summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### progression

The progression of the summoner in the challenge.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### rank

The rank of the summoner in the challenge.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tier

The tier this summoner belongs to regarding this challenge.



**Type**: [TierType](/api/types/tiertype)

---

### Methods

#### .fetchSummoner ()

Fetch the details of the summoner.



**Signature:**

```ts
fetchSummoner(): Promise<import("./Summoner").Summoner>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< import("./Summoner").Summoner \>

---

