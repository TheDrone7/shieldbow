/**
 * The base cache interface for the cache plugin to be used.
 */
export interface ICache {
  /**
   * Get a value from the cache.
   * @param key - The key of the value to get.
   */
  get<T>(key: string): T;

  /**
   * Set a value in the cache.
   * @param key - The key of the value to set.
   * @param value - The value to set.
   */
  set<T>(key: string, value: T): void;

  /**
   * Remove a value from the cache.
   * @param key - The key of the value to remove.
   */
  remove(key: string): void;

  /**
   * Clear the cache.
   */
  clear(): void;
}
