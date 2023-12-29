import { Region } from '@shieldbow/web';

/**
 * The options to use when fetching anything from the API.
 */
export interface RequestOptions {
  /**
   * The method being used to fetch data (a name for the URL, not the HTTP method)
   */
  method: string;
  /**
   * Debug text, displayed when failing to fetch data.
   */
  debug: string;
  /**
   * The region to fetch data from (optional).
   *
   * Defaults to the client's region.
   */
  region?: Region;
  /**
   * Whether it is to be fetched from the regional endpoint such as `americas` or `asia`.
   *
   * Uses `na` or other applicable server if false (default).
   */
  regional: boolean;
}
