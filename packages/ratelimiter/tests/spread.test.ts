import { ShieldbowMemoryCache } from '@shieldbow/cache';
import { RateLimiter } from '../dist';

const sampleHeaders = '2:5,10:10,60:20';
const nullCounts = '0:5,0:10,0:20';
const sampleCounts = '2:5,2:10,2:20';

describe('RL: Spread', () => {
  const limiter = new RateLimiter({
    cache: new ShieldbowMemoryCache(),
    strategy: 'spread'
  });

  it('should parse rate limit headers', () => {
    const limits = limiter.parseRateLimitHeader(sampleHeaders, sampleCounts);
    expect(limits).toHaveLength(3);
    expect(limits).toEqual(expect.arrayContaining([expect.objectContaining({ limit: 2, duration: 5000, count: 2 })]));
    expect(limits).toEqual(expect.arrayContaining([expect.objectContaining({ limit: 10, duration: 10000, count: 2 })]));
    expect(limits).toEqual(expect.arrayContaining([expect.objectContaining({ limit: 60, duration: 20000, count: 2 })]));
  });

  it('should spread requests even when limits are 0', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, nullCounts);
    await limiter.waitForLimit('something');
    const end = Date.now();
    // The number should be around 2500 because
    // the limit is 2 requests per 5 seconds.
    expect(end - start).toBeGreaterThan(2000);
    expect(end - start).toBeLessThan(3000);
  });

  it('should spread requests but not overdo it (might double if both app and method are set)', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, nullCounts);
    limiter.setMethodLimits('something', sampleHeaders, nullCounts);
    await limiter.waitForLimit('something');
    const end = Date.now();
    // The number should be around 2500 because
    // the limit is 2 requests per 5 seconds.
    expect(end - start).toBeGreaterThan(2000);
    expect(end - start).toBeLessThan(3000);
  });

  it('should wait for rate limit to reset', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, sampleCounts);
    await limiter.waitForLimit('something');
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(5000);
  });
});
