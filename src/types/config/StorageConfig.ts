import type { ManagersConfig } from './ManagersConfig';
import type { IStorage } from '../IStorage';

/**
 * Client's storage plugin configuration.
 */
export interface StorageConfig {
  /**
   * Whether to enable storing fetched data.
   * Can be set to true to enable for all, or false to disable for all.
   *
   * By default, this is enabled for DDragon/CDragon data, and disabled for API data.
   */
  enable?: boolean | ManagersConfig;
  /**
   * The root directory for the local storage plugin. Defaults to 'data'.
   * This will be ignored if a custom storage plugin is used.
   */
  root?: string;
  /**
   * The custom storage plugin to use. This will override the default local storage plugin.
   */
  custom?: IStorage;
}
