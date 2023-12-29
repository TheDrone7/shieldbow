/**
 * The base storage interface for the storage plugin to be used.
 */
export interface IStorage {
  /**
   * Check if there is a value in the storage with the given key in the specified collection.
   * @param collection - The collection to check.
   * @param key - The key to look for.
   */
  has(collection: string, key: string): Promise<boolean> | boolean;

  /**
   * Get a value from the storage.
   * @param collection - The collection to get the value from.
   * @param key - The key of the value to get.
   */
  load<T>(collection: string, key: string): Promise<T> | T | undefined;

  /**
   * Fetches all collections in the storage.
   */
  collections(): Promise<string[]> | string[];

  /**
   * Fetches all IDs (keys) in the specified collection.
   * @param collection - The collection to fetch the IDs from.
   */
  keys(collection: string): Promise<string[]> | string[];

  /**
   * Fetches all values stored in the specified collection.
   */
  loadAll(collection: string): Promise<unknown[]> | unknown[];

  /**
   * Find a value in the specified collection using a predicate and a filter.
   * @param collection - The collection to find the value in.
   * @param predicate - The predicate to use to find the value.
   */
  find<T>(collection: string, predicate: (t: T) => boolean): Promise<T> | T | undefined;

  /**
   * Filter the values in the specified collection using a predicate.
   * @param collection - The collection to filter the values in.
   * @param predicate - The predicate to use to filter the cache.
   */
  filter<T>(collection: string, predicate: (t: T) => boolean): Promise<T[]> | T[];

  /**
   * Store a value in the specified collection in the storage.
   *
   * @param collection - The collection to store the value in.
   * @param key - The key of the value to set.
   * @param value - The value to set.
   *
   * @returns A promise that resolves to a boolean indicating whether the value was stored.
   */
  save<T>(collection: string, key: string, value: T): Promise<boolean> | boolean;

  /**
   * Delete an item from the specified collection.
   * @param collection - The collection to delete the item from.
   * @param key - The ID (key) of the item to remove.
   *
   * @returns A promise that resolves to a boolean indicating whether the item was deleted.
   */
  delete(collection: string, key: string): Promise<boolean> | boolean;

  /**
   * Clear an entire collection.
   *
   * @param collection - The collection to clear.
   *
   * @returns A promise that resolves to a boolean indicating whether the collection was cleared.
   */
  clear(collection: string): Promise<boolean> | boolean;

  /**
   * Clear the entire storage.
   *
   * @returns A promise that resolves to a boolean indicating whether the storage was cleared.
   */
  clearAll(): Promise<boolean> | boolean;
}
