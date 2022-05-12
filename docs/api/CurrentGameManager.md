---
title: CurrentGameManager
description: A current game manager - to fetch and manage the live games.
---

## CurrentGameManager class

A current game manager - to fetch and manage the live games.

**Signature:**

```ts
export declare class CurrentGameManager implements BaseManager<CurrentGame> 
```

Implements: [BaseManager](/shieldbow/api/BaseManager.md)<[CurrentGame](/shieldbow/api/CurrentGame.md)>

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [CurrentGame](/shieldbow/api/CurrentGame.md)

---

### Constructor

```ts
new CurrentGameManager (client: Client)
```

Constructs a new instance of the `CurrentGameManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
---

### Properties

#### cache

The cached live games (mapped by summoner IDs).



**Type**: Collection\<string, [CurrentGame](/shieldbow/api/CurrentGame.md)\>

---

#### client

The client that instantiated the manager.



**Type**: [Client](/shieldbow/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetches the live game for the given summoner ID.


This method is a special case where the cache is ignored by default.




**Signature:**

```ts
fetch(id: string, options?: {
        force: boolean;
    }): Promise<CurrentGame>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | string | The summoner ID to fetch the live game for. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[CurrentGame](/shieldbow/api/CurrentGame.md)\>

---

#### .fetchFeatured ()

Fetch a list of featured games. These games are not cached.



**Signature:**

```ts
fetchFeatured(): Promise<CurrentGame[]>;
```


**Return type**: Promise\<[CurrentGame](/shieldbow/api/CurrentGame.md)[]\>

---

