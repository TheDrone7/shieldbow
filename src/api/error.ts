import type { AxiosResponse } from 'axios';
import help from './help';

/**
 * API error class.
 */
export class ApiError extends Error {
  /**
   * A textual representation of contents of the request that errored..
   */
  readonly request: string;
  /**
   * The received response object.
   */
  readonly response: AxiosResponse;

  constructor(response: AxiosResponse, request: string, message?: string) {
    super(`${response.status}:: ${response.statusText}\n${help(response.status)}${message ? `\n\n${message}` : ''}`);
    this.request = request;
    this.response = response;
  }
}
