import type {
  AccountMethods,
  ChampionMasteryMethods,
  ChampionMethods,
  ClashMethods,
  LeagueExpMethods,
  LeagueMethods,
  LolChallengesMethods,
  LolStatusMethods,
  MatchMethods,
  SpectatorMethods,
  SummonerMethods
} from './constants';

/**
 * The rate limit config structure.
 */
export interface RateLimitConfig {
  limit: number;
  duration: number;
}

/**
 * The rate limit config structure for methods (options).
 */
export interface MethodRateLimitOptions {
  /**
   * The rate limit config for the ACCOUNT methods.
   */
  ACCOUNT?: RateLimitConfig[] | { [k in AccountMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the CHAMPION_MASTERY methods.
   */
  CHAMPION_MASTERY?: RateLimitConfig[] | { [k in ChampionMasteryMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the CHAMPION methods.
   */
  CHAMPION?: RateLimitConfig[] | { [k in ChampionMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the CLASH methods.
   */
  CLASH?: RateLimitConfig[] | { [k in ClashMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the LEAGUE_EXP methods.
   */
  LEAGUE_EXP?: RateLimitConfig[] | { [k in LeagueExpMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the LEAGUE methods.
   */
  LEAGUE?: RateLimitConfig[] | { [k in LeagueMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the LOL_CHALLENGES methods.
   */
  LOL_CHALLENGES?: RateLimitConfig[] | { [k in LolChallengesMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the LOL_STATUS methods.
   */
  LOL_STATUS?: RateLimitConfig[] | { [k in LolStatusMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the MATCH methods.
   */
  MATCH?: RateLimitConfig[] | { [k in MatchMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the SPECTATOR methods.
   */
  SPECTATOR?: RateLimitConfig[] | { [k in SpectatorMethods]: RateLimitConfig[] };
  /**
   * The rate limit config for the SUMMONER methods.
   */
  SUMMONER?: RateLimitConfig[] | { [k in SummonerMethods]: RateLimitConfig[] };
}

/**
 * The rate limit config structure for methods (internal usage).
 */
export interface MethodRateLimitConfig {
  ACCOUNT: { [k: string]: RateLimitConfig[] };
  CHAMPION_MASTERY: { [k: string]: RateLimitConfig[] };
  CHAMPION: { [k: string]: RateLimitConfig[] };
  CLASH: { [k: string]: RateLimitConfig[] };
  LEAGUE_EXP: { [k: string]: RateLimitConfig[] };
  LEAGUE: { [k: string]: RateLimitConfig[] };
  LOL_CHALLENGES: { [k: string]: RateLimitConfig[] };
  LOL_STATUS: { [k: string]: RateLimitConfig[] };
  MATCH: { [k: string]: RateLimitConfig[] };
  SPECTATOR: { [k: string]: RateLimitConfig[] };
  SUMMONER: { [k: string]: RateLimitConfig[] };
}

/**
 * The retry options.
 */
export interface RetryOptions {
  /**
   * The number of retries.
   */
  retries: number;
  /**
   * The delay between retries.
   */
  retryDelay?: number;
}

/**
 * The rate limiter options.
 */
export interface RateLimiterOptions {
  /**
   * The rate limit config for the app.
   */
  appLimit?: RateLimitConfig[];
  /**
   * The rate limit config for the methods.
   */
  methodLimit?: RateLimitConfig[] | MethodRateLimitOptions;
  /**
   * The retry options.
   */
  retry?: RetryOptions;
  /**
   * Whether to throw an error when the rate limit is reached.
   *
   * Default: `true`
   *
   * If `false`, the request will be retried automatically,
   * and the promise will be resolved late.
   */
  throw?: boolean;
  /**
   * The strategy to use when the rate limit is reached.
   * - `burst`: The request will be sent immediately.
   * - `spread`: The request will be slightly delayed to avoid going over rate limit.
   * Default: `burst`
   */
  strategy?: 'burst' | 'spread';
}

/**
 * The rate limiter config (internal).
 */
export interface RateLimiterConfig {
  appLimit: RateLimitConfig[];
  methodLimit: MethodRateLimitConfig;
  retry: RetryOptions;
  throw: boolean;
  strategy: 'burst' | 'spread';
}
