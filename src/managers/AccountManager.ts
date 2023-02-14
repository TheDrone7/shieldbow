import type { BaseManager, AccountData, FetchOptions } from '../types';
import type { Client } from '../client';
import { Account } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * An account manager - to fetch and manage all the RIOT accounts.
 *
 * Requires API key with access to `account-v1` API.
 */
export class AccountManager implements BaseManager<Account> {
  /**
   * The client this account manager belongs to.
   */
  readonly client: Client;

  /**
   * Creates a new account manager.
   * @param client - The client this account manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch a RIOT account by its unique PUUID.
   *
   * @param id - The PUUID of the RIOT account.
   * @param options - The basic fetching options.
   */
  async fetch(id: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'account', options);
    const { ignoreCache, ignoreStorage, cache, store } = opts;
    const region = options?.region ?? this.client.region;
    this.client.logger?.trace(`Fetching account data for ID: ${id} with options: `, opts);
    try {
      if (!ignoreCache) {
        const exists = await this.client.cache.has(`account:${id}`);
        if (exists) return this.client.cache.get<Account>(`account:${id}`);
      }

      if (!ignoreStorage) {
        const storage = this.client.storage.fetch<AccountData>('account', id);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored) {
          const account = new Account(stored);
          if (cache) await this.client.cache.set(`account:${id}`, account);
          return account;
        }
      }

      const response = await this.client.api.request('/riot/account/v1/accounts/by-puuid/' + id, {
        region,
        regional: true,
        api: 'ACCOUNT',
        method: 'getByPuuid',
        params: 'PUUID: ' + id
      });
      const accountData = <AccountData>response.data;
      const account = new Account(accountData);
      if (cache) await this.client.cache.set(`account:${id}`, account);
      if (store) await this.client.storage.save(accountData, 'account', account.playerId);
      return account;
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Fetch a RIOT account by its name and tag.
   *
   * @param name - The name of this RIOT account.
   * @param tag - The tag of this RIOT account.
   * @param options - The basic fetching options.
   */
  async fetchByNameAndTag(name: string, tag: string, options?: FetchOptions) {
    const opts = parseFetchOptions(this.client, 'account', options);
    const { ignoreCache, ignoreStorage, cache, store, region } = opts;
    this.client.logger?.trace(`Fetching account for name#tag: ${name}#${tag} with options: `, opts);
    try {
      if (!ignoreCache) {
        const cached = await this.client.cache.find<Account>((a) => a.username === name && a.userTag === tag);
        if (cached) return cached;
      }

      if (!ignoreStorage) {
        const stored = await this.client.storage.search<AccountData>('account', { gameName: name, tagLine: tag });
        if (stored.length > 0) {
          const account = new Account(stored[0]);
          if (cache) await this.client.cache.set(`account:${account.playerId}`, account);
          return account;
        }
      }

      const accountResponse = await this.client.api.request(
        '/riot/account/v1/accounts/by-riot-id/' + encodeURIComponent(name) + '/' + tag,
        {
          region: region!,
          regional: true,
          api: 'ACCOUNT',
          method: 'getByRiotId',
          params: 'NAME: ' + name + ', TAG: ' + tag
        }
      );
      const accountData = <AccountData>accountResponse.data;
      const account = new Account(accountData);
      if (cache) await this.client.cache.set(`account:${account.playerId}`, account);
      if (store) await this.client.storage.save(accountData, 'account', account.playerId);
      return account;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
