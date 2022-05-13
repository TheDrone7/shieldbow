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

Implements: BaseManager<Collection<QueueType, LeagueEntry\>

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection), [QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md)

---

### Constructor

```ts
new LeagueManager (client: Client)
```

Constructs a new instance of the `LeagueManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client that instantiated this manager. |
---

### Properties

#### cache

The competitive info (mapped by summoner ID) stored in the memory.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md) \> \>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.md)

---

#### listCache

The in-memory cache for league lists.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [LeagueList](/shieldbow/api/LeagueList.md) \>

---

### Methods

#### .fetch (id, options)

Fetch a summoner's competitive info by the summoner's ID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<Collection<QueueType, LeagueEntry>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the summoner whose competitive info you want to find. |
| options | [FetchOptions](/shieldbow/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [QueueType](/shieldbow/api/QueueType.md), [LeagueEntry](/shieldbow/api/LeagueEntry.md) \> \>

---

#### .fetchByLeagueId (leagueId, options)

Fetch the league entries by a league ID.




**Signature:**

```ts
fetchByLeagueId(leagueId: string, options?: FetchOptions): Promise<LeagueList>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| leagueId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The League ID. |
| options | [FetchOptions](/shieldbow/api/FetchOptions.md) | The basic fetching options (exception: `force` defaults to true). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [LeagueList](/shieldbow/api/LeagueList.md) \>

---

#### .fetchByQueueAndTier (queue, tier, division, options)

Fetch a collection of league entries by the queue type, tier and division.




**Signature:**

```ts
fetchByQueueAndTier(queue: QueueType, tier: TierType, division: DivisionType, options?: FetchOptions & {
        page: number;
    }): Promise<Collection<string, LeagueEntry>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| queue | [QueueType](/shieldbow/api/QueueType.md) | The type of queue - RANKED_SOLO_5x5, RANKED_FLEX_SR, etc. |
| tier | [TierType](/shieldbow/api/TierType.md) | The tier of the entries - IRON to CHALLENGER. |
| division | [DivisionType](/shieldbow/api/DivisionType.md) | The division of the entries - I, II, III, IV. |
| options | [FetchOptions](/shieldbow/api/FetchOptions.md) & {         page: number;     } | The basic fetching options (and page number - defaults to 1, force is ignored - always true). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [LeagueEntry](/shieldbow/api/LeagueEntry.md) \> \>

---

