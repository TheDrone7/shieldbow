---
title: LeagueList
description: A representation of a list of league entries.
---

## LeagueList class

A representation of a list of league entries.

**Signature:**

```ts
export declare class LeagueList 
```

---

### Constructor

```ts
new LeagueList (client: Client, data: LeagueListData)
```

Constructs a new instance of the `LeagueList` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [LeagueListData](/shieldbow/api/LeagueListData.html) |  |
---

### Properties

#### entries

The list of entries of the league ID.


These are mapped by the summoner name.



**Type**: Collection\<string, [LeagueEntry](/shieldbow/api/LeagueEntry.html)\>

---

#### leagueId

The competitive league ID.



**Type**: string

---

#### name

The name for the league of the entries in this list.



**Type**: string

---

#### queue

The type of queue - such as RANKED_SOLO_5x5, RANKED_FLEX_SR, RANKED_FLEX_TT.



**Type**: [QueueType](/shieldbow/api/QueueType.html)

---

#### tier

The tier of the entries in this list.



**Type**: [TierType](/shieldbow/api/TierType.html)

---

