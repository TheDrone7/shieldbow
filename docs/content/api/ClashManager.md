---
title: ClashManager
description: A clash manager - to fetch and store clash tournaments and related data.   Requires API key with access to `clash-v1` API.
---

# ClashManager class

---

A clash manager - to fetch and store clash tournaments and related data.   Requires API key with access to `clash-v1` API.

**Signature:**

```ts
export declare class ClashManager implements BaseManager<Tournament> 
```

Implements: BaseManager&lt;Tournament&gt;

**References:** [BaseManager](/api/basemanager), [Tournament](/api/tournament)

---

### Constructor

```ts
new ClashManager (client: Client)
```

Constructs a new instance of the `ClashManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client this clash manager belongs to. |
---

### Properties

#### client

The client this clash manager belongs to.



**Type**: [Client](/api/client)

---

### Methods

#### .fetch ()

Fetch a clash tournament by its ID.




**Signature:**

```ts
fetch(id: number, options?: FetchOptions): Promise<Tournament>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The ID of the clash tournament. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/api/tournament) \>

---

#### .fetchAll ()

Fetch all upcoming and active clash tournaments.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Tournament[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/fetchoptions) | The basic fetch options (always fetches from the API, skipping cache and storage). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/api/tournament)[] \>

---

#### .fetchByTeamId ()

Fetch a clash tournament by participating team's ID.




**Signature:**

```ts
fetchByTeamId(teamId: string, options?: FetchOptions): Promise<Tournament>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetch options (always fetches from API, skipping cache and storage). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/api/tournament) \>

---

#### .fetchPlayer ()

Fetch participation info of a summoner in clash tournaments by the summoner ID.




**Signature:**

```ts
fetchPlayer(summonerId: string, options?: FetchOptions): Promise<TournamentPlayer[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| summonerId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the summoner. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [TournamentPlayer](/api/tournamentplayer)[] \>

---

#### .fetchTeam ()

Fetch a team participating in a clash tournament by the team ID.




**Signature:**

```ts
fetchTeam(teamId: string, options?: FetchOptions): Promise<TournamentTeam>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [TournamentTeam](/api/tournamentteam) \>

---

