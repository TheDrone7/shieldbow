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
| client | [Client](/shieldbow/api/Client.html) |  |
| bans | [CurrentGameBanData](/shieldbow/api/CurrentGameBanData.html)[] |  |
| participants | [CurrentGameParticipantData](/shieldbow/api/CurrentGameParticipantData.html)[] |  |
---

### Properties

#### bans

The champions banned by this team.



**Type**: {         champion: Champion;         turn: number;     }[]

---

#### id

The team's ID.



**Type**: number

---

#### participants

The team's participants.



**Type**: [CurrentGameParticipant](/shieldbow/api/CurrentGameParticipant.html)[]

---

#### side

The team's side.



**Type**: 'red' \| 'blue'

---

