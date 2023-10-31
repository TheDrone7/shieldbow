import { ShieldbowMemoryCache } from '../dist';
import { uid } from 'uid/single';

describe('CACHE: LFU eviction', () => {
  const cache = new ShieldbowMemoryCache({ maxSize: 1, eviction: 'lfu' });

  const randomKey = () => uid(56);
  const randomValue = () => uid(216);

  it('should evict the least frequently used item', () => {
    const k1 = randomKey(),
      v1 = randomValue();
    cache.set(k1, v1);
    const value1 = cache.get(k1);
    expect(value1).toBe(v1);

    const k2 = randomKey(),
      v2 = randomValue();
    cache.set(k2, v2);
    const value2 = cache.get(k2);
    expect(value2).toBe(v2);

    const k3 = randomKey(),
      v3 = randomValue();
    cache.set(k3, v3);
    const value3 = cache.get(k3);
    expect(value3).toBe(v3);

    cache.get(k2);
    cache.get(k2);
    cache.get(k3);
    cache.get(k3);
    cache.get(k3);

    const k4 = randomKey(),
      v4 = randomValue();
    cache.set(k4, v4);
    const value4 = cache.get(k4);
    expect(value4).toBe(v4);

    const value1Again = cache.get(k1);
    expect(value1Again).toBeUndefined();
  });
});
