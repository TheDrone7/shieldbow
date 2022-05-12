---
title: TournamentTeam
description: A representation of a team in a clash tournament.
---

## TournamentTeam class

A representation of a team in a clash tournament.

**Signature:**

```ts
export declare class TournamentTeam 
```

---

### Constructor

```ts
new TournamentTeam (client: Client, data: TournamentTeamData)
```

Constructs a new instance of the `TournamentTeam` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [TournamentTeamData](/shieldbow/api/TournamentTeamData.html) |  |
---

### Properties

#### abbreviation

The abbreviation for the team's name.



**Type**: string

---

#### captainId

The summoner ID of the team's captain.



**Type**: string

---

#### icon

The icon being used to represent the team.



**Type**: string

---

#### id

The ID of the team.



**Type**: string

---

#### name

The name of the team.



**Type**: string

---

#### players

The list of players in the team.



**Type**: [TournamentPlayer](/shieldbow/api/TournamentPlayer.html)[]

---

#### tier

The tier of the team.



**Type**: number

---

#### tournamentId

The ID of the tournament this team is participating in.



**Type**: number

---

