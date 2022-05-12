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
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [CurrentGameData](/shieldbow/api/CurrentGameData.html) |  |
---

### Properties

#### id

The numerical ID of the game.


Combining this with the [CurrentGame.platform](/shieldbow/api/CurrentGame.html#platform) gives the full ID of the game. The full ID can be used to fetch all the details of the match after it has ended using [MatchManager.fetch](/shieldbow/api/MatchManager.html#fetch).



**Type**: number

---

#### length

The amount of time (in seconds) that has passed since the game started.



**Type**: number

---

#### map

The map on which the game is being played.



**Type**: [GameMap](/shieldbow/api/GameMap.html)

---

#### mode

The game mode.



**Type**: [GameMode](/shieldbow/api/GameMode.html)

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



**Type**: [Queue](/shieldbow/api/Queue.html)

---

#### startTimestamp

The time at which the game started.



**Type**: number

---

#### teams

A collection of the participating teams.



**Type**: Collection\<'red' \| 'blue', [CurrentGameTeam](/shieldbow/api/CurrentGameTeam.html)\>

---

#### type

The type of game.



**Type**: [GameType](/shieldbow/api/GameType.html)

---

