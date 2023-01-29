---
title: MatchManager
description: A match manager - to fetch and manage matches.
---

## MatchManager class

A match manager - to fetch and manage matches.

**Signature:**

```ts
export declare class MatchManager implements BaseManager<Match> 
```

Implements: BaseManager&lt;Match&gt;

**References:** [BaseManager](/api/BaseManager.md), [Match](/api/Match.md)

---

### Constructor

```ts
new MatchManager (client: Client)
```

Constructs a new instance of the `MatchManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client this match manager belongs to. |
---

### Properties

#### client

The client this match manager belongs to.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch ()

Fetch a match by its ID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<Match>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the match |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Match](/api/Match.md) \>

---

#### .fetchMatchListByPlayer ()

Fetch a list of match IDs by a player ID. These are neither stored nor cached.




**Signature:**

```ts
fetchMatchListByPlayer(player: Summoner | string, options?: MatchByPlayerOptions): Promise<string[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| player | [Summoner](/api/Summoner.md) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner or their player ID whose matches need to be fetched. |
| options | [MatchByPlayerOptions](/api/MatchByPlayerOptions.md) | The options for filtering the matches. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] \>

---

#### .fetchMatchTimeline ()

Fetch a match timeline by the match ID.




**Signature:**

```ts
fetchMatchTimeline(matchId: string, options?: FetchOptions): Promise<MatchTimeline>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| matchId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the match |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [MatchTimeline](/api/MatchTimeline.md) \>

---

