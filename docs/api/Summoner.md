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
| client | [Client](/shieldbow/api/Client.md) | The client that requested this data. |
| summoner | [SummonerData](/shieldbow/api/SummonerData.md) | The raw summoner data from the API. |
---

### Properties

#### account

Get the summoner's RIOT account info.


Uses [AccountManager.fetch](/shieldbow/api/AccountManager.md#fetch) to get the details.



**Type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Account](/shieldbow/api/Account.md) \>

---

#### accountId

The account ID for this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### championMastery

A manager for the summoner's champion mastery.



**Type**: [ChampionMasteryManager](/shieldbow/api/ChampionMasteryManager.md)

---

#### id

The summoner ID for this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### league

Get the summoner's competitive placement info.


Uses [LeagueManager.fetch](/shieldbow/api/LeagueManager.md#fetch) to get the details.



**Type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [LeagueEntry](/shieldbow/api/LeagueEntry.md) \> \>

---

#### level

The summoner level of this summoner.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

---

#### live

Get the summoner's live game data.


Uses [CurrentGameManager.fetch](/shieldbow/api/CurrentGameManager.md#fetch) to get the details.



**Type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [CurrentGame](/shieldbow/api/CurrentGame.md) \>

---

#### name

The summoner name for this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### playerId

The unique player ID for this summoner. This is also called the PUUID.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### profileIcon

The current profile icon of this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### revisionDate

The last time this summoner was modified.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

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
| code | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The code that the summoner's code should match with. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) \>

---

