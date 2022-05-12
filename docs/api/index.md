# API Reference

## Classes

| Class | Description |
| ----- | ----------- |
| [Account](/shieldbow/api/Account.md) | A representation of a RIOT account. |
| [AccountManager](/shieldbow/api/AccountManager.md) | An account manager - to fetch and manage all the RIOT accounts. |
| [ApiError](/shieldbow/api/ApiError.md) | API error class. |
| [ApiHandler](/shieldbow/api/ApiHandler.md) | A class that handles API requests and rate limits for the RIOT API. |
| [Bounty](/shieldbow/api/Bounty.md) | A representation of the bounty on a match participant. |
| [Champion](/shieldbow/api/Champion.md) | A representation of a League of Legends champion. |
| [ChampionManager](/shieldbow/api/ChampionManager.md) | A champion manager - to fetch and manage all the champion data. |
| [ChampionMastery](/shieldbow/api/ChampionMastery.md) | A representation of a summoner's mastery over a champion. |
| [ChampionMasteryManager](/shieldbow/api/ChampionMasteryManager.md) | A champion mastery manager - to fetch and manage all summoner's champion mastery data. |
| [ChampionSkin](/shieldbow/api/ChampionSkin.md) | A representation of a champion's skin (visual modification). |
| [ChampionSpell](/shieldbow/api/ChampionSpell.md) | The representation of a champion's spell (ability). |
| [ChampionStat](/shieldbow/api/ChampionStat.md) | A representation of the champion's base stats. |
| [ClashManager](/shieldbow/api/ClashManager.md) | A clash manager - to fetch and store clash tournaments and related data. |
| [Client](/shieldbow/api/Client.md) | The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs. |
| [CurrentGame](/shieldbow/api/CurrentGame.md) | A representation of an ongoing game. |
| [CurrentGameManager](/shieldbow/api/CurrentGameManager.md) | A current game manager - to fetch and manage the live games. |
| [CurrentGameParticipant](/shieldbow/api/CurrentGameParticipant.md) | A representation of a participant in a live game. |
| [CurrentGamePerks](/shieldbow/api/CurrentGamePerks.md) | A representation of the rune setup of a live game participant. |
| [CurrentGameTeam](/shieldbow/api/CurrentGameTeam.md) | A representation of a team in a live game. |
| [Item](/shieldbow/api/Item.md) | A representation of an in-game item. |
| [ItemManager](/shieldbow/api/ItemManager.md) | An item manager - to fetch and manage all item data. |
| [LeagueEntry](/shieldbow/api/LeagueEntry.md) | A representation of a summoner's competitive details. |
| [LeagueList](/shieldbow/api/LeagueList.md) | A representation of a list of league entries. |
| [LeagueManager](/shieldbow/api/LeagueManager.md) | A league manager - to fetch and manage all summoner competitive info. |
| [Match](/shieldbow/api/Match.md) | A representation of a league of legends match. |
| [MatchManager](/shieldbow/api/MatchManager.md) | A match manager - to fetch and manage matches. |
| [Participant](/shieldbow/api/Participant.md) | A representation of a participant in a match. |
| [Perks](/shieldbow/api/Perks.md) | A representation of the perks (runes) selected by a summoner for a match. |
| [PerkStyle](/shieldbow/api/PerkStyle.md) | A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected. |
| [Ratelimiter](/shieldbow/api/Ratelimiter.md) | A utility class that handles ratelimits. |
| [Rune](/shieldbow/api/Rune.md) | A representation of an in-game rune. |
| [RuneTree](/shieldbow/api/RuneTree.md) | A representation of an in-game rune tree |
| [RuneTreeManager](/shieldbow/api/RuneTreeManager.md) | A rune trees manager - to fetch and manage rune trees data. |
| [StorageManager](/shieldbow/api/StorageManager.md) | A basic manager for storing and fetching the local cached JSON files. |
| [Summoner](/shieldbow/api/Summoner.md) | A representation of a summoner (player). |
| [SummonerManager](/shieldbow/api/SummonerManager.md) | A summoner manager - to fetch and manage all the summoner data. |
| [SummonerSpell](/shieldbow/api/SummonerSpell.md) | A representation of an in-game summoner spell. |
| [SummonerSpellManager](/shieldbow/api/SummonerSpellManager.md) | A spell manager - to fetch and manage all summoner spell data. |
| [Team](/shieldbow/api/Team.md) | A representation of a team in a match. |
| [Tournament](/shieldbow/api/Tournament.md) | A representation of a clash tournament. |
| [TournamentPlayer](/shieldbow/api/TournamentPlayer.md) | A representation of a player in a clash tournament. |
| [TournamentSchedule](/shieldbow/api/TournamentSchedule.md) | A representation of a clash tournament schedule. |
| [TournamentTeam](/shieldbow/api/TournamentTeam.md) | A representation of a team in a clash tournament. |
---

## Functions

| Function | Description |
| -------- | ----------- |
| [hash(str, { size })](/shieldbow/api/hash.md) | A simple fnv1a hashing utility - to help with community dragon data parsing. |
---

## Interfaces

