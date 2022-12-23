/**
 * The base storage interface for the storage plugin to be used.
 */
export interface IStorage {
  /**
   * Fetch a value from storage.
   * @param params - The appropriate parameters for retrieval from storage.
   */
  fetch<T>(...params: any): Promise<T> | T;

  /**
   * Save a value in storage.
   * @param value - The value to set.
   * @param params - The appropriate parameters for saving in storage.
   */
  save<T>(value: T, ...params: any): void | Promise<any>;

  /**
   * Delete a value from storage.
   * @param params - Appropriate parameters for deletion from storage.
   */
  remove(...params: any): void | Promise<any>;
}
