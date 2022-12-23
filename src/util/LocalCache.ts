import type { ICache } from '../types';
import { Collection } from '@discordjs/collection';

/**
 * A basic caching manager that caches to the system memory using a Map.
 */
export default class LocalCache implements ICache {
  private base: Collection<string, any>;

  /**
   * Creates a new LocalCache instance.
   */
  constructor() {
    this.base = new Collection<string, any>();
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
   * Removes a value from the cache.
   * @param key - The key of the value to remove.
   */
  remove(key: string): void {
    this.base.delete(key);
  }

  /**
   * Sets a value in the cache.
   * @param key - The key of the value to set.
   * @param value - The value to set.
   */
  set<T>(key: string, value: T): void {
    this.base.set(key, value);
  }
}
