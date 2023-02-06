import type { RateLimitConfig, RateLimiterOptions } from './config';
import { AccountMethods, methods } from './constants';

const parse = (opts: RateLimiterOptions): RateLimiterOptions => {
  const newOpts: RateLimiterOptions = {};

  if (opts.throw) newOpts.throw = opts.throw;
  else newOpts.throw = true;

  if (opts.retry) newOpts.retry = opts.retry;
  else newOpts.retry = { retries: 0, retryDelay: 0 };

  const defaultLimit: RateLimitConfig[] = [
    { limit: 20, duration: 1000 },
    { limit: 100, duration: 120000 }
  ];
  if (opts.appLimit) newOpts.appLimit = opts.appLimit;
  else newOpts.appLimit = defaultLimit;

  if (!opts.methodLimit) opts.methodLimit = defaultLimit;
  if (Array.isArray(opts.methodLimit)) {
    const newMethodLimit: { [api: string]: RateLimitConfig[] } = {};
    for (const api of Object.keys(methods)) {
      const apiKey = api as keyof typeof methods;
      newMethodLimit[apiKey] = opts.methodLimit;
    }
    opts.methodLimit = newMethodLimit;
  }

  if (Array.isArray(opts.methodLimit.ACCOUNT)) {
    const newMethodLimit: { [method in AccountMethods]: RateLimitConfig[] } = {
      getByPuuid: opts.methodLimit.ACCOUNT,
      getByRiotId: opts.methodLimit.ACCOUNT
    };
    for (const method of Object.keys(methods.ACCOUNT)) {
      const methodKey = method as AccountMethods;
      newMethodLimit[methodKey] = opts.methodLimit.ACCOUNT;
    }
    opts.methodLimit.ACCOUNT = newMethodLimit;
  }

  newOpts.methodLimit = opts.methodLimit;

  return newOpts;
};

export default parse;
