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

export interface RateLimitConfig {
  limit: number;
  duration: number;
}

export interface MethodRateLimitOptions {
  ACCOUNT?: RateLimitConfig[] | { [k in AccountMethods]: RateLimitConfig[] };
  CHAMPION_MASTERY?: RateLimitConfig[] | { [k in ChampionMasteryMethods]: RateLimitConfig[] };
  CHAMPION?: RateLimitConfig[] | { [k in ChampionMethods]: RateLimitConfig[] };
  CLASH?: RateLimitConfig[] | { [k in ClashMethods]: RateLimitConfig[] };
  LEAGUE_EXP?: RateLimitConfig[] | { [k in LeagueExpMethods]: RateLimitConfig[] };
  LEAGUE?: RateLimitConfig[] | { [k in LeagueMethods]: RateLimitConfig[] };
  LOL_CHALLENGES?: RateLimitConfig[] | { [k in LolChallengesMethods]: RateLimitConfig[] };
  LOL_STATUS?: RateLimitConfig[] | { [k in LolStatusMethods]: RateLimitConfig[] };
  MATCH?: RateLimitConfig[] | { [k in MatchMethods]: RateLimitConfig[] };
  SPECTATOR?: RateLimitConfig[] | { [k in SpectatorMethods]: RateLimitConfig[] };
  SUMMONER?: RateLimitConfig[] | { [k in SummonerMethods]: RateLimitConfig[] };
}

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

export interface RetryOptions {
  retries: number;
  retryDelay?: number;
}

export interface RateLimiterOptions {
  appLimit?: RateLimitConfig[];
  methodLimit?: RateLimitConfig[] | MethodRateLimitOptions;
  retry?: RetryOptions;
  throw?: boolean;
  strategy?: 'burst' | 'spread';
}

export interface RateLimiterConfig {
  appLimit: RateLimitConfig[];
  methodLimit: MethodRateLimitConfig;
  retry: RetryOptions;
  throw: boolean;
  strategy: 'burst' | 'spread';
}
