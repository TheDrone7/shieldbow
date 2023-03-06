/**
 * The API method names.
 */
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

/**
 * The Account API method names.
 */
export type AccountMethods = (typeof methods)['ACCOUNT'][number];
/**
 * The Champion Mastery API method names.
 */
export type ChampionMasteryMethods = (typeof methods)['CHAMPION_MASTERY'][number];
/**
 * The Champion API method names.
 */
export type ChampionMethods = (typeof methods)['CHAMPION'][number];
/**
 * The Clash API method names.
 */
export type ClashMethods = (typeof methods)['CLASH'][number];
/**
 * The League Exp API method names.
 */
export type LeagueExpMethods = (typeof methods)['LEAGUE_EXP'][number];
/**
 * The League API method names.
 */
export type LeagueMethods = (typeof methods)['LEAGUE'][number];
/**
 * The Lol Challenges API method names.
 */
export type LolChallengesMethods = (typeof methods)['LOL_CHALLENGES'][number];
/**
 * The Lol Status API method names.
 */
export type LolStatusMethods = (typeof methods)['LOL_STATUS'][number];
/**
 * The Match API method names.
 */
export type MatchMethods = (typeof methods)['MATCH'][number];
/**
 * The Spectator API method names.
 */
export type SpectatorMethods = (typeof methods)['SPECTATOR'][number];
/**
 * The Summoner API method names.
 */
export type SummonerMethods = (typeof methods)['SUMMONER'][number];
