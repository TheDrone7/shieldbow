---
title: methods
description: The API method names.
---

## methods variable

The API method names.

**Signature:**

```ts
methods: {
    readonly ACCOUNT: readonly ["getByPuuid", "getByRiotId"];
    readonly CHAMPION_MASTERY: readonly ["getAllChampionMasteries", "getChampionMastery", "getTopChampionMasteries", "getChampionMasteryScore"];
    readonly CHAMPION: readonly ["getChampionInfo"];
    readonly CLASH: readonly ["getTeamById", "getPlayersBySummoner", "getTournaments", "getTournamentById", "getTournamentByTeam"];
    readonly LEAGUE_EXP: readonly ["getLeagueEntries"];
    readonly LEAGUE: readonly ["getLeagueEntriesForSummoner", "getLeagueById", "getLeagueEntries", "getChallengerLeague", "getGrandmasterLeague", "getMasterLeague"];
    readonly LOL_CHALLENGES: readonly ["getAllChallengeConfigs", "getAllChallengePercentiles", "getChallengeConfigs", "getChallengeLeaderboards", "getChallengePercentiles", "getPlayerData"];
    readonly LOL_STATUS: readonly ["getPlatformData"];
    readonly MATCH: readonly ["getMatchIdsByPUUID", "getMatch", "getTimeline"];
    readonly SPECTATOR: readonly ["getCurrentGameInfoBySummoner", "getFeaturedGames"];
    readonly SUMMONER: readonly ["getByAccountId", "getBySummonerName", "getByPUUID", "getBySummonerId"];
}
```

