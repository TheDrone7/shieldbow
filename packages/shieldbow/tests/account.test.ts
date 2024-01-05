import { Account, Client } from '../dist';
import { config } from 'dotenv';

config();

describe('API: account-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let account: Account;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      account = await client.accounts.fetchByRiotId('TheDrone7', '0000', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch account by riot ID', () => {
    expect(account).toBeDefined();
    expect(account.username).toBe('TheDrone7');
    expect(account.tagLine).toBe('0000');

    expect(account.tag).toBe('TheDrone7#0000');
    expect(account.id).toBeDefined();
  });

  it('should be unable to fetch unknown account', async () => {
    await expect(async () => {
      await client.accounts.fetchByRiotId('Unknown00123', 'Unknown00123', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be able to fetch account by PUUID', async () => {
    const account2 = await client.accounts.fetch(account.id, globalThis.fetchOpts);
    expect(account2).toBeDefined();
    expect(account2.username).toBe('TheDrone7');
    expect(account2.tagLine).toBe('0000');

    expect(account2.tag).toBe('TheDrone7#0000');
    expect(account2.id).toBeDefined();
  });

  it('should cache account', async () => {
    const account2 = await client.accounts.fetch(account.id, globalThis.fetchOpts);
    expect(account2).toBeDefined();
    expect(account2.username).toBe('TheDrone7');
    expect(account2.tagLine).toBe('0000');

    expect(account2.tag).toBe('TheDrone7#0000');
    expect(account2.id).toBeDefined();

    expect(client.cache.has('account:' + account.id)).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const account2 = await client.accounts.fetch(account.id, {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === account.id
    });
    expect(account2).toBeDefined();
    expect(account2.username).toBe('TheDrone7');
    expect(account2.tagLine).toBe('0000');

    expect(account2.tag).toBe('TheDrone7#0000');
    expect(account2.id).toBeDefined();
  });

  it('should store to local file', async () => {
    const storage = await client.storage.has(`accounts`, account.id);
    expect(storage).toBeTruthy();
  });

  afterAll(async () => {
    await client.storage.clearAll();
  });
});
