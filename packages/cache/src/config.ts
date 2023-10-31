/**
 * The configuration for the cache plugin.
 */
export interface ICacheConfig {
  /**
   * The (default) time to live for each cache entry in seconds.
   *
   * Defaults to 0 (no TTL).
   */
  ttlSeconds?: number;
  /**
   * The eviction strategy to use for the cache.
   *
   * Defaults to 'none' (no eviction).
   */
  eviction?: 'lru' | 'lfu' | 'none';
  /**
   * The maximum size of the cache (in KB).
   *
   * Defaults to -1 (no limit).
   */
  maxSize?: number;
}
