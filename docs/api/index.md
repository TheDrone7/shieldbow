# API Reference

## Classes

| Class | Description |
| ----- | ----------- |
| [Account](/api/Account.md) | A representation of a RIOT account. |
| [AccountManager](/api/AccountManager.md) | An account manager - to fetch and manage all the RIOT accounts. |
| [ApiError](/api/ApiError.md) | API error class. |
| [ApiHandler](/api/ApiHandler.md) | A class that handles API requests and rate limits for the RIOT API. |
| [Bounty](/api/Bounty.md) | A representation of the bounty on a match participant. |
| [Champion](/api/Champion.md) | A representation of a League of Legends champion. |
| [ChampionManager](/api/ChampionManager.md) | A champion manager - to fetch and manage all the champion data. |
| [ChampionMastery](/api/ChampionMastery.md) | A representation of a summoner's mastery over a champion. |
| [ChampionMasteryManager](/api/ChampionMasteryManager.md) | A champion mastery manager - to fetch and manage all summoner's champion mastery data. |
| [ChampionSkin](/api/ChampionSkin.md) | A representation of a champion's skin (visual modification). |
| [ChampionSpell](/api/ChampionSpell.md) | The representation of a champion's spell (ability). |
| [ChampionStat](/api/ChampionStat.md) | A representation of the champion's base stats. |
| [ClashManager](/api/ClashManager.md) | A clash manager - to fetch and store clash tournaments and related data. |
| [Client](/api/Client.md) | The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs. |
| [CurrentGame](/api/CurrentGame.md) | A representation of an ongoing game. |
| [CurrentGameManager](/api/CurrentGameManager.md) | A current game manager - to fetch and manage the live games. |
| [CurrentGameParticipant](/api/CurrentGameParticipant.md) | A representation of a participant in a live game. |
| [CurrentGamePerks](/api/CurrentGamePerks.md) | A representation of the rune setup of a live game participant. |
| [CurrentGameTeam](/api/CurrentGameTeam.md) | A representation of a team in a live game. |
| [Item](/api/Item.md) | A representation of an in-game item. |
| [ItemManager](/api/ItemManager.md) | An item manager - to fetch and manage all item data. |
| [LeagueEntry](/api/LeagueEntry.md) | A representation of a summoner's competitive details. |
| [LeagueList](/api/LeagueList.md) | A representation of a list of league entries. |
| [LeagueManager](/api/LeagueManager.md) | A league manager - to fetch and manage all summoner competitive info. |
| [Match](/api/Match.md) | A representation of a league of legends match. |
| [MatchManager](/api/MatchManager.md) | A match manager - to fetch and manage matches. |
| [Participant](/api/Participant.md) | A representation of a participant in a match. |
| [Perks](/api/Perks.md) | A representation of the perks (runes) selected by a summoner for a match. |
| [PerkStyle](/api/PerkStyle.md) | A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected. |
| [Ratelimiter](/api/Ratelimiter.md) | A utility class that handles ratelimits. |
| [Rune](/api/Rune.md) | A representation of an in-game rune. |
| [RuneTree](/api/RuneTree.md) | A representation of an in-game rune tree |
| [RuneTreeManager](/api/RuneTreeManager.md) | A rune trees manager - to fetch and manage rune trees data. |
| [StorageManager](/api/StorageManager.md) | A basic manager for storing and fetching the local cached JSON files. |
| [Summoner](/api/Summoner.md) | A representation of a summoner (player). |
| [SummonerManager](/api/SummonerManager.md) | A summoner manager - to fetch and manage all the summoner data. |
| [SummonerSpell](/api/SummonerSpell.md) | A representation of an in-game summoner spell. |
| [SummonerSpellManager](/api/SummonerSpellManager.md) | A spell manager - to fetch and manage all summoner spell data. |
| [Team](/api/Team.md) | A representation of a team in a match. |
| [Tournament](/api/Tournament.md) | A representation of a clash tournament. |
| [TournamentPlayer](/api/TournamentPlayer.md) | A representation of a player in a clash tournament. |
| [TournamentSchedule](/api/TournamentSchedule.md) | A representation of a clash tournament schedule. |
| [TournamentTeam](/api/TournamentTeam.md) | A representation of a team in a clash tournament. |
---

