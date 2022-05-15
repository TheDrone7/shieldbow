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

Implements: BaseManager<Match\>

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
| client | [Client](/api/Client.md) | The client that instantiated the manager. |
---

### Properties

#### cache

The collection of cached matches.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Match](/api/Match.md) \>

---

#### client

The client that instantiated the manager.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch (id, options)

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

#### .fetchMatchListByPlayer (player, options)

Fetch a list of match IDs by a player ID.




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

