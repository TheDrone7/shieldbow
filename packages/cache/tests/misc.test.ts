import { ShieldbowMemoryCache } from '../dist';
import { uid } from 'uid/single';

describe('CACHE: Misc functions', () => {
  const cache = new ShieldbowMemoryCache();

  const randomKey = () => uid(6);
  const randomValue = () => uid(16);

  let globalK: string, globalV: string;

  for (let i = 0; i < 69; i++) {
    globalK = randomKey();
    globalV = randomValue();
    cache.set(globalK, globalV);
  }

  it('should get all keys from the cache', () => {
    const keys = cache.keys();
    expect(keys).toHaveLength(69);
  });

  it('should get all values from the cache', () => {
    const values = cache.values();
    expect(values).toHaveLength(69);
  });

  it('should be able to check for key in the cache', () => {
    const hasKey = cache.has(globalK);
    expect(hasKey).toBeTruthy();
    const hasUnknownKey = cache.has('foo');
    expect(hasUnknownKey).toBeFalsy();
  });

  it('should be able to find a value in the cache', () => {
    const value = cache.find((v) => v === 'foo');
    expect(value).toBeUndefined();
    const knownValue = cache.find((v) => v === globalV);
    expect(knownValue).toBe(globalV);
  });

  it('should be able to filter the cache', () => {
    const filtered = cache.filter((v) => v === 'foo');
    expect(filtered).toHaveLength(0);
    const knownFiltered = cache.filter((v) => v === globalV);
    expect(knownFiltered).toHaveLength(1);
    const all = cache.filter((v) => !!v);
    expect(all).toHaveLength(69);
  });
});
