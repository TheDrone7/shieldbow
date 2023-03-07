---
title: ChampionMasteryManager
description: A champion mastery manager - to fetch and manage all summoner's champion mastery data.   Requires API key with access to `champion-mastery-v4` API.
---

# ChampionMasteryManager class

---

A champion mastery manager - to fetch and manage all summoner's champion mastery data.   Requires API key with access to `champion-mastery-v4` API.

**Signature:**

```ts
export declare class ChampionMasteryManager implements BaseManager<ChampionMastery> 
```

Implements: BaseManager&lt;ChampionMastery&gt;

**References:** [BaseManager](/api/basemanager), [ChampionMastery](/api/championmastery)

---

### Constructor

```ts
new ChampionMasteryManager (client: Client, summoner: Summoner)
```

Constructs a new instance of the `ChampionMasteryManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client this champion mastery manager belongs to. |
| summoner | [Summoner](/api/summoner) | The summoner this manager belongs to. |
---

### Properties

#### client

The client this champion mastery manager belongs to.



**Type**: [Client](/api/client)

---

#### summoner

The ID of the summoner whose mastery is managed by this manager.



**Type**: [Summoner](/api/summoner)

---

#### totalScore

The total mastery score of this summoner.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

### Methods

#### .fetch ()

Fetch a champion's mastery data for the summoner.




**Signature:**

```ts
fetch(champion: Champion | string, options?: FetchOptions): Promise<ChampionMastery>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| champion | [Champion](/api/champion) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The champion (or its ID) whose mastery data needs to be fetched. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [ChampionMastery](/api/championmastery) \>

---

#### .fetchAll ()

Fetches all the champions' masteries data for this summoner and store them in the cache.



**Signature:**

```ts
fetchAll(options?: FetchOptions): Promise<Collection<string, ChampionMastery>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/fetchoptions) |  |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [ChampionMastery](/api/championmastery) \> \>

---

#### .fetchTop ()

Fetches the top n champions' mastery data for this summoner. They are already sorted by mastery level.




**Signature:**

```ts
fetchTop(n?: number, options?: FetchOptions): Promise<ChampionMastery[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| n | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The number of champions to fetch, defaults to 3. |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [ChampionMastery](/api/championmastery)[] \>

---

#### .highest ()

Get the nth highest champion mastery for the summoner.




**Signature:**

```ts
highest(n?: number, options?: FetchOptions): Promise<ChampionMastery>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| n | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The ranking of the champion in the summoner's champions mastery, defaults to 0 (highest). |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [ChampionMastery](/api/championmastery) \>

---

#### .updateTotalScore ()

Get an updated total mastery score for this summoner.



**Signature:**

```ts
updateTotalScore(): Promise<number>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \>

---

