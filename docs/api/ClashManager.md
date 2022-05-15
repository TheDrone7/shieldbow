---
title: ClashManager
description: A clash manager - to fetch and store clash tournaments and related data.
---

## ClashManager class

A clash manager - to fetch and store clash tournaments and related data.

**Signature:**

```ts
export declare class ClashManager implements BaseManager<Tournament> 
```

Implements: BaseManager<Tournament\>

**References:** [BaseManager](/api/BaseManager.md), [Tournament](/api/Tournament.md)

---

### Constructor

```ts
new ClashManager (client: Client)
```

Constructs a new instance of the `ClashManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that instantiated the manager. |
---

### Properties

#### cache

The in-memory cache of tournaments.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Tournament](/api/Tournament.md) \>

---

#### cachedPlayers

The in-memory cache of the tournament players.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [TournamentPlayer](/api/TournamentPlayer.md)[] \>

---

#### cachedTeams

The in-memory cache of the tournament teams.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [TournamentTeam](/api/TournamentTeam.md) \>

---

#### client

The client that instantiated the manager.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetches a tournament by its ID.




**Signature:**

```ts
fetch(id: number, options?: FetchOptions): Promise<Tournament>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The ID of the tournament. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/api/Tournament.md) \>

---

#### .fetchAll (options)

Fetch all upcoming and active tournaments.




**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Tournament[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options (force is ignored, always true). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/api/Tournament.md)[] \>

---

#### .fetchByTeamId (teamId, options)

Fetch tournament by participating team's ID.




**Signature:**

```ts
fetchByTeamId(teamId: string, options?: FetchOptions): Promise<Tournament>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options (force is ignored, always true). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/api/Tournament.md) \>

---

#### .fetchPlayer (summonerId, options)

Fetch participation info of a summoner in tournaments by the summoner ID.




**Signature:**

```ts
fetchPlayer(summonerId: string, options?: FetchOptions): Promise<TournamentPlayer[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| summonerId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the summoner. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [TournamentPlayer](/api/TournamentPlayer.md)[] \>

---

#### .fetchTeam (teamId, options)

Fetch a team participating in a tournament by the team ID.




**Signature:**

```ts
fetchTeam(teamId: string, options?: FetchOptions): Promise<TournamentTeam>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [TournamentTeam](/api/TournamentTeam.md) \>

---

