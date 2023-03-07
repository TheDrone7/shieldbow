import type { MethodRateLimitConfig, RateLimitConfig, RateLimiterConfig, RateLimiterOptions } from './config';
import { methods } from './constants';

/**
 * Parses the given options for the rate limiter.
 * @param opts - The options to parse.
 */
const parse = (opts: RateLimiterOptions): RateLimiterConfig => {
  const defaultLimit: RateLimitConfig[] = [];

  // Default config.
  const newOpts: RateLimiterConfig = {
    appLimit: opts.appLimit ?? defaultLimit,
    methodLimit: {
      ACCOUNT: { x: defaultLimit },
      CHAMPION: { x: defaultLimit },
      CHAMPION_MASTERY: { x: defaultLimit },
      CLASH: { x: defaultLimit },
      LEAGUE: { x: defaultLimit },
      LEAGUE_EXP: { x: defaultLimit },
      LOL_CHALLENGES: { x: defaultLimit },
      LOL_STATUS: { x: defaultLimit },
      MATCH: { x: defaultLimit },
      SPECTATOR: { x: defaultLimit },
      SUMMONER: { x: defaultLimit }
    },
    throw: opts.throw ?? true,
    retry: opts.retry ?? { retries: 0, retryDelay: 3000 },
    strategy: opts.strategy ?? 'burst'
  };

  // Actually parse the given options.

  if (!opts.methodLimit) opts.methodLimit = defaultLimit;

  if (Array.isArray(opts.methodLimit)) {
    const newMethodLimit: { [api: string]: RateLimitConfig[] } = {};
    for (const api of Object.keys(methods)) {
      const apiKey = api as keyof typeof methods;
      newMethodLimit[apiKey] = opts.methodLimit;
    }
    opts.methodLimit = newMethodLimit;
  }

  if (Array.isArray(opts.methodLimit.ACCOUNT))
    opts.methodLimit.ACCOUNT = {
      getByPuuid: opts.methodLimit.ACCOUNT,
      getByRiotId: opts.methodLimit.ACCOUNT
    };

  if (Array.isArray(opts.methodLimit.CHAMPION_MASTERY))
    opts.methodLimit.CHAMPION_MASTERY = {
      getAllChampionMasteries: opts.methodLimit.CHAMPION_MASTERY,
      getChampionMastery: opts.methodLimit.CHAMPION_MASTERY,
      getChampionMasteryScore: opts.methodLimit.CHAMPION_MASTERY,
      getTopChampionMasteries: opts.methodLimit.CHAMPION_MASTERY
    };

  if (Array.isArray(opts.methodLimit.CHAMPION_MASTERY))
    opts.methodLimit.CHAMPION_MASTERY = {
      getAllChampionMasteries: opts.methodLimit.CHAMPION_MASTERY,
      getChampionMastery: opts.methodLimit.CHAMPION_MASTERY,
      getChampionMasteryScore: opts.methodLimit.CHAMPION_MASTERY,
      getTopChampionMasteries: opts.methodLimit.CHAMPION_MASTERY
    };

  if (Array.isArray(opts.methodLimit.CHAMPION))
    opts.methodLimit.CHAMPION = {
      getChampionInfo: opts.methodLimit.CHAMPION
    };

  if (Array.isArray(opts.methodLimit.CLASH))
    opts.methodLimit.CLASH = {
      getPlayersBySummoner: opts.methodLimit.CLASH,
      getTeamById: opts.methodLimit.CLASH,
      getTournaments: opts.methodLimit.CLASH,
      getTournamentById: opts.methodLimit.CLASH,
      getTournamentByTeam: opts.methodLimit.CLASH
    };

  if (Array.isArray(opts.methodLimit.LEAGUE_EXP))
    opts.methodLimit.LEAGUE_EXP = {
      getLeagueEntries: opts.methodLimit.LEAGUE_EXP
    };

  if (Array.isArray(opts.methodLimit.LEAGUE))
    opts.methodLimit.LEAGUE = {
      getLeagueEntriesForSummoner: opts.methodLimit.LEAGUE,
      getLeagueById: opts.methodLimit.LEAGUE
    };

  if (Array.isArray(opts.methodLimit.LOL_STATUS))
    opts.methodLimit.LOL_STATUS = {
      getPlatformData: opts.methodLimit.LOL_STATUS
    };

  if (Array.isArray(opts.methodLimit.LOL_CHALLENGES))
    opts.methodLimit.LOL_CHALLENGES = {
      getAllChallengeConfigs: opts.methodLimit.LOL_CHALLENGES,
      getAllChallengePercentiles: opts.methodLimit.LOL_CHALLENGES,
      getChallengeConfigs: opts.methodLimit.LOL_CHALLENGES,
      getChallengeLeaderboards: opts.methodLimit.LOL_CHALLENGES,
      getChallengePercentiles: opts.methodLimit.LOL_CHALLENGES,
      getPlayerData: opts.methodLimit.LOL_CHALLENGES
    };

  if (Array.isArray(opts.methodLimit.MATCH))
    opts.methodLimit.MATCH = {
      getMatch: opts.methodLimit.MATCH,
      getMatchIdsByPUUID: opts.methodLimit.MATCH,
      getTimeline: opts.methodLimit.MATCH
    };

  if (Array.isArray(opts.methodLimit.SPECTATOR))
    opts.methodLimit.SPECTATOR = {
      getCurrentGameInfoBySummoner: opts.methodLimit.SPECTATOR,
      getFeaturedGames: opts.methodLimit.SPECTATOR
    };

  if (Array.isArray(opts.methodLimit.SUMMONER))
    opts.methodLimit.SUMMONER = {
      getByAccountId: opts.methodLimit.SUMMONER,
      getByPUUID: opts.methodLimit.SUMMONER,
      getBySummonerName: opts.methodLimit.SUMMONER,
      getBySummonerId: opts.methodLimit.SUMMONER
    };

  newOpts.methodLimit = opts.methodLimit as MethodRateLimitConfig;
  return newOpts;
};

export default parse;
