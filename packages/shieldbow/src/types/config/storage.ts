import type { IStorage, ILocalStorageConfig } from '@shieldbow/storage';

/**
 * The config for the client storage.
 */
export interface ClientStorageConfig {
  /**
   * If you want to provide a custom storage solution.
   */
  custom?: IStorage;
  /**
   * The config for the default, local file storage.
   */
  config?: ILocalStorageConfig;
}
