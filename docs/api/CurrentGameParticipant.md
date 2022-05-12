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
new CurrentGameParticipant (client: Client, data: CurrentGameParticipantData)
```

Constructs a new instance of the `CurrentGameParticipant` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.md) |  |
| data | [CurrentGameParticipantData](/shieldbow/api/CurrentGameParticipantData.md) |  |
---

### Properties

#### bot

Whether the participant is a bot.



**Type**: boolean

---

#### champion

The champion being played by this participant.



**Type**: [Champion](/shieldbow/api/Champion.md)

---

#### perks

The rune setups of this participant.



**Type**: [CurrentGamePerks](/shieldbow/api/CurrentGamePerks.md)

---

#### profileIcon

A link to the participant's profile icon.



**Type**: string

---

#### summonerName

The summoner name of this participant.



**Type**: string

---

#### summonerSpells

The summoner spells being used by this participant.



**Type**: Collection\<'D' \| 'F', [SummonerSpell](/shieldbow/api/SummonerSpell.md)\>

---

#### teamId

The ID of the team this participant belongs to.



**Type**: number

---

