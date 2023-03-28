---
title: SummonerChallenge
description: A representation of a summoner's challenge data.
---

# SummonerChallenge class

---

A representation of a summoner's challenge data.

**Signature:**

```ts
export declare class SummonerChallenge 
```

---

### Constructor

```ts
new SummonerChallenge (client: Client, data: SummonerChallengeData)
```

Constructs a new instance of the `SummonerChallenge` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) |  |
| data | [SummonerChallengeData](/api/summonerchallengedata) |  |
---

### Properties

#### categoryPoints

The challenge categories overview of this summoner.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [CategoryName](/api/categoryname), [ChallengeCategory](/api/challengecategory) \>

---

#### challenges

Individual challenge progression stats of this summoner.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [ChallengeProgression](/api/challengeprogression) \>

---

#### preferences

The preferences of this summoner.



**Type**: [ChallengePreferences](/api/challengepreferences)

---

#### totalPoints

The overview of this summoner in challenges.



**Type**: [TotalChallengePoints](/api/totalchallengepoints)

---

