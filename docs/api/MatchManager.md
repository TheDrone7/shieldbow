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

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [Match](/shieldbow/api/Match.md)

---

### Constructor

```ts
new MatchManager (client: Client)
```

Constructs a new instance of the `MatchManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
---

### Properties

#### cache

The collection of cached matches.



**Type**: Collection\<string, [Match](/shieldbow/api/Match.md)\>

---

#### client

The client that instantiated the manager.



**Type**: [Client](/shieldbow/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetch a match by its ID.




**Signature:**

```ts
fetch(id: string, options?: {
        force: boolean;
    }): Promise<Match>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | string | The ID of the match |
| options | {         force: boolean;     } | The basic fetch options |

**Return type**: Promise\<[Match](/shieldbow/api/Match.md)\>

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
| player | [Summoner](/shieldbow/api/Summoner.md) \| string | The summoner or their player ID whose matches need to be fetched. |
| options | [MatchByPlayerOptions](/shieldbow/api/MatchByPlayerOptions.md) | The options for filtering the matches. |

**Return type**: Promise\<string[]\>

---

