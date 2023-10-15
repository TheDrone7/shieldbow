import type { ICache } from 'types';
import { Collection } from '@discordjs/collection';

/**
 * A basic caching manager that caches to the system memory using a Map.
 */
export class MemoryCache implements ICache {
  private base: Collection<string, any>;
  private _enabled: boolean;

  /**
   * Creates a new LocalCache instance.
   */
  constructor(enabled = true) {
    this.base = new Collection<string, any>();
    this._enabled = enabled;
  }

  /**
   * Clears the cache.
   */
  clear(): void {
    this.base.clear();
  }

  /**
   * Gets a value from the cache.
   * @param key - The key of the value to get.
   */
  get<T>(key: string): T {
    return this.base.get(key);
  }

  /**
   * Fetches all keys in the cache.
   */
  keys() {
    return [...this.base.keys()];
  }

  /**
   * Fetches all values stored in the cache.
   */
  values() {
    return [...this.base.values()];
  }

  /**
   * Finds a value in the cache using a predicate and a filter.
   * @param predicate - The predicate to use to find the value.
   */
  find<T>(predicate: (t: T) => boolean): T | undefined {
    return this.base.find(predicate) as T;
  }

  has(key: string): boolean {
    return this.base.has(key);
  }

  /**
   * Removes a value from the cache.
   * @param key - The key of the value to remove.
   */
  remove(key: string): void {
    if (!this._enabled) return;
    this.base.delete(key);
  }

  /**
   * Sets a value in the cache.
   * @param key - The key of the value to set.
   * @param value - The value to set.
   */
  set<T>(key: string, value: T): void {
    if (!this._enabled) return;
    this.base.set(key, value);
  }
}
