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
| client | [Client](/api/Client.md) | The client requesting the data. |
| data | [LeagueListData](/api/LeagueListData.md) | The raw league list data from the API. |
---

### Properties

#### entries

The list of entries of the league ID.


These are mapped by the summoner name.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [LeagueEntry](/api/LeagueEntry.md) \>

---

#### leagueId

The competitive league ID.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### name

The name for the league of the entries in this list.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### queue

The type of queue - such as RANKED_SOLO_5x5, RANKED_FLEX_SR, RANKED_FLEX_TT.



**Type**: [QueueType](/api/QueueType.md)

---

#### tier

The tier of the entries in this list.



**Type**: [TierType](/api/TierType.md)

---

