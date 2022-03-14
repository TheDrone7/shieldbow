import type { BaseManager, AccountData } from '../types';
import type { Client } from '../client';
import Collection from '@discordjs/collection';
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

  constructor(client: Client) {
    this.client = client;
    this.cache = new Collection<string, Account>();
  }

  /**
   * Fetch a RIOT account by its unique PUUID.
   *
   * @param id The PUUID of the RIOT account.
   * @param options The basic fetching options.
   */
  fetch(id: string, options: { force: boolean } = { force: false }) {
    return new Promise<Account>(async (resolve, reject) => {
      if (this.cache.has(id) && !options.force) resolve(this.cache.get(id)!);
      const accountResponse = await this.client.api
        .makeApiRequest('/riot/account/v1/accounts/by-puuid/' + id, {
          regional: true,
          name: 'Account by PUUID',
          params: 'PUUID: ' + id
        })
        .catch(reject);
      if (accountResponse) {
        const accountData = <AccountData>accountResponse.data;
        const account = new Account(accountData);
        this.cache.set(id, account);
        resolve(account);
      }
    });
  }

  /**
   * Fetch a RIOT account by its name and tag.
   *
   * @param name The name of this RIOT account.
   * @param tag The tag of this RIOT account.
   * @param options The basic fetching options.
   */
  fetchByNameAndTag(name: string, tag: string, options: { force: boolean } = { force: false }) {
    return new Promise<Account>(async (resolve, reject) => {
      const cached = this.cache.find((a) => a.username === name && a.userTag === tag);
      if (cached && !options.force) resolve(cached);
      const accountResponse = await this.client.api
        .makeApiRequest('/riot/account/v1/accounts/by-riot-id/' + name + '/' + tag, {
          regional: true,
          name: 'Account by name and tag',
          params: 'NAME: ' + name + ', TAG: ' + tag
        })
        .catch(reject);
      if (accountResponse) {
        const accountData = <AccountData>accountResponse.data;
        const account = new Account(accountData);
        this.cache.set(account.playerId, account);
        resolve(account);
      }
    });
  }
}
