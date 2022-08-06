---
title: ChampionMasteryManager
description: A champion mastery manager - to fetch and manage all summoner's champion mastery data.
---

## ChampionMasteryManager class

A champion mastery manager - to fetch and manage all summoner's champion mastery data.

**Signature:**

```ts
export declare class ChampionMasteryManager implements BaseManager<ChampionMastery> 
```

Implements: BaseManager<ChampionMastery\>

**References:** [BaseManager](/api/BaseManager.md), [ChampionMastery](/api/ChampionMastery.md)

---

### Constructor

```ts
new ChampionMasteryManager (client: Client, summoner: Summoner)
```

Constructs a new instance of the `ChampionMasteryManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that instantiated this manager. |
| summoner | [Summoner](/api/Summoner.md) | The summoner this manager belongs to. |
---

### Properties

#### cache

The cached mastery data for the summoner.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [ChampionMastery](/api/ChampionMastery.md) \>

---

#### client

The client this manager belongs to.



**Type**: [Client](/api/Client.md)

---

#### sortedCache

The cached champion masteries of the summoner as a sorted array.


The array is sorted from the highest mastery to lowest. While sorting, the mastery level is prioritized over the number of points.



**Type**: [ChampionMastery](/api/ChampionMastery.md)[]

---

#### summoner

The ID of the summoner whose mastery is managed by this manager.



**Type**: [Summoner](/api/Summoner.md)

---

#### totalScore

The total mastery score of this summoner.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

### Methods

#### .fetch (champion, options)

Fetch a champion's mastery data for the summoner.




**Signature:**

```ts
fetch(champion: Champion | string, options?: FetchOptions): Promise<ChampionMastery>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| champion | [Champion](/api/Champion.md) \| [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The champion (or its ID) whose mastery data needs to be fetched. |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [ChampionMastery](/api/ChampionMastery.md) \>

---

#### .highest (n, options)

Get the nth highest champion mastery for the summoner.




**Signature:**

```ts
highest(n?: number, options?: FetchOptions): Promise<ChampionMastery>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| n | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | The ranking of the champion in the summoner's champions mastery, defaults to 0 (highest). |
| options | [FetchOptions](/api/FetchOptions.md) |  |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [ChampionMastery](/api/ChampionMastery.md) \>

---

#### .refreshAll ()

Update the cache with the latest data for all champions' mastery data for this summoner.



**Signature:**

```ts
refreshAll(): Promise<Collection<string, ChampionMastery>>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [ChampionMastery](/api/ChampionMastery.md) \> \>

---

#### .updateTotalScore ()

Get an updated total mastery score for this summoner.



**Signature:**

```ts
updateTotalScore(): Promise<number>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) \>

---