## Functions

| Function | Description |
| -------- | ----------- |
| [arrToString(values)](/api/arrToString.md) | Parses the float values and returns rounded strings. |
| [hash(str, { size })](/api/hash.md) | A simple fnv1a hashing utility - to help with community dragon data parsing. |
| [multiply(part1, part2)](/api/multiply.md) | Multiplies two spell calculation parts. |
| [performMath(calculation, effects, datavalue, maxRank, options)](/api/performMath.md) | A function that takes in calculations and performs the necessary operations to generate appropriate tooltips. |
| [round(value)](/api/round.md) | Rounds the value to up to 2 decimal points. |
---

## Interfaces

| Interface | Description |
| --------- | ----------- |
| [AccountData](/api/AccountData.md) | The account data structure as returned by the API. |
| [ApiRequestOptions](/api/ApiRequestOptions.md) | The API request options. |
| [BaseManager](/api/BaseManager.md) | A base for any manager classes. |
| [CacheConfig](/api/CacheConfig.md) | Client's data dragon cache configuration. |
| [ChampionBan](/api/ChampionBan.md) | A banned champion in a match. |
| [ChampionData](/api/ChampionData.md) | A representation of the champion data returned by Data Dragon. |
| [ChampionMasteryData](/api/ChampionMasteryData.md) | The champion mastery data as returned by the API. |
| [ChampionPassive](/api/ChampionPassive.md) | The data about a champion's passive. |
| [ChampionPricing](/api/ChampionPricing.md) | The pricing data of a champion. |
| [ChampionRating](/api/ChampionRating.md) | A representation of the champion rating data returned by Data Dragon. |
| [ChampionSkinData](/api/ChampionSkinData.md) | A representation of the champion skin data returned by Data Dragon. |
| [ClientConfig](/api/ClientConfig.md) | The basic configuration for the shieldbow Client. |
| [CurrentGameBanData](/api/CurrentGameBanData.md) | The champion ban data as returned by the API. |
| [CurrentGameChampionBan](/api/CurrentGameChampionBan.md) | Current game's team's champion ban information. |
| [CurrentGameData](/api/CurrentGameData.md) | The Current game data as returned by the API. |
| [CurrentGameParticipantData](/api/CurrentGameParticipantData.md) | The Current game participant data as returned by the API. |
| [CurrentGamePerksData](/api/CurrentGamePerksData.md) | The current game participant perks data as returned by the API. |
| [FetchOptions](/api/FetchOptions.md) | The basic fetching options for various fetch methods in the managers. |
| [GameMap](/api/GameMap.md) | Basic data for types of Maps available in the game. |
| [GameMode](/api/GameMode.md) | Basic data for types of game modes. |
| [GameType](/api/GameType.md) | Basic data for types of games. |
| [ImageData](/api/ImageData.md) | A representation of any image data returned by Data Dragon. |
| [ItemData](/api/ItemData.md) | A representation of the item data returned by Data Dragon. |
| [ItemGoldValue](/api/ItemGoldValue.md) | The item's gold value information. |
| [LeagueEntryData](/api/LeagueEntryData.md) | The league entry data as returned by the API. |
| [LeagueListData](/api/LeagueListData.md) | The league list data as returned by the API. |
| [MatchByPlayerOptions](/api/MatchByPlayerOptions.md) | Additional options for filtering a specific summoner's matches. |
| [MatchData](/api/MatchData.md) | The match data as returned by the API. |
| [MerakiChampion](/api/MerakiChampion.md) | A representation of the champion data returned by meraki analytics. These are used in the LoL wiki. |
| [MerakiSkin](/api/MerakiSkin.md) | A representation of a champion's skin data returned by meraki analytics. These are used in the LoL wiki. |
| [ParticipantChampion](/api/ParticipantChampion.md) | The participant's champion details. |
| [ParticipantDamageStats](/api/ParticipantDamageStats.md) | The participant's damage stats. |
| [ParticipantData](/api/ParticipantData.md) | Match participant data as returned by the API |
| [ParticipantHealingStats](/api/ParticipantHealingStats.md) | The participant's healing stats. |
| [ParticipantInhibitorStats](/api/ParticipantInhibitorStats.md) | The participant's inhibitor interaction information. |
| [ParticipantMultkills](/api/ParticipantMultkills.md) | The participant's multikill details. |
| [ParticipantPosition](/api/ParticipantPosition.md) | The participant position details. |
| [ParticipantTotalDamage](/api/ParticipantTotalDamage.md) | The participant's total damage stats. |
| [ParticipantTurretStats](/api/ParticipantTurretStats.md) | The participant's turret interaction information. |
| [ParticipantVision](/api/ParticipantVision.md) | The participant's vision details. |
| [PerksData](/api/PerksData.md) | The perks data for a match participant as returned by the API. |
| [PreFetchConfig](/api/PreFetchConfig.md) | Client's pre-fetching data from data dragon configuration |
| [Promos](/api/Promos.md) | The league entry promotion series information. |
| [Queue](/api/Queue.md) | Basic data for types of queues (matches) in the game. |
| [RuneData](/api/RuneData.md) | The runes data as stored in data dragon. |
| [RuneTreeData](/api/RuneTreeData.md) | The rune trees data as stored in data dragon. |
| [Season](/api/Season.md) | Basic data of seasons of the game. |
| [SkinChroma](/api/SkinChroma.md) | A representation of a champion's skin's chroma from meraki analytics. |
| [SkinPricing](/api/SkinPricing.md) | A representation of a champion's skin's pricing from meraki analytics. |
| [SpellDamageData](/api/SpellDamageData.md) | A representation of the champion spell data returned by Community Dragon. |
| [SpellData](/api/SpellData.md) | A representation of the champion spell data returned by Data Dragon. |
| [StatPerk](/api/StatPerk.md) | The stat perks data for a match participant as returned by the API. |
| [StatPerks](/api/StatPerks.md) | A representation of the stat perks selected by the summoner. |
| [SummonerData](/api/SummonerData.md) | The summoner data as returned by the API. |
| [SummonerSpellData](/api/SummonerSpellData.md) | The summoner spell data as stored in data dragon. |
| [TeamBanData](/api/TeamBanData.md) | The champion ban data as returned by the API. |
| [TeamData](/api/TeamData.md) | The match team data as returned by the API. |
| [TeamObjectiveData](/api/TeamObjectiveData.md) | The individual objective data as returned by the API. |
| [TeamObjectivesData](/api/TeamObjectivesData.md) | The match team objective data as returned by the API. |
| [TournamentData](/api/TournamentData.md) | The clash tournament data as returned by the API. |
| [TournamentPlayerData](/api/TournamentPlayerData.md) | The partial clash tournament player data as returned by the API. |
| [TournamentPlayerFullData](/api/TournamentPlayerFullData.md) | The complete clash tournament player data as returned by the API. |
| [TournamentScheduleData](/api/TournamentScheduleData.md) | The clash tournament schedule data as returned by the API. |
| [TournamentTeamData](/api/TournamentTeamData.md) | The clash tournament team data as returned by the API. |
---

## Variables

| Variable | Description |
| -------- | ----------- |
| [locale](/api/locale.md) | A list of all valid locales. |
| [Stat](/api/Stat.md) | An array of all possible statistics needed for spell math. |
| [StatFormula](/api/StatFormula.md) | The part of the stat that needs to be considered during spell math. |
| [statPerks](/api/statPerks.md) | The available stat perks. |
---

## Type Aliases

| Type Alias | Description |
| ---------- | ----------- |
| [DivisionType](/api/DivisionType.md) | Valid divisions for league entries. |
| [Locales](/api/Locales.md) | A valid locale to fetch the data in. |
| [QueueType](/api/QueueType.md) | The valid type of Queues by which league entries are mapped. |
| [Region](/api/Region.md) | A valid League of Legends region. |
| [Stats](/api/Stats.md) | A valid champion stat that affects their in-game interactions. |
| [TierType](/api/TierType.md) | Valid tiers for league entries. |
