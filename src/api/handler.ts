import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import type { Region } from '../types';
import { apiBaseURLs, regionalURLs } from '../util/urls';
import { ApiError } from './error';
import { Ratelimiter } from './ratelimit';

/**
 * A class that handles API requests and rate limits for the RIOT API.
 */
export class ApiHandler {
  private _http: AxiosInstance;
  private _apiBase: string;
  private _regionalBase: string;
  private _region: Region;
  private limits: Ratelimiter;

  /**
   * Create a new API handler.
   *
   * @param region - the region to use for the API requests.
   * @param apiKey - your RIOT API key.
   */
  constructor(region: Region, apiKey: string) {
    this._region = region;
    this._apiBase = apiBaseURLs[region];
    this._regionalBase = regionalURLs[region];
    this._http = axios.create({
      headers: {
        'X-Riot-Token': apiKey
      }
    });
    this.limits = new Ratelimiter();
  }

  /**
   * The region that the API handler will send the request to.
   */
  get region() {
    return this._region;
  }

  set region(region: Region) {
    this._region = region;
    this._apiBase = apiBaseURLs[region];
    this._regionalBase = regionalURLs[region];
  }

  /**
   * Make an API request
   * @param url - The path to make the request to.
   * @param options - Some options to make the promise rejection messages more meaningful.
   */
  async makeApiRequest(url: string, options: { name: string; params: string; regional: boolean }) {
    const request = `${options.name} (${options.params})`;
    return new Promise<AxiosResponse>(async (resolve, reject) => {
      const requestLimit = this.limits.verify(this._region, options.name);
      if (!requestLimit.pass) {
        const mockResponse = {
          data: null,
          status: 429,
          statusText: 'Too Many Requests',
          headers: {},
          config: {}
        };
        reject(new ApiError(mockResponse, request, `Retry in ${requestLimit.wait}ms.`));
      } else
        try {
          const base = options.regional ? this._regionalBase : this._apiBase;
          const response = await this._http.get(base + url);
          this.limits.update(this._region, response, options.name);
          if (response.status === 200) resolve(response);
        } catch (error: any) {
          const { response } = error as AxiosError;
          if (response) this.limits.update(this._region, response, options.name);
          if (response) reject(new ApiError(response, request));
          else reject(error as AxiosError);
        }
    });
  }
}
