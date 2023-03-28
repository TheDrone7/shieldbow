---
title: ChallengeManager
description: A challenge manager - to fetch and manage all the challenges' data.   Requires API key with access to `lol-challenges-v1` API.
---

# ChallengeManager class

---

A challenge manager - to fetch and manage all the challenges' data.   Requires API key with access to `lol-challenges-v1` API.

**Signature:**

```ts
export declare class ChallengeManager implements BaseManager<Challenge> 
```

Implements: BaseManager&lt;Challenge&gt;

**References:** [BaseManager](/api/interfaces/basemanager), [Challenge](/api/classes/challenge)

---

### Constructor

```ts
new ChallengeManager (client: Client)
```

Constructs a new instance of the `ChallengeManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) | The client this challenge manager belongs to. |
---

### Properties

#### client

The client this challenge manager belongs to.



**Type**: [Client](/api/classes/client)

---

### Methods

#### .fetch ()

Fetch a challenge by the challenge ID.




**Signature:**

```ts
fetch(id: number, options?: FetchOptions): Promise<Challenge>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The ID of the challenge you want to find. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Challenge](/api/classes/challenge) \>

---

#### .fetchAll ()

Fetch all challenges.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Collection<number, Challenge>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options (force is ignored here). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Challenge](/api/classes/challenge) \> \>

---

#### .fetchLeaderboard ()

Fetch the leader board of a challenge.




**Signature:**

```ts
fetchLeaderboard(id: number, level: 'MASTER' | 'GRANDMASTER' | 'CHALLENGER', options?: FetchOptions & {
        limit: number;
    }): Promise<ChallengeRank[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The ID of the challenge whose leaderboard you want to find. |
| level | 'MASTER' \| 'GRANDMASTER' \| 'CHALLENGER' | The tier of the leaderboard. |
| options | [FetchOptions](/api/interfaces/fetchoptions) & {         limit: number;     } | The basic fetching options, with an additional limit option. Limit (or count) is 200 by default. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [ChallengeRank](/api/classes/challengerank)[] \>

---

#### .fetchSummonerProgression ()

Fetch the progress of a summoner in the challenges.




**Signature:**

```ts
fetchSummonerProgression(playerId: string, options?: FetchOptions): Promise<SummonerChallenge>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| playerId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The player ID (puuid) of the summoner whose progress you want to find. |
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [SummonerChallenge](/api/classes/summonerchallenge) \>

---

