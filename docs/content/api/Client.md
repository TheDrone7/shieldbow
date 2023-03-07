---
title: Client
description: The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs.
---

# Client class

---

The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs.

**Signature:**

```ts
export declare class Client 
```

---

### Constructor

```ts
new Client (apiKey: string)
```

Constructs a new instance of the `Client` class.

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| apiKey | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |  |
---

### Properties

#### accounts

The default riot accounts manager used by the client. This is mostly for internal usage. You may want to use [Client.summoners](/api/client#summoners) instead.



**Type**: [AccountManager](/api/accountmanager)

---

#### api

The default API interactions handler used by the client.



**Type**: [RateLimiter](/api/ratelimiter)

---

#### cache

The client's caching utility.



**Type**: [ICache](/api/icache)

---

#### cacheEnabled

The client's configuration for caching. This is for internal usage only.


PLEASE DO NOT TRY TO USE THIS. Refer to [Client.initialize](/api/client#initialize) to configure this.



**Type**: [ManagersConfig](/api/managersconfig)

---

#### cdnBase

The Data Dragon CDN Base URL



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### challenges

The default LOL challenges manager used by the client.



**Type**: [ChallengeManager](/api/challengemanager)

---

#### champions

The default champions manager used by the client.



**Type**: [ChampionManager](/api/championmanager)

---

#### clash

The default clash tournaments manager used by the client.



**Type**: [ClashManager](/api/clashmanager)

---

#### gameModes

An array of all game modes and their respective data.



**Type**: [GameMode](/api/gamemode)[]

---

#### gameTypes

An array of all game types and their respective data.



**Type**: [GameType](/api/gametype)[]

---

#### http

The axios instance that handles all the CDN requests being made.



**Type**: AxiosInstance

---

#### initialized

Is this client initialized.



**Type**: [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

---

#### items

The default items manager used by the client.



**Type**: [ItemManager](/api/itemmanager)

---

#### leagues

The default summoner competitive league data manager used by the client.


Highly recommended using [Client.summoners](/api/client#summoners) for a specific summoner's competitive info.


Use this only if you want to query a list of users by rank-division.



**Type**: [LeagueManager](/api/leaguemanager)

---

#### locale

The locale in which all the data is going to be fetched in.



**Type**: "cs_CZ" \| "el_GR" \| "pl_PL" \| "ro_RO" \| "hu_HU" \| "en_GB" \| "de_DE" \| "es_ES" \| "it_IT" \| "fr_FR" \| "ja_JP" \| "ko_KR" \| "es_MX" \| "es_AR" \| "pt_BR" \| "en_US" \| "en_AU" \| "ru_RU" \| "tr_TR" \| "ms_MY" \| "en_PH" \| "en_SG" \| "th_TH" \| "vn_VN" \| "id_ID" \| "zh_MY" \| "zh_CN" \| "zh_TW"

---

#### logger

The client's logging utility.



**Type**: [ILogger](/api/ilogger) \| [Undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

---

#### maps

An array of all maps and their respective data.



**Type**: [GameMap](/api/gamemap)[]

---

#### matches

The default match manager used by the client.



**Type**: [MatchManager](/api/matchmanager)

---

#### patch

The patch of the game currently in use.


Must be above 5.1 for proper functionality.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

#### queues

An array of all queue types and their respective data.



**Type**: [Queue](/api/queue)[]

---

#### region

The league of legends region from which the data is to be fetched.



**Type**: [Region](/api/region)

---

#### runes

The default runes manager used by the client.



**Type**: [RuneTreeManager](/api/runetreemanager)

---

#### seasons

An array of all seasons and their respective IDs.



**Type**: [Season](/api/season)[]

---

#### spectator

The default live match manager used by the client.



**Type**: [CurrentGameManager](/api/currentgamemanager)

---

#### status

Get the current status of the RIOT API.


No type support for this (yet).



**Type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< unknown \>

---

#### storage

The client's storage utility.



**Type**: [IStorage](/api/istorage)

---

#### storageEnabled

The client's configuration for storage. This is for internal usage only.


PLEASE DO NOT TRY TO USE THIS. Refer to [Client.initialize](/api/client#initialize) to configure this.



**Type**: [ManagersConfig](/api/managersconfig)

---

#### summoners

The default summoners manager used by the client.



**Type**: [SummonerManager](/api/summonermanager)

---

#### summonerSpells

The default summoner spells manager used by the client.



**Type**: [SummonerSpellManager](/api/summonerspellmanager)

---

#### version

The current Data Dragon CDN version.



**Type**: [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

---

### Methods

#### .initialize ()

Initialize the client to prepare it for interacting with the API. This can also be rerun if you want to configure anything and quickly fetch any required data.




**Signature:**

```ts
initialize(options?: ClientConfig): Promise<void>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [ClientConfig](/api/clientconfig) | The client configuration. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< void \>

---

#### .updateLocale ()

Update the locale in which the data is fetched.




**Signature:**

```ts
updateLocale(newLocale: Locales, refetch?: boolean): Promise<void>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| newLocale | [Locales](/api/locales) | The new locale to use for the future requests. |
| refetch | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | Whether to fetch all data dragon data in the new locale right away. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< void \>

---

#### .updatePatch ()

Update the patch from which the data is fetched.


NOTE: The patch must be 2 integers separated by a `.`. For example: `10.11` or `12.9`.


This should NOT be the data dragon version.




**Signature:**

```ts
updatePatch(patch: string, refetch?: boolean): Promise<void>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| patch | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The new patch to use for the future requests. |
| refetch | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | Whether to fetch all data dragon data from the new patch right away. |

**Return type**: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) \< void \>

---

