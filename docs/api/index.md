# API Reference

## Classes

| Class | Description |
| ----- | ----------- |
| [Account](/api/Account.md) | A representation of a RIOT account. |
| [AccountManager](/api/AccountManager.md) | An account manager - to fetch and manage all the RIOT accounts.   Requires API key with access to `account-v1` API. |
| [ApiError](/api/ApiError.md) | API error class. |
| [Bounty](/api/Bounty.md) | A representation of the bounty on a match participant. |
| [BuildingKillEvent](/api/BuildingKillEvent.md) | A representation of the building kill event. |
| [Challenge](/api/Challenge.md) | A class representing the details of a challenge. |
| [ChallengeCategory](/api/ChallengeCategory.md) | A representation of a summoner's challenge category data. |
| [ChallengeManager](/api/ChallengeManager.md) | A challenge manager - to fetch and manage all the challenges' data.   Requires API key with access to `lol-challenges-v1` API. |
| [ChallengePreferences](/api/ChallengePreferences.md) | A representation of a summoner's challenge preferences data. |
| [ChallengeProgression](/api/ChallengeProgression.md) | A representation of a summoner's challenge progression data. |
| [ChallengeRank](/api/ChallengeRank.md) | A representation of the ranked challenges stats of a summoner. |
| [Champion](/api/Champion.md) | A representation of a League of Legends champion. |
| [ChampionKillEvent](/api/ChampionKillEvent.md) | The representation of the Champion Kill event. |
| [ChampionManager](/api/ChampionManager.md) | A champion manager - to fetch and manage all the champion data.   Does not require an API Key. (Except for [ChampionManager.fetchRotations](/api/ChampionManager.md#fetchrotations)). |
| [ChampionMastery](/api/ChampionMastery.md) | A representation of a summoner's mastery over a champion. |
| [ChampionMasteryManager](/api/ChampionMasteryManager.md) | A champion mastery manager - to fetch and manage all summoner's champion mastery data.   Requires API key with access to `champion-mastery-v4` API. |
| [ChampionSkin](/api/ChampionSkin.md) | A representation of a champion's skin (visual modification). |
| [ChampionSpecialKillEvent](/api/ChampionSpecialKillEvent.md) | A representation of the Champion special kill event. |
| [ChampionSpell](/api/ChampionSpell.md) | The representation of a champion's spell (ability). |
| [ChampionStat](/api/ChampionStat.md) | A representation of the champion's base stats. |
| [ChampionTransformEvent](/api/ChampionTransformEvent.md) | A representation of the champion transform event.   As of right now, this only applies to Kayn's transformations. |
| [ClashManager](/api/ClashManager.md) | A clash manager - to fetch and store clash tournaments and related data.   Requires API key with access to `clash-v1` API. |
| [Client](/api/Client.md) | The shieldbow client that enables you to interact with Riot Games' League of Legends API. Also connects to the Data Dragon + Community Dragon CDNs. |
| [CurrentGame](/api/CurrentGame.md) | A representation of an ongoing game. |
| [CurrentGameManager](/api/CurrentGameManager.md) | A current game manager - to fetch and manage the live games.   Requires API key with access to `spectator-v4` API. |
| [CurrentGameParticipant](/api/CurrentGameParticipant.md) | A representation of a participant in a live game. |
| [CurrentGamePerks](/api/CurrentGamePerks.md) | A representation of the rune setup of a live game participant. |
| [CurrentGameTeam](/api/CurrentGameTeam.md) | A representation of a team in a live game. |
| [DragonSoulGivenEvent](/api/DragonSoulGivenEvent.md) | A representation of the dragon soul given event. |
| [EliteMonsterKillEvent](/api/EliteMonsterKillEvent.md) | A representation of the Elite monster kill event. |
| [GameEndEvent](/api/GameEndEvent.md) | A representation of the game end event. |
| [Item](/api/Item.md) | A representation of an in-game item. |
| [ItemDestroyedEvent](/api/ItemDestroyedEvent.md) | A representation of the Item destroyed event. |
| [ItemManager](/api/ItemManager.md) | An item manager - to fetch and manage all item data.   Does not require an API Key. |
| [ItemPurchasedEvent](/api/ItemPurchasedEvent.md) | A representation of the Item Purchased event. |
| [ItemSoldEvent](/api/ItemSoldEvent.md) | A representation of the item sold event. |
| [ItemUndoEvent](/api/ItemUndoEvent.md) | A representation of the Item Undo event. |
| [LeagueEntry](/api/LeagueEntry.md) | A representation of a summoner's competitive details. |
| [LeagueList](/api/LeagueList.md) | A representation of a list of league entries. |
| [LeagueManager](/api/LeagueManager.md) | A league manager - to fetch and manage all summoner competitive info.   Requires API key with access to `league-v4` and `league-exp-v4` API. |
| [LevelUpEvent](/api/LevelUpEvent.md) | A representation of the Level up event. |
| [LocalStorage](/api/LocalStorage.md) | A basic storage plugin that stores data to the local file system. |
| [Match](/api/Match.md) | A representation of a league of legends match. |
| [MatchManager](/api/MatchManager.md) | A match manager - to fetch and manage matches. |
| [MatchTimeline](/api/MatchTimeline.md) | A representation of the timeline data for a match. |
| [MemoryCache](/api/MemoryCache.md) | A basic caching manager that caches to the system memory using a Map. |
| [ObjectiveBountyPrestartEvent](/api/ObjectiveBountyPrestartEvent.md) | A representation of the objective bounty prestart event. |
| [Participant](/api/Participant.md) | A representation of a participant in a match. |
| [ParticipantFrame](/api/ParticipantFrame.md) | A representation of a participant's stats at a point in the timeline. |
| [ParticipantFrameChampionStats](/api/ParticipantFrameChampionStats.md) | A representation of the participant's champion stats in a [ParticipantFrame](/api/ParticipantFrame.md#). |
| [ParticipantFrameDamageStats](/api/ParticipantFrameDamageStats.md) | A representation of the participant's damage stats in a [ParticipantFrame](/api/ParticipantFrame.md#). |
| [PauseEndEvent](/api/PauseEndEvent.md) | A representation of the Pause end event.   Takes place when a game pause ends or when the game first begins after the loading screen. |
| [Perks](/api/Perks.md) | A representation of the perks (runes) selected by a summoner for a match. |
| [PerkStyle](/api/PerkStyle.md) | A representation of a perk style - a tree and 4 (if primary) or 2 (if secondary) runes that were selected. |
| [Position](/api/Position.md) | A representation of a position in the game. |
| [RateLimiter](/api/RateLimiter.md) | The rate limiter class. Used to send requests to the API. |
| [RequestQueue](/api/RequestQueue.md) | A queue that can be used to queue up requests. |
| [Rune](/api/Rune.md) | A representation of an in-game rune. |
| [RuneTree](/api/RuneTree.md) | A representation of an in-game rune tree |
| [RuneTreeManager](/api/RuneTreeManager.md) | A rune trees manager - to fetch and manage rune trees data. |
| [ShieldbowLogger](/api/ShieldbowLogger.md) | Basic built-in debugging logger?. |
| [SkillLevelUpEvent](/api/SkillLevelUpEvent.md) | A representation of the Skill Level Up event. |
| [Summoner](/api/Summoner.md) | A representation of a summoner (player). |
| [SummonerChallenge](/api/SummonerChallenge.md) | A representation of a summoner's challenge data. |
| [SummonerManager](/api/SummonerManager.md) | A summoner manager - to fetch and manage all the summoner data. |
| [SummonerSpell](/api/SummonerSpell.md) | A representation of an in-game summoner spell. |
| [SummonerSpellManager](/api/SummonerSpellManager.md) | A spell manager - to fetch and manage all summoner spell data. |
| [Team](/api/Team.md) | A representation of a team in a match. |
| [TimelineEvent](/api/TimelineEvent.md) | A representation of an event in a match timeline. |
| [TimelineEventFactory](/api/TimelineEventFactory.md) | The timeline event factory - to create a timeline event from a raw data object. |
| [TimelineFrame](/api/TimelineFrame.md) | A representation of a frame in a match timeline. |
| [TotalChallengePoints](/api/TotalChallengePoints.md) | A representation of the overview of a summoner's challenge data. |
| [Tournament](/api/Tournament.md) | A representation of a clash tournament. |
| [TournamentPlayer](/api/TournamentPlayer.md) | A representation of a player in a clash tournament. |
| [TournamentSchedule](/api/TournamentSchedule.md) | A representation of a clash tournament schedule. |
| [TournamentTeam](/api/TournamentTeam.md) | A representation of a team in a clash tournament. |
| [TurretPlateDestroyedEvent](/api/TurretPlateDestroyedEvent.md) | A representation of the Turret place destroyed event. |
| [WardKillEvent](/api/WardKillEvent.md) | A representation of the ward kill event. |
| [WardPlacedEvent](/api/WardPlacedEvent.md) | A representation of the Ward Placed event. |
---

## Functions

| Function | Description |
| -------- | ----------- |
| [arrToString(values)](/api/arrToString.md) | Parses the float values and returns rounded strings. |
| [hash(str, { size })](/api/hash.md) | A simple fnv1a hashing utility - to help with community dragon data parsing. |
| [multiply(part1, part2)](/api/multiply.md) | Multiplies two spell calculation parts. |
| [parseHeaders(headers)](/api/parseHeaders.md) | Parses the rate limit headers. |
| [performMath(calculation, effects, datavalue, maxRank, options)](/api/performMath.md) | A function that takes in calculations and performs the necessary operations to generate appropriate tooltips. |
| [round(value)](/api/round.md) | Rounds the value to up to 2 decimal points. |
---

## Interfaces

| Interface | Description |
| --------- | ----------- |
| [AccountData](/api/AccountData.md) | The account data structure as returned by the API. |
| [ApiRequestOptions](/api/ApiRequestOptions.md) | The API request options. |
| [BaseManager](/api/BaseManager.md) | A base for any manager classes. |
| [BuildingKillEventData](/api/BuildingKillEventData.md) | The event data for building kill event. |
| [CacheConfig](/api/CacheConfig.md) | Client's caching plugin configuration. |
| [ChallengeCategoryData](/api/ChallengeCategoryData.md) | The raw challenge category data. |
| [ChallengeConfigData](/api/ChallengeConfigData.md) | The raw challenge config data. |
| [ChallengePreferencesData](/api/ChallengePreferencesData.md) | The raw challenge preferences data. |
| [ChallengeProgressionData](/api/ChallengeProgressionData.md) | The raw challenge progression data. |
| [ChallengeRankData](/api/ChallengeRankData.md) | The raw data regarding a player's placement in a challenge ladder. |
| [ChampionBan](/api/ChampionBan.md) | A banned champion in a match. |
| [ChampionData](/api/ChampionData.md) | A representation of the champion data returned by Data Dragon. |
| [ChampionKillEventData](/api/ChampionKillEventData.md) | The event data for the champion kill event. |
| [ChampionMasteryData](/api/ChampionMasteryData.md) | The champion mastery data as returned by the API. |
| [ChampionPassive](/api/ChampionPassive.md) | The data about a champion's passive. |
| [ChampionPricing](/api/ChampionPricing.md) | The pricing data of a champion. |
| [ChampionRating](/api/ChampionRating.md) | A representation of the champion rating data returned by Data Dragon. |
| [ChampionSkinData](/api/ChampionSkinData.md) | A representation of the champion skin data returned by Data Dragon. |
| [ChampionSpecialKillEventData](/api/ChampionSpecialKillEventData.md) | The event data for the champion special kill event. |
| [ChampionSprite](/api/ChampionSprite.md) | The sprite data of a champion. |
| [ChampionTransformEventData](/api/ChampionTransformEventData.md) | The event data for the champion transform event. |
| [ClientConfig](/api/ClientConfig.md) | The basic configuration for the shieldbow Client. |
| [CurrentGameBanData](/api/CurrentGameBanData.md) | The champion ban data as returned by the API. |
| [CurrentGameChampionBan](/api/CurrentGameChampionBan.md) | Current game's team's champion ban information. |
| [CurrentGameData](/api/CurrentGameData.md) | The Current game data as returned by the API. |
| [CurrentGameParticipantData](/api/CurrentGameParticipantData.md) | The Current game participant data as returned by the API. |
| [CurrentGamePerksData](/api/CurrentGamePerksData.md) | The current game participant perks data as returned by the API. |
| [DamageDealtData](/api/DamageDealtData.md) | The data of the damage dealt on a champion during their death on the map. |
| [DragonSoulGivenEventData](/api/DragonSoulGivenEventData.md) | The event data for the dragon soul given event. |
| [EliteMonsterKillEventData](/api/EliteMonsterKillEventData.md) | The event data for the elite monster kill event. |
| [FetchOptions](/api/FetchOptions.md) | The basic fetching options for various fetch methods in the managers. |
| [GameEndEventData](/api/GameEndEventData.md) | The event data for the game end event. |
| [GameMap](/api/GameMap.md) | Basic data for types of Maps available in the game. |
| [GameMode](/api/GameMode.md) | Basic data for types of game modes. |
| [GameType](/api/GameType.md) | Basic data for types of games. |
| [ICache](/api/ICache.md) | The base cache interface for the cache plugin to be used. |
| [ILogger](/api/ILogger.md) | The basic logger interface for the logging plugins to be used. |
| [ImageData](/api/ImageData.md) | A representation of any image data returned by Data Dragon. |
| [IStorage](/api/IStorage.md) | The base storage interface for the storage plugin to be used. |
| [ItemData](/api/ItemData.md) | A representation of the item data returned by Data Dragon. |
| [ItemDestroyedEventData](/api/ItemDestroyedEventData.md) | The event data for the item destroyed event. |
| [ItemGoldValue](/api/ItemGoldValue.md) | The item's gold value information. |
| [ItemPurchasedEventData](/api/ItemPurchasedEventData.md) | The event data for the item purchased event. |
| [ItemSoldEventData](/api/ItemSoldEventData.md) | The event data for the item sold event. |
| [ItemUndoEventData](/api/ItemUndoEventData.md) | The event data for the item undo event. |
| [LeagueEntryData](/api/LeagueEntryData.md) | The league entry data as returned by the API. |
| [LeagueListData](/api/LeagueListData.md) | The league list data as returned by the API. |
| [LevelUpEventData](/api/LevelUpEventData.md) | The event data for the champion level up event. |
| [LocalizedChallengeData](/api/LocalizedChallengeData.md) | The raw challenge name/description data. |
| [LoggerConfig](/api/LoggerConfig.md) | Client's logging utility configuration. |
| [ManagersConfig](/api/ManagersConfig.md) | Managers configuration is a means to enable/disable storage/caching of the library across the different managers. |
| [MatchByPlayerOptions](/api/MatchByPlayerOptions.md) | Additional options for filtering a specific summoner's matches. |
| [MatchData](/api/MatchData.md) | The match data as returned by the API. |
| [MatchTimelineData](/api/MatchTimelineData.md) | The match timeline data as returned by the API. |
| [MatchTimelineFrameData](/api/MatchTimelineFrameData.md) | The match timeline frame as returned by the API. |
| [MatchTimelineInfo](/api/MatchTimelineInfo.md) | The match timeline details as returned by the API. |
| [MatchTimelineMetadata](/api/MatchTimelineMetadata.md) | The match timeline metadata as returned by the API. |
| [MerakiChampion](/api/MerakiChampion.md) | A representation of the champion data returned by meraki analytics. These are used in the LoL wiki. |
| [MerakiSkin](/api/MerakiSkin.md) | A representation of a champion's skin data returned by meraki analytics. |
| [MerakiSkinChroma](/api/MerakiSkinChroma.md) | A representation of a champion's skin data returned by meraki analytics. These are used in the LoL wiki. |
| [MethodRateLimitConfig](/api/MethodRateLimitConfig.md) | The rate limit config structure for methods (internal usage). |
| [MethodRateLimitOptions](/api/MethodRateLimitOptions.md) | The rate limit config structure for methods (options). |
| [ObjectiveBountyPrestartEventData](/api/ObjectiveBountyPrestartEventData.md) | The event data for the objective bounty prestart event. |
| [PartialSummoner](/api/PartialSummoner.md) | A partial representation of a summoner. |
| [ParticipantChampion](/api/ParticipantChampion.md) | The participant's champion details. |
| [ParticipantChampionStatsData](/api/ParticipantChampionStatsData.md) | The participant champion stats as returned by the API. |
| [ParticipantDamageStats](/api/ParticipantDamageStats.md) | The participant's damage stats. |
| [ParticipantDamageStatsData](/api/ParticipantDamageStatsData.md) | The participant damage stats as returned by the API. |
| [ParticipantData](/api/ParticipantData.md) | Match participant data as returned by the API |
| [ParticipantFrameData](/api/ParticipantFrameData.md) | The Participant Frame as returned by the API. |
| [ParticipantHealingStats](/api/ParticipantHealingStats.md) | The participant's healing stats. |
| [ParticipantInhibitorStats](/api/ParticipantInhibitorStats.md) | The participant's inhibitor interaction information. |
| [ParticipantMultkills](/api/ParticipantMultkills.md) | The participant's multikill details. |
| [ParticipantPosition](/api/ParticipantPosition.md) | The participant position details. |
| [ParticipantTotalDamage](/api/ParticipantTotalDamage.md) | The participant's total damage stats. |
| [ParticipantTurretStats](/api/ParticipantTurretStats.md) | The participant's turret interaction information. |
| [ParticipantVision](/api/ParticipantVision.md) | The participant's vision details. |
| [PauseEndEventData](/api/PauseEndEventData.md) | The event data for the pause end event. |
| [PerksData](/api/PerksData.md) | The perks data for a match participant as returned by the API. |
| [PositionData](/api/PositionData.md) | A representation of an object's position on the map. |
| [PreFetchConfig](/api/PreFetchConfig.md) | Client's pre-fetching data from data dragon configuration. |
| [Promos](/api/Promos.md) | The league entry promotion series information. |
| [Queue](/api/Queue.md) | Basic data for types of queues (matches) in the game. |
| [RateLimitConfig](/api/RateLimitConfig.md) | The rate limit config structure. |
| [RateLimiterConfig](/api/RateLimiterConfig.md) | The rate limiter config (internal). |
| [RateLimiterOptions](/api/RateLimiterOptions.md) | The rate limiter options. |
| [RetryOptions](/api/RetryOptions.md) | The retry options. |
| [RuneData](/api/RuneData.md) | The runes data as stored in data dragon. |
| [RuneTreeData](/api/RuneTreeData.md) | The rune trees data as stored in data dragon. |
| [Season](/api/Season.md) | Basic data of seasons of the game. |
| [SkillLevelUpEventData](/api/SkillLevelUpEventData.md) | The event data for the skill level up event. |
| [SkinChroma](/api/SkinChroma.md) | A representation of a champion's skin's chroma from meraki analytics. |
| [SkinPricing](/api/SkinPricing.md) | A representation of a champion's skin's pricing from meraki analytics. |
| [SpellDamageData](/api/SpellDamageData.md) | A representation of the champion spell data returned by Community Dragon. |
| [SpellData](/api/SpellData.md) | A representation of the champion spell data returned by Data Dragon. |
| [SpriteCoordinate](/api/SpriteCoordinate.md) | The sprite coordinate data of a champion. |
| [SpriteSize](/api/SpriteSize.md) | The sprite size data of a champion. |
| [StatPerk](/api/StatPerk.md) | The stat perks data for a match participant as returned by the API. |
| [StatPerks](/api/StatPerks.md) | A representation of the stat perks selected by the summoner. |
| [StorageConfig](/api/StorageConfig.md) | Client's storage plugin configuration. |
| [SummonerChallengeData](/api/SummonerChallengeData.md) | The raw challenge data for a summoner. |
| [SummonerData](/api/SummonerData.md) | The summoner data as returned by the API. |
| [SummonerSpellData](/api/SummonerSpellData.md) | The summoner spell data as stored in data dragon. |
| [TeamBanData](/api/TeamBanData.md) | The champion ban data as returned by the API. |
| [TeamData](/api/TeamData.md) | The match team data as returned by the API. |
| [TeamObjectiveData](/api/TeamObjectiveData.md) | The individual objective data as returned by the API. |
| [TeamObjectivesData](/api/TeamObjectivesData.md) | The match team objective data as returned by the API. |
| [TimelineEventData](/api/TimelineEventData.md) | The base of a match timeline event. |
| [TotalChallengePointsData](/api/TotalChallengePointsData.md) | The raw overview of a summoner's challenge data. |
| [TournamentData](/api/TournamentData.md) | The clash tournament data as returned by the API. |
| [TournamentPlayerData](/api/TournamentPlayerData.md) | The partial clash tournament player data as returned by the API. |
| [TournamentPlayerFullData](/api/TournamentPlayerFullData.md) | The complete clash tournament player data as returned by the API. |
| [TournamentScheduleData](/api/TournamentScheduleData.md) | The clash tournament schedule data as returned by the API. |
| [TournamentTeamData](/api/TournamentTeamData.md) | The clash tournament team data as returned by the API. |
| [TurretPlateDestroyedEventData](/api/TurretPlateDestroyedEventData.md) | The event data for the turret plate destroyed event. |
| [WardKillEventData](/api/WardKillEventData.md) | The event data for the ward kill event. |
| [WardPlacedEventData](/api/WardPlacedEventData.md) | The event data for the ward placed event. |
---

## Variables

| Variable | Description |
| -------- | ----------- |
| [apiBaseURLs](/api/apiBaseURLs.md) | The list of base URLs by region. |
| [locale](/api/locale.md) | A list of all valid locales. |
| [methods](/api/methods.md) | The API method names. |
| [mockRatelimitedResponse](/api/mockRatelimitedResponse.md) | A mock rate limit error response. This is sent by the rate limiter when the rate limit is exceeded. If it is an actual 429 response by the API, it is a problem with the rate limiter. |
| [parseFetchOptions](/api/parseFetchOptions.md) | A utility for parsing the fetch options using request specific, client config and default settings. |
| [parseOptions](/api/parseOptions.md) | Parses the given options for the rate limiter. |
| [rawStatPerks](/api/rawStatPerks.md) | The available stat perks. |
| [regionalURLs](/api/regionalURLs.md) | The list of base regional URLs by region. |
| [responseHelp](/api/responseHelp.md) | Returns a string with a description of the error. |
| [Stat](/api/Stat.md) | An array of all possible statistics needed for spell math. |
| [StatFormula](/api/StatFormula.md) | The part of the stat that needs to be considered during spell math. |
---

## Type Aliases

| Type Alias | Description |
| ---------- | ----------- |
| [AccountMethods](/api/AccountMethods.md) | The Account API method names. |
| [ApiManagerKey](/api/ApiManagerKey.md) | List of managers that interact with the API. |
| [CategoryName](/api/CategoryName.md) | The category names for challenge categories. |
| [ChampionMasteryMethods](/api/ChampionMasteryMethods.md) | The Champion Mastery API method names. |
| [ChampionMethods](/api/ChampionMethods.md) | The Champion API method names. |
| [ClashMethods](/api/ClashMethods.md) | The Clash API method names. |
| [DivisionType](/api/DivisionType.md) | Valid divisions for league entries. |
| [DragonManagerKey](/api/DragonManagerKey.md) | List of managers that interact with DDragon/CDragon. |
| [LeagueExpMethods](/api/LeagueExpMethods.md) | The League Exp API method names. |
| [LeagueMethods](/api/LeagueMethods.md) | The League API method names. |
| [Locales](/api/Locales.md) | A valid locale to fetch the data in. |
| [LocalizedChallengeNameData](/api/LocalizedChallengeNameData.md) | The raw challenge name/description data mapped by locale. |
| [LogLevel](/api/LogLevel.md) | The Logger levels as a string, for easier usage. |
| [LolChallengesMethods](/api/LolChallengesMethods.md) | The Lol Challenges API method names. |
| [LolStatusMethods](/api/LolStatusMethods.md) | The Lol Status API method names. |
| [MatchMethods](/api/MatchMethods.md) | The Match API method names. |
| [QueueType](/api/QueueType.md) | The valid type of Queues by which league entries are mapped. |
| [Region](/api/Region.md) | A valid League of Legends region. |
| [SpectatorMethods](/api/SpectatorMethods.md) | The Spectator API method names. |
| [Stats](/api/Stats.md) | A valid champion stat that affects their in-game interactions. |
| [SummonerMethods](/api/SummonerMethods.md) | The Summoner API method names. |
| [TierType](/api/TierType.md) | Valid tiers for league entries. |
