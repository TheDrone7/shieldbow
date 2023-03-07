---
title: CurrentGameParticipant
description: A representation of a participant in a live game.
---

# CurrentGameParticipant class

---

A representation of a participant in a live game.

**Signature:**

```ts
export declare class CurrentGameParticipant 
```

---

### Constructor

```ts
new CurrentGameParticipant (client: Client, data: CurrentGameParticipantData, champ: Champion, runeTrees: Collection<string, RuneTree>, summonerSpells: Collection<string, SummonerSpell>)
```

Constructs a new instance of the `CurrentGameParticipant` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client that requested this data. |
| data | [CurrentGameParticipantData](/api/currentgameparticipantdata) | The raw current game participant data from the API. |
| champ | [Champion](/api/champion) | The champion being played by this participant. |
| runeTrees | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [RuneTree](/api/runetree) \> | The collection of the runes in the game. |
| summonerSpells | [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [SummonerSpell](/api/summonerspell) \> | The collection of the summoner spells in the game. |
---

### Properties

#### bot

Whether the participant is a bot.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### champion

The champion being played by this participant.



**Type**: [Champion](/api/champion)

---

#### perks

The rune setups of this participant.



**Type**: [CurrentGamePerks](/api/currentgameperks)

---

#### profileIcon

A link to the participant's profile icon.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### summonerName

The summoner name of this participant.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### summonerSpells

The summoner spells being used by this participant.



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'D' \| 'F', [SummonerSpell](/api/summonerspell) \>

---

#### teamId

The ID of the team this participant belongs to.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

### Methods

#### .fetchSummoner ()

Fetches the summoner info of this participant.




**Signature:**

```ts
fetchSummoner(options?: FetchOptions): Promise<Summoner>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/fetchoptions) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/summoner) \>

---

