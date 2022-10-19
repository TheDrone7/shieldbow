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
new Summoner (client: Client, summoner: SummonerData, region?: Region)
```

Constructs a new instance of the `Summoner` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| client | [Client](/api/Client.md) | The client that requested this data. |
| summoner | [SummonerData](/api/SummonerData.md) | The raw summoner data from the API. |
| region | [Region](/api/Region.md) | The region this summoner is located in. |
---

### Properties

#### accountId

The account ID for this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### championMastery

A manager for the summoner's champion mastery.



**Type**: [ChampionMasteryManager](/api/ChampionMasteryManager.md)

---

#### id

The summoner ID for this summoner.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### level

The summoner level of this summoner.



**Type**: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

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

#### region

The region this summoner is located in.



**Type**: [Region](/api/Region.md)

---

#### revisionDate

The last time this summoner was modified.



**Type**: [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

---

### Methods

#### .fetchAccount ()

Fetch the summoner's RIOT account info.




**Signature:**

```ts
fetchAccount(options?: FetchOptions): Promise<Account>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Account](/api/Account.md) \>

---

#### .fetchChallenges ()

Fetch the summoner's challenges progression.




**Signature:**

```ts
fetchChallenges(options?: FetchOptions): Promise<import("./SummonerChallenge").SummonerChallenge>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< import("./SummonerChallenge").SummonerChallenge \>

---

#### .fetchClashEntries ()

Fetch the summoner's clash entries.




**Signature:**

```ts
fetchClashEntries(options?: FetchOptions): Promise<import("./TournamentPlayer").TournamentPlayer[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< import("./TournamentPlayer").TournamentPlayer[] \>

---

#### .fetchLeagueEntries ()

Fetch the summoner's competitive placement info.




**Signature:**

```ts
fetchLeagueEntries(options?: FetchOptions): Promise<Collection<string, LeagueEntry>>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [Collection](https://discord.js.org/#/docs/collection/stable/class/Collection) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [LeagueEntry](/api/LeagueEntry.md) \> \>

---

#### .fetchLiveMatch ()

Fetch the summoner's live game data.




**Signature:**

```ts
fetchLiveMatch(options?: FetchOptions): Promise<CurrentGame>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [FetchOptions](/api/FetchOptions.md) | The basic fetching options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [CurrentGame](/api/CurrentGame.md) \>

---

#### .fetchMatchList ()

Fetch the summoner's recent matches (always fetches from API).




**Signature:**

```ts
fetchMatchList(options?: MatchByPlayerOptions): Promise<string[]>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [MatchByPlayerOptions](/api/MatchByPlayerOptions.md) | The match list filtering options. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)[] \>

---

#### .verifyCode ()

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

