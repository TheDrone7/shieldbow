---
title: LeagueManager
description: A league manager - to fetch and manage all summoner competitive info.
---

## LeagueManager class

A league manager - to fetch and manage all summoner competitive info.

**Signature:**

```ts
export declare class LeagueManager implements BaseManager<Collection<QueueType, LeagueEntry>> 
```

Implements: [BaseManager](/shieldbow/api/BaseManager.md)<[Collection](/shieldbow/api/Collection.md)<[QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md)>

**References:** [BaseManager](/shieldbow/api/BaseManager.md), Collection, [QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md)

---

### Constructor

```ts
new LeagueManager (client: Client)
```

Constructs a new instance of the `LeagueManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
---

### Properties

#### cache

The competitive info (mapped by summoner ID) stored in the memory.



**Type**: Collection\<string, Collection\<[QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md)\>\>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetch a summoner's competitive info by the summoner's ID.




**Signature:**

```ts
fetch(id: string, options?: {
        force: boolean;
    }): Promise<Collection<QueueType, LeagueEntry>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | string | The ID of the summoner whose competitive info you want to find. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<Collection\<[QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md)\>\>

---

#### .fetchByLeagueId (leagueId)

Fetch the league entries by a league ID.




**Signature:**

```ts
fetchByLeagueId(leagueId: string): Promise<LeagueList>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| leagueId | string | The League ID. |

**Return type**: Promise\<[LeagueList](/shieldbow/api/LeagueList.md)\>

---

#### .fetchByQueueAndTier (queue, tier, division, page)

Fetch a collection of league entries by the queue type, tier and division.




**Signature:**

```ts
fetchByQueueAndTier(queue: QueueType, tier: TierType, division: DivisionType, page?: number): Promise<Collection<string, LeagueEntry>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| queue | [QueueType](/shieldbow/api/QueueType.md) | The type of queue - RANKED_SOLO_5x5, RANKED_FLEX_SR, etc. |
| tier | [TierType](/shieldbow/api/TierType.md) | The tier of the entries - IRON to CHALLENGER. |
| division | [DivisionType](/shieldbow/api/DivisionType.md) | The division of the entries - I, II, III, IV. |
| page | number | The page number (defaults to 1). |

**Return type**: Promise\<Collection\<string, [LeagueEntry](/shieldbow/api/LeagueEntry.md)\>\>

---

