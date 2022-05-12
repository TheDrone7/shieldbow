---
title: TournamentPlayer
description: A representation of a player in a clash tournament.
---

## TournamentPlayer class

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
| client | [Client](/shieldbow/api/Client.md) | The client that requested this data. |
| teamId | string | The ID of the team this player is on. |
| data | [TournamentPlayerData](/shieldbow/api/TournamentPlayerData.md) | The raw player data from the API. |
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

Use [SummonerManager.fetch](/shieldbow/api/SummonerManager.md#fetch) to fetch the summoner for this player.



**Type**: Promise\<import("./Summoner").Summoner\>

---

#### summonerId

The summoner ID of this player.



**Type**: string

---

#### teamId

The ID of the team this player is on.



**Type**: string

---

