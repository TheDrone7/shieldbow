/**
 * The base cache interface for the cache plugin to be used.
 */
export interface ICache {
  has(key: string): Promise<boolean> | boolean;

  /**
   * Get a value from the cache.
   * @param key - The key of the value to get.
   */
  get<T>(key: string): Promise<T> | T;

  /**
   * Fetches all keys in the cache.
   */
  keys(): Promise<string[]> | string[];

  /**
   * Fetches all values stored in the cache.
   */
  values(): Promise<any[]> | any[];

  /**
   * Find a value in the cache using a predicate and a filter.
   * @param predicate - The predicate to use to find the value.
   */
  find<T>(predicate: (t: T) => boolean): Promise<T> | T | undefined;

  /**
   * Set a value in the cache.
   * @param key - The key of the value to set.
   * @param value - The value to set.
   */
  set<T>(key: string, value: T): Promise<any> | void;

  /**
   * Remove a value from the cache.
   * @param key - The key of the value to remove.
   */
  remove(key: string): Promise<any> | void;

  /**
   * Clear the cache.
   */
  clear(): Promise<any> | void;
}
