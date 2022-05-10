# API Reference

## Classes

| Class | Description |
| ----- | ----------- |
| [Account](/shieldbow/api/Account.html) | A representation of a RIOT account. |
| [AccountManager](/shieldbow/api/AccountManager.html) | An account manager - to fetch and manage all the RIOT accounts. |
| [ApiError](/shieldbow/api/ApiError.html) | API error class. |
| [ApiHandler](/shieldbow/api/ApiHandler.html) | A class that handles API requests and rate limits for the RIOT API. |
| [Bounty](/shieldbow/api/Bounty.html) | A representation of the bounty on a match participant. |
| [Champion](/shieldbow/api/Champion.html) | A representation of a League of Legends champion. |
| [ChampionManager](/shieldbow/api/ChampionManager.html) | A champion manager - to fetch and manage all the champion data. |
| [ChampionMastery](/shieldbow/api/ChampionMastery.html) | A representation of a summoner's mastery over a champion. |
| [ChampionMasteryManager](/shieldbow/api/ChampionMasteryManager.html) | A champion mastery manager - to fetch and manage all summoner's champion mastery data. |
| [ChampionSkin](/shieldbow/api/ChampionSkin.html) | A representation of a champion's skin (visual modification). |
| [ChampionSpell](/shieldbow/api/ChampionSpell.html) | The representation of a champion's spell (ability). |
| [ChampionStat](/shieldbow/api/ChampionStat.html) | A representation of the champion's base stats. |
| [ClashManager](/shieldbow/api/ClashManager.html) | A clash manager - to fetch and store clash tournaments and related data. |
| [Client](/shieldbow/api/Client.html) | The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs. |
| [CurrentGame](/shieldbow/api/CurrentGame.html) | A representation of an ongoing game. |
| [CurrentGameManager](/shieldbow/api/CurrentGameManager.html) | A current game manager - to fetch and manage the live games. |
| [CurrentGameParticipant](/shieldbow/api/CurrentGameParticipant.html) | A representation of a participant in a live game. |
| [CurrentGamePerks](/shieldbow/api/CurrentGamePerks.html) | A representation of the rune setup of a live game participant. |
| [CurrentGameTeam](/shieldbow/api/CurrentGameTeam.html) | A representation of a team in a live game. |
| [Item](/shieldbow/api/Item.html) | A representation of an in-game item. |
| [ItemManager](/shieldbow/api/ItemManager.html) | An item manager - to fetch and manage all item data. |
| [LeagueEntry](/shieldbow/api/LeagueEntry.html) | A representation of a summoner's competitive details. |
| [LeagueList](/shieldbow/api/LeagueList.html) | A representation of a list of league entries. |
| [LeagueManager](/shieldbow/api/LeagueManager.html) | A league manager - to fetch and manage all summoner competitive info. |
| [Match](/shieldbow/api/Match.html) | A representation of a league of legends match. |
| [MatchManager](/shieldbow/api/MatchManager.html) | A match manager - to fetch and manage matches. |
| [Participant](/shieldbow/api/Participant.html) | A representation of a participant in a match. |
| [Perks](/shieldbow/api/Perks.html) | A representation of the perks (runes) selected by a summoner for a match. |
| [PerkStyle](/shieldbow/api/PerkStyle.html) | A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected. |
| [Ratelimiter](/shieldbow/api/Ratelimiter.html) | A utility class that handles ratelimits. |
| [Rune](/shieldbow/api/Rune.html) | A representation of an in-game rune. |
| [RuneTree](/shieldbow/api/RuneTree.html) | A representation of an in-game rune tree |
| [RuneTreeManager](/shieldbow/api/RuneTreeManager.html) | A rune trees manager - to fetch and manage rune trees data. |
| [StorageManager](/shieldbow/api/StorageManager.html) | A basic manager for storing and fetching the local cached JSON files. |
| [Summoner](/shieldbow/api/Summoner.html) | A representation of a summoner (player). |
| [SummonerManager](/shieldbow/api/SummonerManager.html) | A summoner manager - to fetch and manage all the summoner data. |
| [SummonerSpell](/shieldbow/api/SummonerSpell.html) | A representation of an in-game summoner spell. |
| [SummonerSpellManager](/shieldbow/api/SummonerSpellManager.html) | A spell manager - to fetch and manage all summoner spell data. |
| [Team](/shieldbow/api/Team.html) | A representation of a team in a match. |
| [Tournament](/shieldbow/api/Tournament.html) | A representation of a clash tournament. |
| [TournamentPlayer](/shieldbow/api/TournamentPlayer.html) | A representation of a player in a clash tournament. |
| [TournamentSchedule](/shieldbow/api/TournamentSchedule.html) | A representation of a clash tournament schedule. |
| [TournamentTeam](/shieldbow/api/TournamentTeam.html) | A representation of a team in a clash tournament. |
---

## Functions

| Function | Description |
| -------- | ----------- |
| [hash(str, { size })](/shieldbow/api/hash.html) | A simple fnv1a hashing utility - to help with community dragon data parsing. |
---

## Interfaces

