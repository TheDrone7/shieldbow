---
title: MatchManager
description: A match manager - to fetch and manage matches.
---

# MatchManager class

---

A match manager - to fetch and manage matches.

**Signature:**

```ts
export declare class MatchManager implements BaseManager<Match> 
```

Implements: BaseManager&lt;Match&gt;

**References:** [BaseManager](/api/interfaces/basemanager), [Match](/api/classes/match)

---

### Constructor

```ts
new MatchManager (client: Client)
```

Constructs a new instance of the `MatchManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) | The client this match manager belongs to. |
---

### Properties

#### client

The client this match manager belongs to.



**Type**: [Client](/api/classes/client)

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
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetch options |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Match](/api/classes/match) \>

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
| player | [Summoner](/api/classes/summoner) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner or their player ID whose matches need to be fetched. |
| options | [MatchByPlayerOptions](/api/interfaces/matchbyplayeroptions) | The options for filtering the matches. |

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
| options | [FetchOptions](/api/interfaces/fetchoptions) | The basic fetch options |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [MatchTimeline](/api/classes/matchtimeline) \>

---

