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
new Match (client: Client, data: MatchData)
```

Constructs a new instance of the `Match` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [MatchData](/shieldbow/api/MatchData.html) |  |
---

### Properties

#### createdTimestamp

The timestamp of creation of the match (before summoners spawn on the rift).



**Type**: number

---

#### duration

The duration of the match (in seconds).



**Type**: number

---

#### endTimestamp

The timestamp of the end of the match.



**Type**: number

---

#### gameId

The ID of the game.



**Type**: number

---

#### gameMode

The game mode for the match.



**Type**: [GameMode](/shieldbow/api/GameMode.html)

---

#### gameName

The name of the match.



**Type**: string

---

#### gameType

The type of game.



**Type**: [GameType](/shieldbow/api/GameType.html)

---

#### gameVersion

The version of the game.



**Type**: string

---

#### id

The match ID.



**Type**: string

---

#### map

The map on which the match was played.



**Type**: [GameMap](/shieldbow/api/GameMap.html)

---

#### platformId

The ID of the platform on which the match was played.


Eg: `NA1` or `EUW1`.



**Type**: string

---

#### queue

The queue type of the match.



**Type**: [Queue](/shieldbow/api/Queue.html)

---

#### startTimestamp

The timestamp of the beginning of the match (when summoners spawn on the rift).



**Type**: number

---

#### teams

The 2 teams participating in the match.


They are mapped by their map sides (`blue` and `red`).



**Type**: Collection\<'blue' \| 'red', [Team](/shieldbow/api/Team.html)\>

---

#### tournamentCode

The tournament code of the match (if it is the part of a tournament).



**Type**: string

---

#### version

The data version of the match.



**Type**: string

---

