---
title: Summoner
description: A representation of a summoner (player).
---

## Summoner class

A representation of a summoner (player).

**Signature:**

```ts
export declare class Summoner 
```

---

### Constructor

```ts
new Summoner (client: Client, summoner: SummonerData)
```

Constructs a new instance of the `Summoner` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/shieldbow/api/Client.html) |  |
| summoner | [SummonerData](/shieldbow/api/SummonerData.html) |  |
---

### Properties

#### account

Get the summoner's RIOT account info.


Uses [AccountManager.fetch](/shieldbow/api/AccountManager.html#fetch) to get the details.



**Type**: Promise\<[Account](/shieldbow/api/Account.html)\>

---

#### accountId

The account ID for this summoner.



**Type**: string

---

#### championMastery

A manager for the summoner's champion mastery.



**Type**: [ChampionMasteryManager](/shieldbow/api/ChampionMasteryManager.html)

---

#### id

The summoner ID for this summoner.



**Type**: string

---

#### league

Get the summoner's competitive placement info.


Uses [LeagueManager.fetch](/shieldbow/api/LeagueManager.html#fetch) to get the details.



**Type**: Promise\<Collection\<string, [LeagueEntry](/shieldbow/api/LeagueEntry.html)\>\>

---

#### level

The summoner level of this summoner.



**Type**: number

---

#### live

Get the summoner's live game data.


Uses [CurrentGameManager.fetch](/shieldbow/api/CurrentGameManager.html#fetch) to get the details.



**Type**: Promise\<[CurrentGame](/shieldbow/api/CurrentGame.html)\>

---

#### name

The summoner name for this summoner.



**Type**: string

---

#### playerId

The unique player ID for this summoner. This is also called the PUUID.



**Type**: string

---

#### profileIcon

The current profile icon of this summoner.



**Type**: string

---

#### revisionDate

The last time this summoner was modified.



**Type**: Date

---

### Methods

#### .verifyCode (code)

Check a summoner's third party verification code.




**Signature:**

```ts
verifyCode(code: string): Promise<boolean>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| code | string | The code that the summoner's code should match with. |

**Return type**: Promise\<boolean\>

---

