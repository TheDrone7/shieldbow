import { ShieldbowMemoryCache } from '@shieldbow/cache';
import { RateLimiter } from '../dist';

const sampleHeaders = '1:5,10:10,60:20';
const nullCounts = '0:5,0:10,0:20';
const sampleCounts = '1:5,1:10,1:20';

describe('RL: Burst', () => {
  const limiter = new RateLimiter({
    cache: new ShieldbowMemoryCache()
  });

  it('should parse rate limit headers', () => {
    const limits = limiter.parseRateLimitHeader(sampleHeaders, sampleCounts);
    expect(limits).toHaveLength(3);
    expect(limits).toEqual(expect.arrayContaining([expect.objectContaining({ limit: 1, duration: 5000, count: 1 })]));
    expect(limits).toEqual(expect.arrayContaining([expect.objectContaining({ limit: 10, duration: 10000, count: 1 })]));
    expect(limits).toEqual(expect.arrayContaining([expect.objectContaining({ limit: 60, duration: 20000, count: 1 })]));
  });

  it('should not wait for rate limit to reset when counts are 0', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, nullCounts);
    await limiter.waitForLimit('something');
    const end = Date.now();
    expect(end - start).toBeLessThan(1000);
  });

  it('should wait for rate limit to reset', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, sampleCounts);
    await limiter.waitForLimit('something');
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(5000);
  });
});
