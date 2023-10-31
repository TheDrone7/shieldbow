import { ShieldbowMemoryCache } from '@shieldbow/cache';
import { RateLimiter } from '../dist';

const methodName = 'something';
const sampleHeaders = '2:5,10:10,60:20';
const nullCounts = '0:5,0:10,0:20';
const sampleCounts = '2:5,2:10,2:20';

describe('RL: Method limits (spread only)', () => {
  const limiter = new RateLimiter({
    cache: new ShieldbowMemoryCache(),
    strategy: 'spread'
  });

  it('should spread requests even when limits are 0', async () => {
    const start = Date.now();
    limiter.setMethodLimits(methodName, sampleHeaders, nullCounts);
    await limiter.waitForLimit(methodName);
    const end = Date.now();
    // The number should be around 2500 because
    // the limit is 2 requests per 5 seconds.
    expect(end - start).toBeGreaterThan(2000);
    expect(end - start).toBeLessThan(3000);
  });

  it('should wait for rate limit to reset', async () => {
    const start = Date.now();
    limiter.setMethodLimits(methodName, sampleHeaders, sampleCounts);
    await limiter.waitForLimit(methodName);
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(5000);
  });
});
