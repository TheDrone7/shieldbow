import type { AxiosResponse } from 'axios';
import help from './help';

export class ApiError extends Error {
  readonly response: AxiosResponse;

  constructor(response: AxiosResponse) {
    super(`${response.status}:: ${response.statusText}\n${help(response.status)}`);
    this.response = response;
  }
}
