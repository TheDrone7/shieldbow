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
new CurrentGame (client: Client, data: CurrentGameData)
```

Constructs a new instance of the `CurrentGame` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client that requested this data. |
| data | [CurrentGameData](/shieldbow/api/CurrentGameData.md) | The raw current game data from the API. |
---

### Properties

#### id

The numerical ID of the game.


Combining this with the [CurrentGame.platform](/shieldbow/api/CurrentGame.md#platform) gives the full ID of the game. The full ID can be used to fetch all the details of the match after it has ended using [MatchManager.fetch](/shieldbow/api/MatchManager.md#fetch).



**Type**: number

---

#### length

The amount of time (in seconds) that has passed since the game started.



**Type**: number

---

#### map

The map on which the game is being played.



**Type**: [GameMap](/shieldbow/api/GameMap.md)

---

#### mode

The game mode.



**Type**: [GameMode](/shieldbow/api/GameMode.md)

---

#### observerKey

The observer key for the game.



**Type**: string

---

#### platform

The platform (server) on which the game is being played.



**Type**: string

---

#### queue

The type of queue for the game.



**Type**: [Queue](/shieldbow/api/Queue.md)

---

#### startTimestamp

The time at which the game started.



**Type**: number

---

#### teams

A collection of the participating teams.



**Type**: Collection\<'red' \| 'blue', [CurrentGameTeam](/shieldbow/api/CurrentGameTeam.md)\>

---

#### type

The type of game.



**Type**: [GameType](/shieldbow/api/GameType.md)

---

