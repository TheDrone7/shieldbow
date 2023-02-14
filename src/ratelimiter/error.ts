import type { AxiosRequestHeaders, AxiosResponse } from 'axios';
import help from './help';

/**
 * API error class.
 */
export class ApiError extends Error {
  /**
   * The requested URL.
   */
  readonly url: string;
  /**
   * The headers sent with the request.
   */
  readonly headers: AxiosRequestHeaders;
  /**
   * The received response object.
   */
  readonly response?: AxiosResponse;

  constructor(status: number, url: string, headers: AxiosRequestHeaders, response?: AxiosResponse) {
    super(`${status}:: ${help(status)}.`);
    this.url = url;
    this.headers = headers;
    this.response = response;
  }
}

export const mockRatelimitedResponse = {
  data: undefined,
  status: 429,
  statusText: 'Too Many Requests',
  headers: {
    'Retry-After': '3000',
    'X-App-Rate-Limit': '20:1,100:120',
    'X-App-Rate-Limit-Count': '1:1,102:120',
    'X-Method-Rate-Limit': '2000:60',
    'X-Method-Rate-Limit-Count': '23:60',
    'X-Rate-Limit-Type': 'application'
  },
  config: {}
};
