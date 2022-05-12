---
title: LeagueEntry
description: A representation of a summoner's competitive details.
---

## LeagueEntry class

A representation of a summoner's competitive details.

**Signature:**

```ts
export declare class LeagueEntry 
```

---

### Constructor

```ts
new LeagueEntry (client: Client, data: LeagueEntryData)
```

Constructs a new instance of the `LeagueEntry` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [LeagueEntryData](/shieldbow/api/LeagueEntryData.html) |  |
---

### Properties

#### division

The division under the tier - From 1 to 4 (I - IV).



**Type**: [DivisionType](/shieldbow/api/DivisionType.html)

---

#### freshBlood

Whether the summoner is new to the game.



**Type**: boolean

---

#### hotStreak

Whether the summoner is on a hot streak.



**Type**: boolean

---

#### inactive

Whether the summoner has been inactive.



**Type**: boolean

---

#### league

The league ID.



**Type**: string

---

#### losses

The number of losses the summoner has in this queue.



**Type**: number

---

#### lp

The amount of league points (LP) the summoner has.



**Type**: number

---

#### promos

This only exists if the summoner is in a promotion series.



**Type**: {         readonly target: number;         readonly wins: number;         readonly losses: number;         readonly progress: string;     }

---

#### queueType

The type of queue - such as RANKED_SOLO_5x5, RANKED_FLEX_SR or RANKED_FLEX_TT.



**Type**: [QueueType](/shieldbow/api/QueueType.html)

---

#### summoner

The summoner this data belongs to.


Uses [SummonerManager.fetch](/shieldbow/api/SummonerManager.html#fetch) to get the summoner.



**Type**: Promise\<[Summoner](/shieldbow/api/Summoner.html)\>

---

#### summonerId

The ID of the summoner this data belongs to.



**Type**: string

---

#### summonerName

The name of the summoner this data belongs to.



**Type**: string

---

#### tier

The tier the summoner belongs to - such as BRONZE, GOLD, etc.



**Type**: [TierType](/shieldbow/api/TierType.html)

---

#### veteran

Whether the summoner is a veteran or a pro player.



**Type**: boolean

---

#### wins

The number of wins the summoner has in this queue.



**Type**: number

---

