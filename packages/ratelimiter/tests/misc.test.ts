import { ShieldbowMemoryCache } from '@shieldbow/cache';
import { RateLimiter } from '../dist';

const sampleHeaders = '2:5,10:10,60:20';
const nullCounts = '0:5,0:10,0:20';
const sampleCounts = '2:5,2:10,2:20';

describe('RL: Extra features', () => {
  const limiter = new RateLimiter({
    cache: new ShieldbowMemoryCache(),
    throwOnLimit: true
  });

  it('should throw error instead of waiting for rate limit to reset', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, sampleCounts);
    expect(() => limiter.waitForLimit('something')).rejects.toThrowError();
    const end = Date.now();
    expect(end - start).toBeLessThanOrEqual(1000);
  });

  it('should throw error instead of waiting for method rate limit to reset', async () => {
    const start = Date.now();
    limiter.setAppLimits(sampleHeaders, nullCounts);
    limiter.setMethodLimits('something', sampleHeaders, sampleCounts);
    expect(() => limiter.waitForLimit('something')).rejects.toThrowError();
    const end = Date.now();
    expect(end - start).toBeLessThanOrEqual(1000);
  });
});
