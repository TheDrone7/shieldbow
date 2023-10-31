/**
 * The base cache interface for the cache plugin to be used.
 */
export interface ICache {
  has(key: string): Promise<boolean> | boolean;

  /**
   * Get a value from the cache.
   * @param key - The key of the value to get.
   */
  get<T>(key: string): Promise<T> | T | undefined;

  /**
   * Fetches all keys in the cache.
   */
  keys(): Promise<string[]> | string[];

  /**
   * Fetches all values stored in the cache.
   */
  values(): Promise<unknown[]> | unknown[];

  /**
   * Find a value in the cache using a predicate and a filter.
   * @param predicate - The predicate to use to find the value.
   */
  find<T>(predicate: (t: T) => boolean): Promise<T> | T | undefined;

  /**
   * Filter the cache using a predicate.
   * @param predicate - The predicate to use to filter the cache.
   */
  filter<T>(predicate: (t: T) => boolean): Promise<T[]> | T[];

  /**
   * Set a value in the cache.
   * @param key - The key of the value to set.
   * @param value - The value to set.
   * @param ttl - The time to live for the value (in seconds).
   *
   * @returns A promise that resolves to a boolean indicating whether the value was set.
   */
  set<T>(key: string, value: T, ttl?: number): Promise<boolean> | boolean;

  /**
   * Remove a value from the cache.
   * @param key - The key of the value to remove.
   *
   * @returns A promise that resolves to a boolean indicating whether the value was removed.
   */
  remove(key: string): Promise<boolean> | boolean;

  /**
   * Clear the cache.
   *
   * @returns A promise that resolves to a boolean indicating whether the cache was cleared.
   */
  clear(): Promise<boolean> | boolean;
}
