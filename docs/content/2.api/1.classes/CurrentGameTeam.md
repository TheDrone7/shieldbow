---
title: CurrentGameTeam
description: A representation of a team in a live game.
---

# CurrentGameTeam class

---

A representation of a team in a live game.

**Signature:**

```ts
export declare class CurrentGameTeam 
```

---

### Constructor

```ts
new CurrentGameTeam (client: Client, bans: CurrentGameBanData[], participants: CurrentGameParticipantData[], champions: Collection<string, Champion>, runeTrees: Collection<string, RuneTree>, summonerSpells: Collection<string, SummonerSpell>)
```

Constructs a new instance of the `CurrentGameTeam` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/classes/client) | The client requesting the data. |
| bans | [CurrentGameBanData](/api/interfaces/currentgamebandata)[] | The raw bans data for this team from the API. |
| participants | [CurrentGameParticipantData](/api/interfaces/currentgameparticipantdata)[] | The raw participants data for this team from the API. |
| champions | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Champion](/api/classes/champion) \> | The champions involved in the game. |
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/classes/runetree) \> | The collection of the runes in the game. |
| summonerSpells | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [SummonerSpell](/api/classes/summonerspell) \> | The collection of the summoner spells in the game. |
---

### Properties

#### bans

The champions banned by this team.



**Type**: [CurrentGameChampionBan](/api/interfaces/currentgamechampionban)[]

---

#### id

The team's ID.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### participants

The team's participants.



**Type**: [CurrentGameParticipant](/api/classes/currentgameparticipant)[]

---

#### side

The team's side.



**Type**: 'red' \| 'blue'

---

