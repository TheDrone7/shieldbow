import { BaseManager } from '@shieldbow/web';
import { FetchOptions, IClashPlayer, IClashTeam, IClashTournament } from 'types';
import { ClashPlayer, ClashTeam, ClashTournament } from 'structures';
import { Client } from 'client';
import { parseFetchOptions } from 'utilities';

/**
 * The clash manager - handles all Clash tournaments related API calls.
 */
export class ClashManager implements BaseManager<ClashTournament> {
  /**
   * The client that instantiated this manager.
   */
  client: Client;

  /**
   * Create a new clash manager.
   * @param client - The client that instantiated this manager.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch a clash tournament by its ID.
   * @param id - The ID of the tournament.
   * @param options - The options for fetching.
   * @returns The fetched clash tournament.
   */
  async fetch(id: number, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'clash', options);

    this.client.logger?.trace(`Fetching clash tournament with ID: ${id}`);
    const url = '/lol/clash/v1/tournaments/' + id;

    try {
      const cached = await this.checkInternalTournament(id, opts);
      if (cached) return cached;

      const data = await this.client.request<IClashTournament>(url, {
        regional: false,
        method: 'clashTournamentById',
        debug: 'ID: ' + id,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched clash tournament with ID: ${id}, processing`);
      return this.processTournament(data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch clash tournament with ID: ${id}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a clash tournament by one of its participating team IDs.
   *
   * Ignores cache and storage checks but can cache and store for {@link ClashManager.fetch | fetch by Tournament ID}.
   * @param teamId - The ID of the team.
   * @param opts - The options for fetching.
   * @returns The fetched clash tournament.
   */
  async fetchByTeam(teamId: string, opts?: FetchOptions) {
    const options = parseFetchOptions(this.client, 'clash', opts);

    this.client.logger?.trace(`Fetching clash tournament by team ID: ${teamId}`);
    const url = '/lol/clash/v1/tournaments/by-team/' + teamId;

    try {
      const data = await this.client.request<IClashTournament>(url, {
        regional: false,
        method: 'clashTournamentByTeam',
        debug: 'Team ID: ' + teamId,
        region: options.region
      });

      this.client.logger?.trace(`Fetched clash tournament by team ID: ${teamId}, processing`);
      return this.processTournament(data, options);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch clash tournament by team ID: ${teamId}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch all active and upcoming clash tournaments.
   * @param options - The options for fetching.
   */
  async fetchAll(options?: FetchOptions): Promise<ClashTournament[]> {
    const opts = parseFetchOptions(this.client, 'clash', options);

    this.client.logger?.trace('Fetching all clash tournaments');
    const url = '/lol/clash/v1/tournaments';

    try {
      const data = await this.client.request<IClashTournament[]>(url, {
        regional: false,
        method: 'clashTournaments',
        debug: '',
        region: opts.region
      });

      this.client.logger?.trace('Fetched all clash tournaments, processing');
      return Promise.all(data.map((tournament) => this.processTournament(tournament, opts)));
    } catch (error) {
      this.client.logger?.trace('Failed to fetch all clash tournaments');
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a clash player by their summoner ID.
   * @param summonerId - The summoner ID of the player.
   * @param options - The options for fetching.
   * @returns The fetched clash player.
   */
  async fetchPlayer(summonerId: string, options?: FetchOptions): Promise<ClashPlayer> {
    const opts = parseFetchOptions(this.client, 'clash', options);

    this.client.logger?.trace(`Fetching clash player with summoner ID: ${summonerId}`);
    const url = '/lol/clash/v1/players/by-summoner/' + summonerId;

    try {
      const cached = await this.checkInternalPlayer(summonerId, opts);
      if (cached) return cached;

      const data = await this.client.request<IClashPlayer>(url, {
        regional: false,
        method: 'clashPlayerBySummoner',
        debug: 'Summoner ID: ' + summonerId,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched clash player with summoner ID: ${summonerId}, processing`);
      return this.processPlayer(data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch clash player with summoner ID: ${summonerId}`);
      return Promise.reject(error);
    }
  }

  /**
   * Fetch a clash team by its ID.
   * @param teamId - The ID of the team.
   * @param options - The options for fetching.
   * @returns The fetched clash team.
   */
  async fetchTeam(teamId: string, options?: FetchOptions): Promise<ClashTeam> {
    const opts = parseFetchOptions(this.client, 'clash', options);

    this.client.logger?.trace(`Fetching clash team with ID: ${teamId}`);
    const url = '/lol/clash/v1/teams/' + teamId;

    try {
      const cached = await this.checkInternalTeam(teamId, opts);
      if (cached) return cached;

      const data = await this.client.request<IClashTeam>(url, {
        regional: false,
        method: 'clashTeamById',
        debug: 'ID: ' + teamId,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched clash team with ID: ${teamId}, processing`);
      return this.processTeam(data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch clash team with ID: ${teamId}`);
      return Promise.reject(error);
    }
  }

  private async checkInternalTeam(teamId: string, opts: FetchOptions): Promise<ClashTeam | undefined> {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<ClashTeam>(`clash-team-${teamId}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (cached && !toIgnoreCache) return cached;

    try {
      const stored = await this.client.storage.load<IClashTeam>(`clash-team`, teamId);

      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (stored && !toIgnoreStorage) return this.processTeam(stored, opts);
      else throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Clash team for ID ${teamId} not found in storage`);
      return undefined;
    }
  }

  private async processTeam(data: IClashTeam, opts: FetchOptions): Promise<ClashTeam> {
    const { store, cache } = opts;

    const toStore = store && typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing clash team with ID: ${data.id}`);
      await this.client.storage.save('clash-team', data.id, data);
    }

    const team = new ClashTeam(this.client, data);

    const toCache = cache && typeof cache === 'function' ? cache(team) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching clash team with ID: ${team.id}`);
      this.client.cache.set(`clash-team-${team.id}`, team);
    }

    return team;
  }

  private async checkInternalPlayer(summonerId: string, opts: FetchOptions): Promise<ClashPlayer | undefined> {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<ClashPlayer>(`clash-player-${summonerId}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (cached && !toIgnoreCache) return cached;

    try {
      const stored = await this.client.storage.load<IClashPlayer>(`clash-player`, summonerId);

      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (stored && !toIgnoreStorage) return this.processPlayer(stored, opts);
      else throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Clash player for summoner ID ${summonerId} not found in storage`);
      return undefined;
    }
  }

  private async processPlayer(data: IClashPlayer, opts: FetchOptions): Promise<ClashPlayer> {
    const { store, cache } = opts;

    const toStore = store && typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing clash player with summoner ID: ${data.summonerId}`);
      await this.client.storage.save('clash-player', data.summonerId, data);
    }

    const player = new ClashPlayer(this.client, data, data.teamId);

    const toCache = cache && typeof cache === 'function' ? cache(player) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching clash player with summoner ID: ${player.summonerId}`);
      this.client.cache.set(`clash-player-${player.summonerId}`, player);
    }

    return player;
  }

  private async checkInternalTournament(id: number, opts: FetchOptions): Promise<ClashTournament | undefined> {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<ClashTournament>(`clash-tournament-${id}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (cached && !toIgnoreCache) return cached;

    try {
      const stored = await this.client.storage.load<IClashTournament>(`clash-tournament`, id.toString());

      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (stored && !toIgnoreStorage) return this.processTournament(stored, opts);
      else throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Clash tournament for ID ${id} not found in storage`);
      return undefined;
    }
  }

  private async processTournament(data: IClashTournament, opts: FetchOptions): Promise<ClashTournament> {
    const { store, cache } = opts;

    const toStore = store && typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing clash tournament with ID: ${data.id}`);
      await this.client.storage.save('clash-tournament', data.id.toString(), data);
    }

    const tournament = new ClashTournament(data);

    const toCache = cache && typeof cache === 'function' ? cache(tournament) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching clash tournament with ID: ${tournament.id}`);
      this.client.cache.set(`clash-tournament-${tournament.id}`, tournament);
    }

    return tournament;
  }
}
