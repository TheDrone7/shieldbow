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

Implements: BaseManager&lt;CurrentGame&gt;

**References:** [BaseManager](/api/BaseManager.md), [CurrentGame](/api/CurrentGame.md)

---

### Constructor

```ts
new CurrentGameManager (client: Client)
```

Constructs a new instance of the `CurrentGameManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that instantiated the manager. |
---

### Properties

#### cache

The cached live games (mapped by summoner IDs).



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [CurrentGame](/api/CurrentGame.md) \>

---

#### client

The client that instantiated the manager.



**Type**: [Client](/api/Client.md)

---

### Methods

#### .fetch (id, options)

Fetches the live game for the given summoner ID.


This method is a special case where the cache is ignored by default.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<CurrentGame>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner ID to fetch the live game for. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [CurrentGame](/api/CurrentGame.md) \>

---

#### .fetchFeatured (options)

Fetch a list of featured games. These games are not cached.




**Signature:**

```ts
fetchFeatured(options?: FetchOptions): Promise<CurrentGame[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options (force and cache are ignored). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [CurrentGame](/api/CurrentGame.md)[] \>

---

