import type { ICacheConfig } from 'config';
import type { ICache } from 'interface';
import Cache from 'node-cache';

/**
 * A memory cache implementation using the node-cache package.
 */
export class ShieldbowMemoryCache implements ICache {
  private cache: Cache;
  private evictionStrategy: 'lru' | 'lfu' | 'none';
  private maxSize: number;
  private lruQueue: string[];
  private lfuMap: Map<string, number>;

  /**
   * The constructor for the memory cache.
   *
   * @param config - The configuration for the cache.
   */
  constructor(config: ICacheConfig) {
    this.evictionStrategy = config.eviction ?? 'none';
    this.cache = new Cache({ stdTTL: config.ttlSeconds, checkperiod: 1, useClones: false });
    this.maxSize = config.maxSize ? config.maxSize * 1024 : -1;
    this.lruQueue = [];
    this.lfuMap = new Map();
  }

  /**
   * Handles eviction of items from the cache.
   */
  private handleEviction() {
    // No eviction is needed if maxSize is -1.
    if (this.maxSize === -1) return;

    const { ksize, vsize } = this.cache.getStats();

    // If the cache size is less than the maxSize, do nothing.
    if (ksize + vsize <= this.maxSize) return;

    // Evict items from the cache until the cache size is less than the maxSize.
    while (ksize + vsize > this.maxSize)
      if (this.evictionStrategy === 'lru') {
        if (this.lruQueue.length === 0) return;
        const key = this.lruQueue.shift();

        // DO NOT TOUCH RATELIMIT KEYS
        if (key && !key.startsWith('rl')) this.cache.del(key);
      } else if (this.evictionStrategy === 'lfu') {
        if (this.lfuMap.size === 0) return;
        let min = Infinity;
        let minKey = '';
        for (const [key, value] of this.lfuMap.entries())
          if (value < min) {
            min = value;
            minKey = key;
          }

        // DO NOT TOUCH RATELIMIT KEYS
        if (minKey && !minKey.startsWith('rl')) this.cache.del(minKey);

        this.lfuMap.delete(minKey);
      }
  }

  /**
   * Checks if the cache has a value for the given key.
   * @param key - The key to check.
   * @returns Whether the cache has a value for the given key.
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Get a value from the cache.
   * @param key - The key of the value to get.
   * @returns The value from the cache.
   */
  get<T>(key: string): T | undefined {
    const value = this.cache.get(key);
    if (value && this.evictionStrategy !== 'lru') this.updateLRUQueue(key);
    if (value && this.evictionStrategy === 'lfu') this.updateLFUMap(key);
    return value as T;
  }

  /**
   * Get all keys from the cache.
   * @returns The keys from the cache.
   */
  keys(): string[] {
    return this.cache.keys();
  }

  /**
   * Get all values from the cache.
   * @returns The values from the cache.
   */
  values(): unknown[] {
    return this.keys().map((key) => this.get(key));
  }

  /**
   * Find a value in the cache using a predicate and a filter.
   * @param predicate - The predicate to use to find the value.
   * @returns The value from the cache.
   */
  find<T>(predicate: (t: T) => boolean): T | undefined {
    return (this.values() as T[]).find(predicate);
  }

  /**
   * Filter the cache using a predicate.
   * @param predicate - The predicate to use to filter the cache.
   * @returns The values from the cache.
   */
  filter<T>(predicate: (t: T) => boolean): T[] {
    return (this.values() as T[]).filter(predicate);
  }

  /**
   * Set a value in the cache.
   *
   * @param key - The key of the value to set.
   * @param value - The value to set.
   * @param ttl - The time to live for the value (in seconds).
   *
   * @returns Whether the value was set.
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    const success = ttl ? this.cache.set(key, value, ttl) : this.cache.set(key, value);
    if (success && this.evictionStrategy !== 'lru') this.updateLRUQueue(key);
    if (success && this.evictionStrategy === 'lfu') this.updateLFUMap(key);
    this.handleEviction();
    return success;
  }

  /**
   * Remove (delete) a value from the cache.
   * @param key - The key of the value to remove.
   * @returns Whether the value was removed.
   */
  remove(key: string): boolean {
    const success = this.cache.del(key) > 0;
    this.lruQueue = this.lruQueue.filter((k) => k !== key);
    this.lfuMap.delete(key);
    this.handleEviction();
    return success;
  }

  /**
   * Clear the cache.
   * @returns Whether the cache was cleared.
   */
  clear(): boolean {
    this.cache.flushAll();
    return true;
  }

  private updateLRUQueue(key: string) {
    const index = this.lruQueue.indexOf(key);
    if (index !== -1) this.lruQueue.splice(index, 1);
    this.lruQueue.push(key);
  }

  private updateLFUMap(key: string) {
    const count = this.lfuMap.get(key) ?? 0;
    this.lfuMap.set(key, count + 1);
  }
}
