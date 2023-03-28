---
title: LeagueManager
description: A league manager - to fetch and manage all summoner competitive info.   Requires API key with access to `league-v4` and `league-exp-v4` API.
---

# LeagueManager class

---

A league manager - to fetch and manage all summoner competitive info.   Requires API key with access to `league-v4` and `league-exp-v4` API.

**Signature:**

```ts
export declare class LeagueManager implements BaseManager<Collection<QueueType, LeagueEntry>> 
```

Implements: BaseManager&lt;Collection&lt;QueueType, LeagueEntry&gt;&gt;

**References:** [BaseManager](/api/basemanager), [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection), [QueueType](/api/queuetype), [LeagueEntry](/api/leagueentry)

---

### Constructor

```ts
new LeagueManager (client: Client)
```

Constructs a new instance of the `LeagueManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client this league manager belongs to. |
---

### Properties

#### client

The client this league manager belongs to.



**Type**: [Client](/api/client)

---

### Methods

#### .fetch ()

Fetch a summoner's competitive info by the summoner's ID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<Collection<QueueType, LeagueEntry>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the summoner whose competitive info you want to find. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [QueueType](/api/queuetype), [LeagueEntry](/api/leagueentry) \> \>

---

#### .fetchByLeagueId ()

Fetch the league entries by a league ID.




**Signature:**

```ts
fetchByLeagueId(leagueId: string, options?: FetchOptions): Promise<LeagueList>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| leagueId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The League ID. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options (exception: `force` defaults to true). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [LeagueList](/api/leaguelist) \>

---

#### .fetchByQueueAndTier ()

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
| queue | [QueueType](/api/queuetype) | The type of queue - RANKED_SOLO_5x5, RANKED_FLEX_SR, etc. |
| tier | [TierType](/api/tiertype) | The tier of the entries - IRON to CHALLENGER. |
| division | [DivisionType](/api/divisiontype) | The division of the entries - I, II, III, IV. |
| options | [FetchOptions](/api/fetchoptions) & {         page: number;     } | The basic fetching options (and page number - defaults to 1). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [LeagueEntry](/api/leagueentry) \> \>

---

