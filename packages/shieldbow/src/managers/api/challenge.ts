import { BaseManager } from '@shieldbow/web';
import {
  FetchOptions,
  IChallengeConfig,
  ChallengePercentile,
  IPlayerChallenge,
  ChallengeApexLevel,
  ChallengeLeaderboardOptions,
  IChallengeLeaderboardEntry
} from 'types';
import { ChallengeLeaderboardEntry, LolChallenge, PlayerChallenges } from 'structures';
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
   *
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
        regional: false,
        method: 'challengeConfigById',
        debug: 'Challenge ID: ' + id,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched challenge (config) with ID: ${id}, processing`);
      return this.processData(data, opts);
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch challenge (config) with ID: ${id}`);
      return Promise.reject(err);
    }
  }

  /**
   * Fetch the tier percentile distribution of a challenge.
   * Only cached if config is cached for the challenge, never stored.
   *
   * @param id - The ID of the challenge.
   * @param options - The options for fetching.
   *
   * @returns The fetched challenge percentiles.
   */
  async fetchPercentiles(id: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);

    this.client.logger?.trace(`Fetching challenge (percentile) with ID: ${id}`);
    const url = `/lol/challenges/v1/challenges/${id}/percentiles`;

    try {
      const cached = await this.checkInternal(id, opts);
      if (cached && cached.percentiles) return cached.percentiles;

      const data = await this.client.request<ChallengePercentile>(url, {
        regional: false,
        method: 'challengePercentileById',
        debug: 'Challenge ID: ' + id,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched challenge (percentile) with ID: ${id}`);
      if (cached) {
        cached.percentiles = data;
        this.client.logger?.trace(`Caching challenge (config) with ID: ${id}`);
        await this.client.cache.set(`challenge:${id}`, cached);
      }
      return data;
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch challenge (percentile) with ID: ${id}`);
      return Promise.reject(err);
    }
  }

  /**
   * Fetch all challenges (config only).
   * This always ignores the cache and storage and fetches from the API instead.
   *
   * @param options - The options for fetching.
   *
   * @returns The fetched and processed challenges.
   */
  async fetchAll(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);

    this.client.logger?.trace('Fetching all challenges (config)');
    const url = '/lol/challenges/v1/challenges/config';

    try {
      const data = await this.client.request<IChallengeConfig[]>(url, {
        regional: false,
        method: 'challengesConfig',
        region: opts.region,
        debug: 'all'
      });

      this.client.logger?.trace('Fetched all challenges (config), processing');
      return data.map((d) => this.processData(d, opts));
    } catch (err) {
      this.client.logger?.trace('Failed to fetch all challenges (config)');
      return Promise.reject(err);
    }
  }

  /**
   * Fetch all challenges (percentile only).
   * This always ignores the cache and storage and fetches from the API instead.
   * Automatically caches the percentiles to the challenge config.
   *
   * @param options - The options for fetching (region only).
   *
   * @returns The fetched challenge percentiles.
   */
  async fetchAllPercentiles(options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);

    this.client.logger?.trace('Fetching all challenges (percentile)');
    const url = '/lol/challenges/v1/challenges/percentiles';

    try {
      const data = await this.client.request<Record<string, ChallengePercentile>>(url, {
        regional: false,
        method: 'challengesPercentiles',
        region: opts.region,
        debug: 'all'
      });

      this.client.logger?.trace('Fetched all challenges (percentile)');

      for (const [id, percentile] of Object.entries(data)) {
        const cached = await this.checkInternal(parseInt(id), opts);
        if (cached) cached.percentiles = percentile;
      }

      return data;
    } catch (err) {
      this.client.logger?.trace('Failed to fetch all challenges (percentile)');
      return Promise.reject(err);
    }
  }

  /**
   * Fetches the challenge progressions and preferences for a player.
   *
   * @param playerId - The player ID (PUUID) for the player.
   * @param options - The options for fetching.
   *
   * @returns The fetched and processed player challenges.
   */
  async fetchPlayerChallenges(playerId: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'challenges', options);

    this.client.logger?.trace(`Fetching player challenges with PUUID: ${playerId}`);
    const url = `/lol/challenges/v1/player-data/${playerId}`;

    try {
      const cached = await this.checkInternalPlayer(playerId, opts);
      if (cached) return cached;

      const data = await this.client.request<IPlayerChallenge>(url, {
        regional: false,
        method: 'playerChallenges',
        region: opts.region,
        debug: 'PUUID: ' + playerId
      });

      this.client.logger?.trace(`Fetched player challenges with PUUID: ${playerId}`);
      return this.processPlayerData(playerId, data, opts);
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch player challenges with ID: ${playerId}`);
      return Promise.reject(err);
    }
  }

  /**
   * Fetch the leaderboard for a challenge.
   * @param id - The ID of the challenge.
   * @param tier - The tier of the leaderboard to fetch.
   * @param options - The options for fetching.
   *
   * @returns The fetched and processed challenge leaderboard.
   */
  async fetchLeaderboard(
    id: number,
    tier: ChallengeApexLevel = 'CHALLENGER',
    options?: FetchOptions & ChallengeLeaderboardOptions
  ) {
    const opts = parseFetchOptions(this.client, 'challenges', options);

    const limit = options?.limit ?? 0;

    this.client.logger?.trace(`Fetching challenge leaderboard with challenge ID: ${id}`);
    const url = `/lol/challenges/v1/challenges/${id}/leaderboard/by-level/${tier}${limit > 0 ? `?limit=${limit}` : ''}`;

    try {
      const cached = await this.checkInternalLeaderboard(id, tier, opts);
      if (cached && cached.length >= limit) return cached.slice(0, limit > 0 ? limit : cached.length);

      const data = await this.client.request<IChallengeLeaderboardEntry[]>(url, {
        regional: false,
        method: 'challengeLeaderboard',
        region: opts.region,
        debug: `Challenge ID: ${id}, Tier: ${tier}`
      });

      this.client.logger?.trace(`Fetched challenge leaderboard with challenge ID: ${id}`);
      return this.processLeaderboardData(id, tier, data, opts);
    } catch (err) {
      this.client.logger?.trace(`Failed to fetch challenge leaderboard with challenge ID: ${id}`);
      return Promise.reject(err);
    }
  }

  private async checkInternal(id: number, options: FetchOptions) {
    const { ignoreCache, ignoreStorage } = options;

    try {
      const cached = await this.client.cache.get<LolChallenge>(`lol-challenge:${id}`);
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

  private async checkInternalPlayer(puuid: string, options: FetchOptions) {
    const { ignoreCache, ignoreStorage } = options;

    try {
      const cached = await this.client.cache.get<PlayerChallenges>(`player-challenges:${puuid}`);
      const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
      if (!toIgnoreCache) {
        this.client.logger?.trace(`Fetched player challenges with PUUID: ${puuid} from cache`);
        return cached;
      }

      const stored = await this.client.storage.load<IPlayerChallenge>(`player-challenges`, puuid);
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Fetched player challenges with PUUID: ${puuid} from storage`);
        return this.processPlayerData(puuid, stored!, options);
      }

      return undefined;
    } catch (err) {
      this.client.logger?.trace(`Player challenges with PUUID ${puuid} not found in storage.`);
      return undefined;
    }
  }

  private async checkInternalLeaderboard(id: number, tier: ChallengeApexLevel, options: FetchOptions) {
    const { ignoreCache, ignoreStorage } = options;

    try {
      const cached = await this.client.cache.get<ChallengeLeaderboardEntry[]>(`challenge-leaderboard:${id}-${tier}`);
      const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
      if (!toIgnoreCache) {
        this.client.logger?.trace(`Fetched challenge leaderboard with challenge ID: ${id} from cache`);
        return cached;
      }

      const stored = await this.client.storage.load<IChallengeLeaderboardEntry[]>(
        `challenge-leaderboard`,
        `${id}-${tier}`
      );
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (!toIgnoreStorage) {
        this.client.logger?.trace(`Fetched challenge leaderboard with challenge ID: ${id} from storage`);
        return this.processLeaderboardData(id, tier, stored!, options);
      }

      return undefined;
    } catch (err) {
      this.client.logger?.trace(`Challenge leaderboard with id ${id} not found in storage.`);
      return undefined;
    }
  }

  private async processData(data: IChallengeConfig, options: FetchOptions) {
    const { store, cache } = options;
    const challenge = new LolChallenge(this.client, data);

    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing challenge (config) with ID: ${data.id}`);
      await this.client.storage.save(`challenges`, data.id.toString(), data);
    }

    const toCache = typeof cache === 'function' ? cache(challenge) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching challenge (config) with ID: ${data.id}`);
      await this.client.cache.set(`lol-challenge:${data.id}`, challenge);
    }

    return challenge;
  }

  private async processPlayerData(puuid: string, data: IPlayerChallenge, options: FetchOptions) {
    const { store, cache } = options;
    const challenge = new PlayerChallenges(this.client, data);

    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing player challenges for PUUID: ${puuid}`);
      await this.client.storage.save(`player-challenges`, puuid, data);
    }

    const toCache = typeof cache === 'function' ? cache(challenge) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching player challenges for PUUID: ${puuid}`);
      await this.client.cache.set(`player-challenges:${puuid}`, challenge);
    }

    return challenge;
  }

  private async processLeaderboardData(
    id: number,
    tier: ChallengeApexLevel,
    data: IChallengeLeaderboardEntry[],
    options: FetchOptions
  ) {
    const { store, cache } = options;
    const entries = data.map((d) => new ChallengeLeaderboardEntry(d));

    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing challenge leaderboard with challenge ID: ${id} (Tier: ${tier})`);
      await this.client.storage.save(`challenge-leaderboard`, `${id}-${tier}`, data);
    }

    const toCache = typeof cache === 'function' ? cache(entries) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching challenge leaderboard with challenge ID: ${id} (Tier: ${tier})`);
      await this.client.cache.set(`challenge-leaderboard:${id}-${tier}`, entries);
    }

    return entries;
  }
}
