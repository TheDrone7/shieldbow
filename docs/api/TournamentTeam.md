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
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [TournamentTeamData](/api/TournamentTeamData.md) | The raw tournament team data from the API. |
---

### Properties

#### abbreviation

The abbreviation for the team's name.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### captainId

The summoner ID of the team's captain.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### icon

The icon being used to represent the team.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### id

The ID of the team.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### name

The name of the team.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### players

The list of players in the team.



**Type**: [TournamentPlayer](/api/TournamentPlayer.md)[]

---

#### tier

The tier of the team.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### tournamentId

The ID of the tournament this team is participating in.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

