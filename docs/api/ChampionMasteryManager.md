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

Implements: [BaseManager](/shieldbow/api/BaseManager.md)<[ChampionMastery](/shieldbow/api/ChampionMastery.md)>

**References:** [BaseManager](/shieldbow/api/BaseManager.md), [ChampionMastery](/shieldbow/api/ChampionMastery.md)

---

### Constructor

```ts
new ChampionMasteryManager (client: Client, summoner: string)
```

Constructs a new instance of the `ChampionMasteryManager` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
| summoner | string |  |
---

### Properties

#### cache

The cached mastery data for the summoner.



**Type**: Collection\<string, [ChampionMastery](/shieldbow/api/ChampionMastery.md)\>

---

#### client

The client this manager belongs to.



**Type**: [Client](/shieldbow/api/Client.md)

---

#### sortedCache

The cached champion masteries of the summoner as a sorted array.


The array is sorted from the highest mastery to lowest. While sorting, the mastery level is prioritized over the number of points.



**Type**: [ChampionMastery](/shieldbow/api/ChampionMastery.md)[]

---

#### summonerId

The ID of the summoner whose mastery is managed by this manager.



**Type**: string

---

#### totalScore

The total mastery score of this summoner.



**Type**: number

---

### Methods

#### .fetch (champion, options)

Fetch a champion's mastery data for the summoner.




**Signature:**

```ts
fetch(champion: Champion | string, options?: {
        force: boolean;
    }): Promise<ChampionMastery>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| champion | [Champion](/shieldbow/api/Champion.md) \| string | The champion (or its ID) whose mastery data needs to be fetched. |
| options | {         force: boolean;     } | The basic fetching options. |

**Return type**: Promise\<[ChampionMastery](/shieldbow/api/ChampionMastery.md)\>

---

#### .highest (n)

Get the nth highest champion mastery for the summoner.




**Signature:**

```ts
highest(n?: number): Promise<ChampionMastery>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| n | number | The ranking of the champion in the summoner's champions mastery, defaults to 0 (highest). |

**Return type**: Promise\<[ChampionMastery](/shieldbow/api/ChampionMastery.md)\>

---

#### .refreshAll ()

Update the cache with the latest data for all champions' mastery data for this summoner.



**Signature:**

```ts
refreshAll(): Promise<Collection<string, ChampionMastery>>;
```


**Return type**: Promise\<Collection\<string, [ChampionMastery](/shieldbow/api/ChampionMastery.md)\>\>

---

#### .updateTotalScore ()

Get an updated total mastery score for this summoner.



**Signature:**

```ts
updateTotalScore(): Promise<number>;
```


**Return type**: Promise\<number\>

---

