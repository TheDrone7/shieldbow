import type { Collection } from '@discordjs/collection';
import type { Client } from '../client';

/**
 * A base for any manager classes.
 */
export interface BaseManager<T> {
  /**
   * The cache to store any data that can be avoided fetching repeatedly.
   */
  readonly cache: Collection<any, T>;
  /**
   * The client this manager is being used by.
   */
  readonly client: Client;

  /**
   * The method to actually fetch the data.
   *
   * @param id - The ID of the data entity being fetched.
   * @param options - Basic fetch options, setting the force option to `true` must ignore the cache.
   */
  fetch(id: any, options: { force: boolean }): Promise<T>;
}