| Interface | Description |
| --------- | ----------- |
| [AccountData](/shieldbow/api/AccountData.html) |  |
| [BaseManager](/shieldbow/api/BaseManager.html) | A base for any manager classes. |
| [ChampionData](/shieldbow/api/ChampionData.html) | A representation of the champion data returned by Data Dragon. |
| [ChampionMasteryData](/shieldbow/api/ChampionMasteryData.html) |  |
| [ClientConfig](/shieldbow/api/ClientConfig.html) | The basic configuration for the shieldbow Client. |
| [CurrentGameBanData](/shieldbow/api/CurrentGameBanData.html) |  |
| [CurrentGameData](/shieldbow/api/CurrentGameData.html) |  |
| [CurrentGameParticipantData](/shieldbow/api/CurrentGameParticipantData.html) |  |
| [CurrentGamePerksData](/shieldbow/api/CurrentGamePerksData.html) |  |
| [GameMap](/shieldbow/api/GameMap.html) | Basic data for types of Maps available in the game. |
| [GameMode](/shieldbow/api/GameMode.html) | Basic data for types of game modes. |
| [GameType](/shieldbow/api/GameType.html) | Basic data for types of games. |
| [ImageData](/shieldbow/api/ImageData.html) | A representation of any image data returned by Data Dragon. |
| [ItemData](/shieldbow/api/ItemData.html) | A representation of the item data returned by Data Dragon. |
| [LeagueEntryData](/shieldbow/api/LeagueEntryData.html) |  |
| [LeagueListData](/shieldbow/api/LeagueListData.html) |  |
| [MatchByPlayerOptions](/shieldbow/api/MatchByPlayerOptions.html) | Additional options for filtering a specific summoner's matches. |
| [MatchData](/shieldbow/api/MatchData.html) |  |
| [MerakiChampion](/shieldbow/api/MerakiChampion.html) | A representation of the champion data returned by meraki analytics. These are used in the LoL wiki. |
| [MerakiSkin](/shieldbow/api/MerakiSkin.html) | A representation of a champion's skin data returned by meraki analytics. These are used in the LoL wiki. |
| [ParticipantData](/shieldbow/api/ParticipantData.html) |  |
| [PerksData](/shieldbow/api/PerksData.html) |  |
| [Queue](/shieldbow/api/Queue.html) | Basic data for types of queues (matches) in the game. |
| [RuneData](/shieldbow/api/RuneData.html) |  |
| [RuneTreeData](/shieldbow/api/RuneTreeData.html) |  |
| [Season](/shieldbow/api/Season.html) | Basic data of seasons of the game. |
| [SpellDamageData](/shieldbow/api/SpellDamageData.html) | A representation of the champion spell data returned by Community Dragon. |
| [SpellData](/shieldbow/api/SpellData.html) | A representation of the champion spell data returned by Data Dragon. |
| [StatPerk](/shieldbow/api/StatPerk.html) |  |
| [SummonerData](/shieldbow/api/SummonerData.html) |  |
| [SummonerSpellData](/shieldbow/api/SummonerSpellData.html) |  |
| [TeamBanData](/shieldbow/api/TeamBanData.html) |  |
| [TeamData](/shieldbow/api/TeamData.html) |  |
| [TeamObjectiveData](/shieldbow/api/TeamObjectiveData.html) |  |
| [TeamObjectivesData](/shieldbow/api/TeamObjectivesData.html) |  |
| [TournamentData](/shieldbow/api/TournamentData.html) |  |
| [TournamentPlayerData](/shieldbow/api/TournamentPlayerData.html) |  |
| [TournamentPlayerFullData](/shieldbow/api/TournamentPlayerFullData.html) |  |
| [TournamentScheduleData](/shieldbow/api/TournamentScheduleData.html) |  |
| [TournamentTeamData](/shieldbow/api/TournamentTeamData.html) |  |
---

## Variables

| Variable | Description |
| -------- | ----------- |
| [arrToString](/shieldbow/api/arrToString.html) |  |
| [locale](/shieldbow/api/locale.html) |  |
| [multiply](/shieldbow/api/multiply.html) |  |
| [performMath](/shieldbow/api/performMath.html) |  |
| [round](/shieldbow/api/round.html) | Rounds the value to up to 2 decimal points. |
| [Stat](/shieldbow/api/Stat.html) | An array of all possible statistics needed for spell math. |
| [StatFormula](/shieldbow/api/StatFormula.html) | The part of the stat that needs to be considered during spell math. |
| [statPerks](/shieldbow/api/statPerks.html) | The available stat perks. |
---

## Type Aliases

| Type Alias | Description |
| ---------- | ----------- |
| [DivisionType](/shieldbow/api/DivisionType.html) |  |
| [Locales](/shieldbow/api/Locales.html) | A valid locale to fetch the data in. |
| [QueueType](/shieldbow/api/QueueType.html) |  |
| [Region](/shieldbow/api/Region.html) | A valid League of Legends region. |
| [Stats](/shieldbow/api/Stats.html) | A valid champion stat that affects their in-game interactions. |
| [TierType](/shieldbow/api/TierType.html) |  |
