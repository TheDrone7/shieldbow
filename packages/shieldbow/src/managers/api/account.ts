import { BaseManager } from '@shieldbow/web';
import { FetchOptions, IAccount } from 'types';
import { Account } from 'structures';
import { Client } from 'client';
import { parseFetchOptions } from 'utilities';

export class AccountManager implements BaseManager<Account> {
  /**
   * The client that instantiated this manager.
   */
  client: Client;

  /**
   * Create a new account manager.
   * @param client - The client that instantiated this manager.
   */
  constructor(client: Client) {
    this.client = client;
  }

  /**
   * Fetch an account by the player's ID - the PUUID.
   */
  async fetch(id: string, options?: FetchOptions): Promise<Account> {
    const opts = parseFetchOptions(this.client, 'account', options);

    this.client.logger?.trace(`Fetching account with PUUID: ${id}`);
    const url = '/riot/account/v1/accounts/by-puuid/' + id;

    try {
      const cached = await this.checkInternal(id, opts);
      if (cached) return cached;

      const data = await this.client.request<IAccount>(url, {
        regional: true,
        method: 'accountByPuuid',
        debug: 'PUUID: ' + id,
        region: opts.region
      });

      this.client.logger?.trace(`Fetched account with PUUID: ${id}, processing`);
      return this.processData(data, opts);
    } catch (error) {
      this.client.logger?.trace(`Failed to fetch account with PUUID: ${id}`);
      return Promise.reject(error);
    }
  }

  private async checkInternal(id: string, opts: FetchOptions): Promise<Account | undefined> {
    const { ignoreCache, ignoreStorage } = opts;
    const cached = this.client.cache.get<Account>(`account:${id}`);
    const toIgnoreCache = cached && typeof ignoreCache === 'function' ? ignoreCache(cached) : !!ignoreCache;
    if (!toIgnoreCache && cached) {
      this.client.logger?.trace(`Found account with PUUID: ${id} in cache`);
      return cached;
    } else if (toIgnoreCache) this.client.logger?.trace(`Cache ignored for account with PUUID: '${id}'`);
    else this.client.logger?.trace(`Account with PUUID: ${id} not found in cache`);

    try {
      const stored = await this.client.storage.load<IAccount>('accounts', id);
      const toIgnoreStorage = stored && typeof ignoreStorage === 'function' ? ignoreStorage(stored) : !!ignoreStorage;
      if (!toIgnoreStorage && stored) {
        this.client.logger?.trace(`Found account with PUUID: ${id} in storage`);
        return this.processData(stored, opts);
      } else if (toIgnoreStorage) this.client.logger?.trace(`Storage ignored for account with PUUID: '${id}'`);
      else this.client.logger?.trace(`Account with PUUID: ${id} not found in storage`);
      throw new Error('Not found in storage');
    } catch (error) {
      this.client.logger?.trace(`Account with PUUID: ${id} not found in storage`);
      this.client.logger?.trace(error);
      return undefined;
    }
  }

  private async processData(data: IAccount, opts: FetchOptions): Promise<Account> {
    const { cache, store } = opts;

    const toStore = typeof store === 'function' ? store(data) : !!store;
    if (toStore) {
      this.client.logger?.trace(`Storing account with PUUID: ${data.puuid}`);
      await this.client.storage?.save('accounts', data.puuid, data);
    }

    const account = new Account(this.client, data);

    const toCache = typeof cache === 'function' ? cache(account) : !!cache;
    if (toCache) {
      this.client.logger?.trace(`Caching account with PUUID: ${data.puuid}`);
      this.client.cache.set(`account:${data.puuid}`, account);
    }
    return account;
  }
}
