import type { BaseManager, AccountData, FetchOptions } from '../types';
import type { Client } from '../client';
import { Account } from '../structures';
import { parseFetchOptions } from '../util';

/**
 * An account manager - to fetch and manage all the RIOT accounts.
 */
export class AccountManager implements BaseManager<Account> {
  /**
   * The client this accounts manager belongs to.
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
    return new Promise<Account>(async (resolve, reject) => {
      const existsCached = await this.client.cache.has(`account:${id}`);
      if (existsCached && !ignoreCache) resolve(await this.client.cache.get<Account>(`account:${id}`)!);
      else {
        const storage = this.client.storage.fetch<Account>('account', id);
        const stored = storage instanceof Promise ? await storage.catch(() => undefined) : storage;
        if (stored && !ignoreStorage) resolve(stored);
        else {
          const accountResponse = await this.client.api
            .makeApiRequest('/riot/account/v1/accounts/by-puuid/' + id, {
              region,
              regional: true,
              name: 'Account by PUUID',
              params: 'PUUID: ' + id
            })
            .catch(reject);
          if (accountResponse) {
            const accountData = <AccountData>accountResponse.data;
            const account = new Account(accountData);
            if (cache) await this.client.cache.set(`account:id`, account);
            if (store) await this.client.storage.save(account, 'account', account.playerId);
            resolve(account);
          }
        }
      }
    });
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
    return new Promise<Account>(async (resolve, reject) => {
      const cached = await this.client.cache.find<Account>((a) => a.username === name && a.userTag === tag);
      if (cached && !ignoreCache) resolve(cached);
      else {
        const stored = await this.client.storage.search<Account>('account', { gameName: name, tagLine: tag });
        if (stored.length > 0 && !ignoreStorage) resolve(stored[0]);
        else {
          const accountResponse = await this.client.api
            .makeApiRequest('/riot/account/v1/accounts/by-riot-id/' + encodeURIComponent(name) + '/' + tag, {
              region: region!,
              regional: true,
              name: 'Account by name and tag',
              params: 'NAME: ' + name + ', TAG: ' + tag
            })
            .catch(reject);
          if (accountResponse) {
            const accountData = <AccountData>accountResponse.data;
            const account = new Account(accountData);
            if (cache) await this.client.cache.set(account.playerId, account);
            if (store) await this.client.storage.save(account, 'account', account.playerId);
            resolve(account);
          }
        }
      }
    });
  }
}
