---
title: CurrentGame
description: A representation of an ongoing game.
---

## CurrentGame class

A representation of an ongoing game.

**Signature:**

```ts
export declare class CurrentGame 
```

---

### Constructor

```ts
new CurrentGame (client: Client, data: CurrentGameData, champions: Collection<string, Champion>, runeTrees: Collection<string, RuneTree>)
```

Constructs a new instance of the `CurrentGame` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [CurrentGameData](/api/CurrentGameData.md) | The raw current game data from the API. |
| champions | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/Champion.md) \> | The champions that are involved in the game. |
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/RuneTree.md) \> | The collection of the runes in the game. |
---

### Properties

#### id

The numerical ID of the game.


Combining this with the [CurrentGame.platform](/api/CurrentGame.md#platform) gives the full ID of the game. The full ID can be used to fetch all the details of the match after it has ended using [MatchManager.fetch](/api/MatchManager.md#fetch).



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### length

The amount of time (in seconds) that has passed since the game started.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### map

The map on which the game is being played.



**Type**: [GameMap](/api/GameMap.md)

---

#### matchId

The match ID for fetching the match details after the game is over.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### mode

The game mode.



**Type**: [GameMode](/api/GameMode.md)

---

#### observerKey

The observer key for the game.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### platform

The platform (server) on which the game is being played.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### queue

The type of queue for the game.



**Type**: [Queue](/api/Queue.md)

---

#### startTimestamp

The time at which the game started.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### teams

A collection of the participating teams.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'red' \| 'blue', [CurrentGameTeam](/api/CurrentGameTeam.md) \>

---

#### type

The type of game.



**Type**: [GameType](/api/GameType.md)

---

