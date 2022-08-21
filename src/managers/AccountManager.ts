import type { BaseManager, AccountData, FetchOptions } from '../types';
import type { Client } from '../client';
import { Collection } from '@discordjs/collection';
import { Account } from '../structures';

/**
 * An account manager - to fetch and manage all the RIOT accounts.
 */
export class AccountManager implements BaseManager<Account> {
  /**
   * The client this accounts manager belongs to.
   */
  readonly client: Client;
  /**
   * The accounts cached in the memory.
   */
  readonly cache: Collection<string, Account>;

  /**
   * Creates a new account manager.
   * @param client - The client this account manager belongs to.
   */
  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Account>();
  }

  /**
   * Fetch a RIOT account by its unique PUUID.
   *
   * @param id - The PUUID of the RIOT account.
   * @param options - The basic fetching options.
   */
  fetch(id: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Account>(async (resolve, reject) => {
      if (this.cache.has(id) && !force) resolve(this.cache.get(id)!);
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
          if (cache) this.cache.set(id, account);
          resolve(account);
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
  fetchByNameAndTag(name: string, tag: string, options?: FetchOptions) {
    const force = options?.force ?? false;
    const cache = options?.cache ?? true;
    const region = options?.region ?? this.client.region;
    return new Promise<Account>(async (resolve, reject) => {
      const cached = this.cache.find((a) => a.username === name && a.userTag === tag);
      if (cached && !force) resolve(cached);
      const accountResponse = await this.client.api
        .makeApiRequest('/riot/account/v1/accounts/by-riot-id/' + encodeURIComponent(name) + '/' + tag, {
          region,
          regional: true,
          name: 'Account by name and tag',
          params: 'NAME: ' + name + ', TAG: ' + tag
        })
        .catch(reject);
      if (accountResponse) {
        const accountData = <AccountData>accountResponse.data;
        const account = new Account(accountData);
        if (cache) this.cache.set(account.playerId, account);
        resolve(account);
      }
    });
  }
}
