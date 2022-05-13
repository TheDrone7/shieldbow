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

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [Tournament](/shieldbow/api/Tournament.md)

---

### Constructor

```ts
new ClashManager (client: Client)
```

Constructs a new instance of the `ClashManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client that instantiated the manager. |
---

### Properties

#### cache

The in-memory cache of tournaments.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Tournament](/shieldbow/api/Tournament.md) \>

---

#### client

The client that instantiated the manager.



**Type**: [Client](/shieldbow/api/Client.md)

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
| options | [FetchOptions](/shieldbow/api/FetchOptions.md) | The basic fetch options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/shieldbow/api/Tournament.md) \>

---

#### .fetchAll ()

Fetch all upcoming and active tournaments.



**Signature:**

```ts
fetchAll(): Promise<Tournament[]>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/shieldbow/api/Tournament.md)[] \>

---

#### .fetchByTeamId (teamId)

Fetch tournament by participating team's ID.




**Signature:**

```ts
fetchByTeamId(teamId: string): Promise<Tournament>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Tournament](/shieldbow/api/Tournament.md) \>

---

#### .fetchPlayer (summonerId)

Fetch participation info of a summoner in tournaments by the summoner ID.




**Signature:**

```ts
fetchPlayer(summonerId: string): Promise<TournamentPlayer[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| summonerId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the summoner. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [TournamentPlayer](/shieldbow/api/TournamentPlayer.md)[] \>

---

#### .fetchTeam (teamId)

Fetch a team participating in a tournament by the team ID.




**Signature:**

```ts
fetchTeam(teamId: string): Promise<TournamentTeam>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [TournamentTeam](/shieldbow/api/TournamentTeam.md) \>

---

