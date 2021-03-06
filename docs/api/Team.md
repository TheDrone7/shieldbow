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
| client | [Client](/api/Client.md) |  |
| data | [TeamData](/api/TeamData.md) |  |
| participants | [ParticipantData](/api/ParticipantData.md)[] |  |
---

### Properties

#### bans

The champions banned by the team.



**Type**: [ChampionBan](/api/ChampionBan.md)[]

---

#### id

The ID of the team.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### objectives

The objectives secured by the team.



**Type**: [TeamObjectivesData](/api/TeamObjectivesData.md)

---

#### participants

The participants in the team.



**Type**: [Participant](/api/Participant.md)[]

---

#### win

Whether the team won the match.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

