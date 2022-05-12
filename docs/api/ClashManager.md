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
| client | [Client](/shieldbow/api/Client.md) |  |
---

### Properties

#### cache

The in-memory cache of tournaments.



**Type**: Collection\<number, [Tournament](/shieldbow/api/Tournament.md)\>

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
fetch(id: number, options?: {
        force: boolean;
    }): Promise<Tournament>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | number | The ID of the tournament. |
| options | {         force: boolean;     } | The basic fetch options. |

**Return type**: Promise\<[Tournament](/shieldbow/api/Tournament.md)\>

---

#### .fetchAll ()

Fetch all upcoming and active tournaments.



**Signature:**

```ts
fetchAll(): Promise<Tournament[]>;
```


**Return type**: Promise\<[Tournament](/shieldbow/api/Tournament.md)[]\>

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
| teamId | string | The ID of the team. |

**Return type**: Promise\<[Tournament](/shieldbow/api/Tournament.md)\>

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
| summonerId | string | The ID of the summoner. |

**Return type**: Promise\<[TournamentPlayer](/shieldbow/api/TournamentPlayer.md)[]\>

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
| teamId | string | The ID of the team. |

**Return type**: Promise\<[TournamentTeam](/shieldbow/api/TournamentTeam.md)\>

---

