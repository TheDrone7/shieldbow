import { IRateLimit } from './types';

/**
 * An error class for the RateLimiter.
 */
export class ShieldbowRateLimiterError extends Error {
  /**
   * Creates (and throws) a new RateLimiterError instance.
   * @param method - The method that was rate limited.
   * @param limit - The rate limit that was exceeded.
   */
  constructor(method: string, limits: IRateLimit) {
    let message = `Rate limit exceeded for ${method === 'app' ? 'the' : 'method'} '${method}' with limit '${
      limits.limit
    } / ${limits.duration}ms'.`;
    message += `\nCurrent count: ${limits.count}, resets at ${new Date(limits.reset).toISOString()}.`;
    super(message);
    this.name = 'Shieldbow Rate Limiter Error';
  }
}
