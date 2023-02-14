import type { Region } from '../types';
import type { MethodRateLimitConfig } from './config';

/**
 * The API request options.
 */
export interface ApiRequestOptions {
  /**
   * The region to make the request to.
   */
  region: Region;
  /**
   * The API that is going to be requested (excluding the version, shieldbow only uses the latest versions).
   */
  api: keyof MethodRateLimitConfig;
  /**
   * The method that is being used, used for rate limiting.
   */
  method: string;
  /**
   * A string containing parameters to be used for error messages.
   */
  params: string;
  /**
   * Whether to use regional routing values (euw, na) or region API bases (americas, europe).
   */
  regional: boolean;
}
