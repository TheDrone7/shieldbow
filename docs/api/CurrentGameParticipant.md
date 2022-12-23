---
title: CurrentGameParticipant
description: A representation of a participant in a live game.
---

## CurrentGameParticipant class

A representation of a participant in a live game.

**Signature:**

```ts
export declare class CurrentGameParticipant 
```

---

### Constructor

```ts
new CurrentGameParticipant (client: Client, data: CurrentGameParticipantData, champ: Champion)
```

Constructs a new instance of the `CurrentGameParticipant` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that requested this data. |
| data | [CurrentGameParticipantData](/api/CurrentGameParticipantData.md) | The raw current game participant data from the API. |
| champ | [Champion](/api/Champion.md) | The champion being played by this participant. |
---

### Properties

#### bot

Whether the participant is a bot.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### champion

The champion being played by this participant.



**Type**: [Champion](/api/Champion.md)

---

#### perks

The rune setups of this participant.



**Type**: [CurrentGamePerks](/api/CurrentGamePerks.md)

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



**Type**: [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< 'D' \| 'F', [SummonerSpell](/api/SummonerSpell.md) \>

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
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Summoner](/api/Summoner.md) \>

---

