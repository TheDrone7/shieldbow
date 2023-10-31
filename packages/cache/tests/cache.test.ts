import { ShieldbowMemoryCache } from '../dist';
import { uid } from 'uid/single';

describe('CACHE: caching', () => {
  const cache = new ShieldbowMemoryCache();

  const randomKey = () => uid(6);
  const randomValue = () => uid(16);

  it('should set a value', () => {
    const k = randomKey(),
      v = randomValue();
    cache.set(k, v);
    const value = cache.get(k);
    expect(value).toBe(v);
  });

  it('should set a value with a ttl', async () => {
    const kTtl = randomKey(),
      vTtl = randomValue();
    cache.set(kTtl, vTtl, 1);
    const value = cache.get(kTtl);
    expect(value).toBe(vTtl);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const value2 = cache.get(kTtl);
    expect(value2).toBeUndefined();
  });

  it('should remove (delete) a value', () => {
    const kDel = randomKey(),
      vDel = randomValue();
    cache.set(kDel, vDel);
    const value = cache.get(kDel);
    expect(value).toBe(vDel);
    cache.remove(kDel);
    const value2 = cache.get(kDel);
    expect(value2).toBeUndefined();
  });

  it('should clear the cache', async () => {
    const kClear = randomKey(),
      vClear = randomValue();
    cache.set(kClear, vClear);
    const value = cache.get(kClear);
    expect(value).toBe(vClear);
    cache.clear();
    const value2 = cache.get(kClear);
    expect(value2).toBeUndefined();
  });
});
