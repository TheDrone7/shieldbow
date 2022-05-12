---
title: Team
description: A representation of a team in a match.
---

## Team class

A representation of a team in a match.

**Signature:**

```ts
export declare class Team 
```

---

### Constructor

```ts
new Team (client: Client, data: TeamData, participants: ParticipantData[])
```

Constructs a new instance of the `Team` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
| data | [TeamData](/shieldbow/api/TeamData.md) |  |
| participants | [ParticipantData](/shieldbow/api/ParticipantData.md)[] |  |
---

### Properties

#### bans

The champions banned by the team.



**Type**: [ChampionBan](/shieldbow/api/ChampionBan.md)[]

---

#### id

The ID of the team.



**Type**: number

---

#### objectives

The objectives secured by the team.



**Type**: [TeamObjectivesData](/shieldbow/api/TeamObjectivesData.md)

---

#### participants

The participants in the team.



**Type**: [Participant](/shieldbow/api/Participant.md)[]

---

#### win

Whether the team won the match.



**Type**: boolean

---

