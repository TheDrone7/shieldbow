---
title: TournamentPlayer
description: A representation of a player in a clash tournament.
---

# TournamentPlayer class

---

A representation of a player in a clash tournament.

**Signature:**

```ts
export declare class TournamentPlayer 
```

---

### Constructor

```ts
new TournamentPlayer (client: Client, teamId: string, data: TournamentPlayerData)
```

Constructs a new instance of the `TournamentPlayer` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/client) | The client that requested this data. |
| teamId | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The ID of the team this player is on. |
| data | [TournamentPlayerData](/api/tournamentplayerdata) | The raw player data from the API. |
---

### Properties

#### position

The position this player will be playing in the team.



**Type**: 'UNSELECTED' \| 'FILL' \| 'TOP' \| 'JUNGLE' \| 'MIDDLE' \| 'BOTTOM' \| 'UTILITY'

---

#### role

The role this player will be performing in the team - CAPTAIN or MEMBER.



**Type**: 'CAPTAIN' \| 'MEMBER'

---

#### summoner

Use [SummonerManager.fetch](/api/summonermanager#fetch) to fetch the summoner for this player.



**Type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< import("./Summoner").Summoner \>

---

#### summonerId

The summoner ID of this player.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### teamId

The ID of the team this player is on.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

