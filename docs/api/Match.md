---
title: Match
description: A representation of a league of legends match.
---

## Match class

A representation of a league of legends match.

**Signature:**

```ts
export declare class Match 
```

---

### Constructor

```ts
new Match (client: Client, data: MatchData, champions: Collection<string, Champion>, items: Collection<string, Item>)
```

Constructs a new instance of the `Match` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client requesting the data. |
| data | [MatchData](/api/MatchData.md) | The raw match data from the API. |
| champions | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \> | The champions involved in the match. |
| items | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/Item.md) \> | The items used in the match. |
---

### Properties

#### createdTimestamp

The timestamp of creation of the match (before summoners spawn on the rift).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### duration

The duration of the match (in seconds).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### endTimestamp

The timestamp of the end of the match.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### gameId

The ID of the game.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### gameMode

The game mode for the match.



**Type**: [GameMode](/api/GameMode.md)

---

#### gameName

The name of the match.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### gameType

The type of game.



**Type**: [GameType](/api/GameType.md)

---

#### gameVersion

The version of the game.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### id

The match ID.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### map

The map on which the match was played.



**Type**: [GameMap](/api/GameMap.md)

---

#### queue

The queue type of the match.



**Type**: [Queue](/api/Queue.md)

---

#### region

The region in which the match was played.


Eg: `NA` or `EUW`.



**Type**: [Region](/api/Region.md)

---

#### startTimestamp

The timestamp of the beginning of the match (when summoners spawn on the rift).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### teams

The 2 teams participating in the match.


They are mapped by their map sides (`blue` and `red`).



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'blue' \| 'red', [Team](/api/Team.md) \>

---

#### tournamentCode

The tournament code of the match (if it is the part of a tournament).



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### version

The data version of the match.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

### Methods

#### .fetchTimeline ()

Fetch the timeline of the match.



**Signature:**

```ts
fetchTimeline(): Promise<MatchTimeline>;
```


**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [MatchTimeline](/api/MatchTimeline.md) \>

---

