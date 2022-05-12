---
title: Client
description: The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs.
---

## Client class

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
| apiKey | string |  |
---

### Properties

#### accounts

The default riot accounts manager used by the client. This is mostly for internal usage. You may want to use [Client.summoners](/shieldbow/api/Client.html#summoners) instead.



**Type**: [AccountManager](/shieldbow/api/AccountManager.html)

---

#### api

The default API interactions handler used by the client.



**Type**: [ApiHandler](/shieldbow/api/ApiHandler.html)

---

#### cdnBase

The Data Dragon CDN Base URL



**Type**: string

---

#### champions

The default champions manager used by the client.



**Type**: [ChampionManager](/shieldbow/api/ChampionManager.html)

---

#### clash

The default clash tournaments manager used by the client.



**Type**: [ClashManager](/shieldbow/api/ClashManager.html)

---

#### gameModes

An array of all game modes and their respective data.



**Type**: [GameMode](/shieldbow/api/GameMode.html)[]

---

#### gameTypes

An array of all game types and their respective data.



**Type**: [GameType](/shieldbow/api/GameType.html)[]

---

#### http

The axios instance that handles all the CDN requests being made.



**Type**: AxiosInstance

---

#### items

The default items manager used by the client.



**Type**: [ItemManager](/shieldbow/api/ItemManager.html)

---

#### leagues

The default summoner competitive league data manager used by the client.


Highly recommended using [Client.summoners](/shieldbow/api/Client.html#summoners) for a specific summoner's competitive info.


Use this only if you want to query a list of users by rank-division.



**Type**: [LeagueManager](/shieldbow/api/LeagueManager.html)

---

#### locale

The locale in which all the data is going to be fetched in.



**Type**: [Locales](/shieldbow/api/Locales.html)

---

#### maps

An array of all maps and their respective data.



**Type**: [GameMap](/shieldbow/api/GameMap.html)[]

---

#### matches

The default match manager used by the client.



**Type**: [MatchManager](/shieldbow/api/MatchManager.html)

---

#### patch

The patch of the game currently in use.


Must be above 5.1 for proper functionality.



**Type**: string

---

#### queues

An array of all queue types and their respective data.



**Type**: [Queue](/shieldbow/api/Queue.html)[]

---

#### region

The league of legends region from which the data is to be fetched.



**Type**: [Region](/shieldbow/api/Region.html)

---

#### runes

The default runes manager used by the client.



**Type**: [RuneTreeManager](/shieldbow/api/RuneTreeManager.html)

---

#### seasons

An array of all seasons and their respective IDs.



**Type**: [Season](/shieldbow/api/Season.html)[]

---

#### spectator

The default live match manager used by the client.



**Type**: [CurrentGameManager](/shieldbow/api/CurrentGameManager.html)

---

#### status

Get the current status of the RIOT API.


No type support for this (yet).



**Type**: Promise\<unknown\>

---

#### summoners

The default summoners manager used by the client.



**Type**: [SummonerManager](/shieldbow/api/SummonerManager.html)

---

#### summonerSpells

The default summoner spells manager used by the client.



**Type**: [SummonerSpellManager](/shieldbow/api/SummonerSpellManager.html)

---

#### version

The current Data Dragon CDN version.



**Type**: string

---

### Methods

#### .initialize (options)

Initialize the client to prepare it for interacting with the API. This can also be rerun if you want to configure anything and quickly fetch any required data.




**Signature:**

```ts
initialize(options?: ClientConfig): Promise<void>;
```

**Parameters:**

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| options | [ClientConfig](/shieldbow/api/ClientConfig.html) | The client configuration. |

**Return type**: Promise\<void\>

---

