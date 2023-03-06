---
title: CurrentGameManager
description: A current game manager - to fetch and manage the live games.   Requires API key with access to `spectator-v4` API.
---

# CurrentGameManager class

---

A current game manager - to fetch and manage the live games.   Requires API key with access to `spectator-v4` API.

**Signature:**

```ts
export declare class CurrentGameManager implements BaseManager<CurrentGame> 
```

Implements: BaseManager&lt;CurrentGame&gt;

**References:** [BaseManager](/api/basemanager), [CurrentGame](/api/currentgame)

---

### Constructor

```ts
new CurrentGameManager (client: Client)
```

Constructs a new instance of the `CurrentGameManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client this current game manager belongs to. |
---

### Properties

#### client

The client this current game manager belongs to.



**Type**: [Client](/api/client)

---

### Methods

#### .fetch ()

Fetches the live game for the given summoner ID.




**Signature:**

```ts
fetch(id: string, options?: FetchOptions): Promise<CurrentGame>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| id | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The summoner ID to fetch the live game for. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [CurrentGame](/api/currentgame) \>

---

#### .fetchFeatured ()

Fetch a list of featured games.




**Signature:**

```ts
fetchFeatured(options?: FetchOptions): Promise<CurrentGame[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options (does not fetch from storage or cache). |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [CurrentGame](/api/currentgame)[] \>

---

