---
title: Team
description: A representation of a team in a match.
---

# Team class

---

A representation of a team in a match.

**Signature:**

```ts
export declare class Team 
```

---

### Constructor

```ts
new Team (data: TeamData, participants: ParticipantData[], champions: Collection<string, Champion>, items: Collection<string, Item>, runeTrees: Collection<string, RuneTree>, summonerSpells: Collection<string, SummonerSpell>)
```

Constructs a new instance of the `Team` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| data | [TeamData](/api/teamdata) |  |
| participants | [ParticipantData](/api/participantdata)[] |  |
| champions | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/champion) \> |  |
| items | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Item](/api/item) \> |  |
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/runetree) \> |  |
| summonerSpells | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [SummonerSpell](/api/summonerspell) \> |  |
---

### Properties

#### bans

The champions banned by the team.



**Type**: [ChampionBan](/api/championban)[]

---

#### id

The ID of the team.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### objectives

The objectives secured by the team.



**Type**: [TeamObjectivesData](/api/teamobjectivesdata)

---

#### participants

The participants in the team.



**Type**: [Participant](/api/participant)[]

---

#### win

Whether the team won the match.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

