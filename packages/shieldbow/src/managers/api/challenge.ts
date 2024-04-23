import { BaseManager } from '@shieldbow/web';
import { FetchOptions, IChallengeConfig, ChallengePercentile, IPlayerChallenge } from 'types';
import { LolChallenge } from 'structures';
import { Client } from 'client';
import { parseFetchOptions } from 'utilities';

/**
 * The challenge manager - handles all challenge-related API calls.
 */
export class ChallengeManager implements BaseManager<LolChallenge> {
  /**
   * The client that instantiated this manager.
   */
  client: Client;

  /**
   * Creates a new challenge manager.
   * @param client - The client that instantiated this manager.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch a challenge (config) by its ID.
   * @param id - The ID of the challenge.
   * @param options - The options for fetching.
   * @returns The fetched and processed challenge config.
   */
  async fetch(id: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);

    this.client.logger?.trace(`Fetching challenge (config) with ID: ${id}`);
    const url = `/lol/challenges/v1/challenges/${id}/config`;

    try {
      const cached = await this.checkInternal(id, opts);
      if (cached) return cached;

      const data = await this.client.request<IChallengeConfig>(url, {
        regional: true,
        method: 'challengeConfigById',
        debug: 'Challenge ID: ' + id,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched challenge (config) with ID: ${id}, processing`);
      return this.processData(data, opts);
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch challenge (config) with ID: ${id}`);
      this.client.logger?.error(err);
      return Promise.reject(err);
    }
  }

  /**
   * Fetch the tier percentile distribution of a challenge.
   * Only cached if config is cached for the challenge, never stored.
   *
   * @param id - The ID of the challenge.
   * @param options - The options for fetching.
   */
  async fetchChallengePercentile(id: number, options: FetchOptions) {}

  async checkInternal(id: number, options: FetchOptions) {
    const { ignoreCache, ignoreStorage } = options;

    try {
      const cached = await this.client.cache.get<LolChallenge>(`challenge:${id}`);
      const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
      if (!toIgnoreCache) {
        this.client.logger?.trace(`Fetched challenge (config) with ID: ${id} from cache`);
        return cached;
      }

      const stored = await this.client.storage.load<IChallengeConfig>(`challenge`, id.toString());
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Fetched challenge (config) with ID: ${id} from storage`);
        return this.processData(stored!, options);
      }

      return undefined;
    } catch (err) {
      this.client.logger?.trace(`Challenge (config) with id ${id} not found in storage.`);
      return undefined;
    }
  }

  async processData(data: IChallengeConfig, options: FetchOptions) {
    const { store, cache } = options;
    const challenge = new LolChallenge(this.client, data);

    const toStore = typeof store === 'function' ? store(challenge) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing challenge (config) with ID: ${data.id}`);
      await this.client.storage.save(`challenge`, data.id.toString(), data);
    }

    const toCache = typeof cache === 'function' ? cache(challenge) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching challenge (config) with ID: ${data.id}`);
      await this.client.cache.set(`challenge:${data.id}`, challenge);
    }

    return challenge;
  }
}
