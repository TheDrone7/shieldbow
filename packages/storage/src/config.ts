/**
 * The configuration for the local storage plugin.
 */
export interface ILocalStorageConfig {
  /**
   * The root directory where the data will be stored.
   */
  root: string;
  /**
   * Whether to preserve whitespace in the data.
   *
   * Defaults to `false` to save storage.
   */
  preserveWhitespace?: boolean;
}
