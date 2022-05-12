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
| client | [Client](/shieldbow/api/Client.html) |  |
| data | [TeamData](/shieldbow/api/TeamData.html) |  |
| participants | [ParticipantData](/shieldbow/api/ParticipantData.html)[] |  |
---

### Properties

#### bans

The champions banned by the team.



**Type**: {         order: number;         champion: Champion;     }[]

---

#### id

The ID of the team.



**Type**: number

---

#### objectives

The objectives secured by the team.



**Type**: [TeamObjectivesData](/shieldbow/api/TeamObjectivesData.html)

---

#### participants

The participants in the team.



**Type**: [Participant](/shieldbow/api/Participant.html)[]

---

#### win

Whether the team won the match.



**Type**: boolean

---

