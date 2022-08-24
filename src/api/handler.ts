import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { Region } from '../types';
import { apiBaseURLs, regionalURLs } from '../util/urls';
import { ApiError } from './error';
import { Ratelimiter } from './ratelimit';

/**
 * The API request options.
 */
export interface ApiRequestOptions {
  /**
   * The region to make the request to.
   */
  region: Region;
  /**
   * A string name for the request to be used for error messages.
   */
  name: string;
  /**
   * A string containing parameters to be used for error messages.
   */
  params: string;
  /**
   * Whether to use regional routing values (euw, na) or region API bases (americas, europe).
   */
  regional: boolean;
}

/**
 * A class that handles API requests and rate limits for the RIOT API.
 */
export class ApiHandler {
  private _http: AxiosInstance;
  private limits: Ratelimiter;

  /**
   * Create a new API handler.
   *
   * @param apiKey - your RIOT API key.
   */
  constructor(apiKey: string) {
    this._http = axios.create({
      headers: {
        'X-Riot-Token': apiKey
      }
    });
    this.limits = new Ratelimiter();
  }

  /**
   * Make an API request
   * @param url - The path to make the request to.
   * @param options - Some options to make the promise rejection messages more meaningful.
   */
  async makeApiRequest(url: string, options: ApiRequestOptions) {
    const request = `${options.name} (${options.params})`;
    return new Promise<AxiosResponse>(async (resolve, reject) => {
      const requestLimit = this.limits.verify(options.region, options.name);
      if (!requestLimit.pass) {
        const mockResponse = {
          data: undefined,
          status: 429,
          statusText: 'Too Many Requests',
          headers: {},
          config: {}
        };
        reject(new ApiError(mockResponse, request, `Retry in ${requestLimit.wait}ms.`));
      } else
        try {
          const base = options.regional ? regionalURLs[options.region] : apiBaseURLs[options.region];
          const response = await this._http.get(base + url);
          this.limits.update(options.region, response, options.name);
          if (response.status === 200) resolve(response);
        } catch (error: any) {
          const { response } = error as AxiosError;
          if (response) this.limits.update(options.region, response, options.name);
          if (response) reject(new ApiError(response, request));
          else reject(error as AxiosError);
        }
    });
  }
}