| Interface | Description |
| --------- | ----------- |
| [AccountData](/shieldbow/api/AccountData.md) |  |
| [BaseManager](/shieldbow/api/BaseManager.md) | A base for any manager classes. |
| [ChampionData](/shieldbow/api/ChampionData.md) | A representation of the champion data returned by Data Dragon. |
| [ChampionMasteryData](/shieldbow/api/ChampionMasteryData.md) |  |
| [ClientConfig](/shieldbow/api/ClientConfig.md) | The basic configuration for the shieldbow Client. |
| [CurrentGameBanData](/shieldbow/api/CurrentGameBanData.md) |  |
| [CurrentGameData](/shieldbow/api/CurrentGameData.md) |  |
| [CurrentGameParticipantData](/shieldbow/api/CurrentGameParticipantData.md) |  |
| [CurrentGamePerksData](/shieldbow/api/CurrentGamePerksData.md) |  |
| [GameMap](/shieldbow/api/GameMap.md) | Basic data for types of Maps available in the game. |
| [GameMode](/shieldbow/api/GameMode.md) | Basic data for types of game modes. |
| [GameType](/shieldbow/api/GameType.md) | Basic data for types of games. |
| [ImageData](/shieldbow/api/ImageData.md) | A representation of any image data returned by Data Dragon. |
| [ItemData](/shieldbow/api/ItemData.md) | A representation of the item data returned by Data Dragon. |
| [LeagueEntryData](/shieldbow/api/LeagueEntryData.md) |  |
| [LeagueListData](/shieldbow/api/LeagueListData.md) |  |
| [MatchByPlayerOptions](/shieldbow/api/MatchByPlayerOptions.md) | Additional options for filtering a specific summoner's matches. |
| [MatchData](/shieldbow/api/MatchData.md) |  |
| [MerakiChampion](/shieldbow/api/MerakiChampion.md) | A representation of the champion data returned by meraki analytics. These are used in the LoL wiki. |
| [MerakiSkin](/shieldbow/api/MerakiSkin.md) | A representation of a champion's skin data returned by meraki analytics. These are used in the LoL wiki. |
| [ParticipantData](/shieldbow/api/ParticipantData.md) |  |
| [PerksData](/shieldbow/api/PerksData.md) |  |
| [Queue](/shieldbow/api/Queue.md) | Basic data for types of queues (matches) in the game. |
| [RuneData](/shieldbow/api/RuneData.md) |  |
| [RuneTreeData](/shieldbow/api/RuneTreeData.md) |  |
| [Season](/shieldbow/api/Season.md) | Basic data of seasons of the game. |
| [SpellDamageData](/shieldbow/api/SpellDamageData.md) | A representation of the champion spell data returned by Community Dragon. |
| [SpellData](/shieldbow/api/SpellData.md) | A representation of the champion spell data returned by Data Dragon. |
| [StatPerk](/shieldbow/api/StatPerk.md) |  |
| [SummonerData](/shieldbow/api/SummonerData.md) |  |
| [SummonerSpellData](/shieldbow/api/SummonerSpellData.md) |  |
| [TeamBanData](/shieldbow/api/TeamBanData.md) |  |
| [TeamData](/shieldbow/api/TeamData.md) |  |
| [TeamObjectiveData](/shieldbow/api/TeamObjectiveData.md) |  |
| [TeamObjectivesData](/shieldbow/api/TeamObjectivesData.md) |  |
| [TournamentData](/shieldbow/api/TournamentData.md) |  |
| [TournamentPlayerData](/shieldbow/api/TournamentPlayerData.md) |  |
| [TournamentPlayerFullData](/shieldbow/api/TournamentPlayerFullData.md) |  |
| [TournamentScheduleData](/shieldbow/api/TournamentScheduleData.md) |  |
| [TournamentTeamData](/shieldbow/api/TournamentTeamData.md) |  |
---

## Variables

| Variable | Description |
| -------- | ----------- |
| [arrToString](/shieldbow/api/arrToString.md) |  |
| [locale](/shieldbow/api/locale.md) |  |
| [multiply](/shieldbow/api/multiply.md) |  |
| [performMath](/shieldbow/api/performMath.md) |  |
| [round](/shieldbow/api/round.md) | Rounds the value to up to 2 decimal points. |
| [Stat](/shieldbow/api/Stat.md) | An array of all possible statistics needed for spell math. |
| [StatFormula](/shieldbow/api/StatFormula.md) | The part of the stat that needs to be considered during spell math. |
| [statPerks](/shieldbow/api/statPerks.md) | The available stat perks. |
---

## Type Aliases

| Type Alias | Description |
| ---------- | ----------- |
| [DivisionType](/shieldbow/api/DivisionType.md) |  |
| [Locales](/shieldbow/api/Locales.md) | A valid locale to fetch the data in. |
| [QueueType](/shieldbow/api/QueueType.md) |  |
| [Region](/shieldbow/api/Region.md) | A valid League of Legends region. |
| [Stats](/shieldbow/api/Stats.md) | A valid champion stat that affects their in-game interactions. |
| [TierType](/shieldbow/api/TierType.md) |  |
