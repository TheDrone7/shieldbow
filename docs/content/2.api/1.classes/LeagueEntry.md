---
title: LeagueEntry
description: A representation of a summoner's competitive details.
---

# LeagueEntry class

---

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
| client | [Client](/api/client) | The client requesting the data. |
| data | [LeagueEntryData](/api/leagueentrydata) | The raw league entry data from the API. |
---

### Properties

#### division

The division under the tier - From 1 to 4 (I - IV).



**Type**: [DivisionType](/api/divisiontype)

---

#### freshBlood

Whether the summoner is new to the game.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### hotStreak

Whether the summoner is on a hot streak.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### inactive

Whether the summoner has been inactive.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### league

The league ID.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### losses

The number of losses the summoner has in this queue.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### lp

The amount of league points (LP) the summoner has.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### promos

This only exists if the summoner is in a promotion series.



**Type**: [Promos](/api/promos)

---

#### queueType

The type of queue - such as RANKED_SOLO_5x5, RANKED_FLEX_SR or RANKED_FLEX_TT.



**Type**: [QueueType](/api/queuetype)

---

#### summonerId

The ID of the summoner this data belongs to.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### summonerName

The name of the summoner this data belongs to.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### tier

The tier the summoner belongs to - such as BRONZE, GOLD, etc.



**Type**: [TierType](/api/tiertype)

---

#### veteran

Whether the summoner is a veteran or a pro player.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### wins

The number of wins the summoner has in this queue.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

### Methods

#### .fetchSummoner ()

Fetch the summoner this data belongs to.




**Signature:**

```ts
fetchSummoner(options?: FetchOptions): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/summoner) \>

---

