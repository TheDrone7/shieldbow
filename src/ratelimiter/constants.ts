export const methods = {
  ACCOUNT: ['getByPuuid', 'getByRiotId'],
  CHAMPION_MASTERY: [
    'getAllChampionMasteries',
    'getChampionMastery',
    'getTopChampionMasteries',
    'getChampionMasteryScore'
  ],
  CHAMPION: ['getChampionInfo'],
  CLASH: ['getTeamById', 'getPlayersBySummoner', 'getTournaments', 'getTournamentById', 'getTournamentByTeam'],
  LEAGUE_EXP: ['getLeagueEntries'],
  LEAGUE: ['getLeagueEntriesForSummoner', 'getLeagueById'],
  LOL_CHALLENGES: [
    'getAllChallengeConfigs',
    'getAllChallengePercentiles',
    'getChallengeConfigs',
    'getChallengeLeaderboards',
    'getChallengePercentiles',
    'getPlayerData'
  ],
  LOL_STATUS: ['getPlatformData'],
  MATCH: ['getMatchIdsByPUUID', 'getMatch', 'getTimeline'],
  SPECTATOR: ['getCurrentGameInfoBySummoner', 'getFeaturedGames'],
  SUMMONER: ['getByAccountId', 'getBySummonerName', 'getByPUUID', 'getBySummonerId']
} as const;

export type AccountMethods = typeof methods['ACCOUNT'][number];
export type ChampionMasteryMethods = typeof methods['CHAMPION_MASTERY'][number];
export type ChampionMethods = typeof methods['CHAMPION'][number];
export type ClashMethods = typeof methods['CLASH'][number];
export type LeagueExpMethods = typeof methods['LEAGUE_EXP'][number];
export type LeagueMethods = typeof methods['LEAGUE'][number];
export type LolChallengesMethods = typeof methods['LOL_CHALLENGES'][number];
export type LolStatusMethods = typeof methods['LOL_STATUS'][number];
export type MatchMethods = typeof methods['MATCH'][number];
export type SpectatorMethods = typeof methods['SPECTATOR'][number];
export type SummonerMethods = typeof methods['SUMMONER'][number];
