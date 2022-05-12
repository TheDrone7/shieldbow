---
title: CurrentGameTeam
description: A representation of a team in a live game.
---

## CurrentGameTeam class

A representation of a team in a live game.

**Signature:**

```ts
export declare class CurrentGameTeam 
```

---

### Constructor

```ts
new CurrentGameTeam (client: Client, bans: CurrentGameBanData[], participants: CurrentGameParticipantData[])
```

Constructs a new instance of the `CurrentGameTeam` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) | The client requesting the data. |
| bans | [CurrentGameBanData](/shieldbow/api/CurrentGameBanData.md)[] | The raw bans data for this team from the API. |
| participants | [CurrentGameParticipantData](/shieldbow/api/CurrentGameParticipantData.md)[] | The raw participants data for this team from the API. |
---

### Properties

#### bans

The champions banned by this team.



**Type**: [CurrentGameChampionBan](/shieldbow/api/CurrentGameChampionBan.md)[]

---

#### id

The team's ID.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### participants

The team's participants.



**Type**: [CurrentGameParticipant](/shieldbow/api/CurrentGameParticipant.md)[]

---

#### side

The team's side.



**Type**: 'red' \| 'blue'

---

