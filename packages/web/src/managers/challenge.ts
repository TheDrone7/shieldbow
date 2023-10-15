import type { Client } from 'client';
import type { BaseManager, FetchOptions, IDDragonChallenge } from 'types';
import { Challenge } from 'structures';
import { parseFetchOptions } from 'utilities';
import { Collection } from '@discordjs/collection';

/**
 * A challenge manager - to fetch and manage all challenges data.
 */
export class ChallengeManager implements BaseManager<Challenge> {
  /**
   * The client this challenge manager belongs to.
   */
  readonly client: Client;

  /**
   * Create a new challenge manager.
   *
   * @param client - The client this challenge manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch all challenges.
   * @param options - The basic fetching options.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);
    const { cache } = opts;
    this.client.logger?.trace('Fetching all challenges');
    try {
      const challenges = <IDDragonChallenge[]>await this._fetchChallengesFromDDragon(opts);
      const result = new Collection<number, Challenge>();
      for (const challenge of challenges) {
        console.log(challenge.name);
        const challengeInstance = new Challenge(this.client, challenge);
        result.set(challenge.id, challengeInstance);
        if (cache) await this.client.cache.set(`challenge:${challenge.id}`, challengeInstance);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a challenge by its numerical ID.
   *
   * @param key - The ID of the challenge to fetch.
   * @param options - The basic fetching options.
   */
  async fetch(key: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);
    const { ignoreCache } = opts;
    this.client.logger?.trace(`Fetching challenge ${key}`);

    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`challenge:${key}`);
        if (exists) return this.client.cache.get<Challenge>(`challenge:${key}`);
      }

      const challenges = await this.fetchAll(opts);
      if (challenges && challenges.has(key)) return challenges.get(key)!;
      else return Promise.reject('There is no challenge with that ID');
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a challenge by its name.
   * The search is case-insensitive.
   * The special characters are NOT ignored.
   *
   * @param name - The name of the challenge to look for.
   * @param options - The basic fetching options.
   */
  async fetchByName(name: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);
    const challenge = await this.client.cache.find<Challenge>((c) => c.name.toLowerCase().includes(name.toLowerCase()));
    if (challenge) return challenge;
    const challenges = await this.fetchAll(opts);
    return challenges.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));
  }

  /**
   * Fetch multiple challenges at once.
   *
   * @param keys - The keys of the challenges to fetch.
   * @param options - The basic fetching options.
   */
  async fetchMany(keys: number[], options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);
    const { cache } = opts;
    this.client.logger?.trace(`Fetching challenges ${keys.join(', ')}`);
    try {
      const result = new Collection<number, Challenge>();
      for (const key of keys) {
        const challenge = await this.fetch(key, opts);
        if (challenge) result.set(key, challenge);
        if (cache) await this.client.cache.set(`challenge:${key}`, challenge);
      }
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async _fetchChallengesFromDDragon(options: FetchOptions) {
    try {
      this.client.logger?.trace('Fetching challenges from DDragon');
      const response = await this.client.fetch(
        this.client.generateUrl('challenges.json', 'dDragon', options.noVersion)
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
