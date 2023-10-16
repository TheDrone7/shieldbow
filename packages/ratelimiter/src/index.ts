import { Client } from '@shieldbow/web';

/**
 * The RateLimiter class.
 */
export default class RateLimiter {
  readonly client: Client;
  /**
   * Creates a new RateLimiter instance.
   */
  constructor(client: Client) {
    this.client = client;
    console.log('RateLimiter constructor');
  }
}
