/**
 * The base storage interface for the storage plugin to be used.
 */
export interface IStorage {
  /**
   * Fetch a value from storage.
   * @param key - A key to help distinguish the collection where the element is stored.
   * @param id - The id of the element to fetch.
   */
  fetch<T>(key: string, id: string): Promise<T> | T;

  /**
   * Save a value in storage.
   * @param value - The value to set.
   * @param key - A key to help distinguish the collection where the element is stored.
   * @param id - The id of the element to save.
   */
  save<T>(value: T, key: string, id: string): void | Promise<any>;

  /**
   * Delete a value from storage.
   * @param key - A key to help distinguish the collection where the element is stored.
   * @param id - The id of the element to delete.
   */
  remove(key: string, id: string): void | Promise<any>;
}
