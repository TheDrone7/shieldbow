import { Summoner, Client, Account } from '../dist';
import { config } from 'dotenv';

config();

describe('API: summoner-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let account: Account;
  let summoner: Summoner;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      account = await client.accounts.fetchByRiotId('TheDrone7', '0000', globalThis.fetchOpts);
      summoner = await account.fetchSummoner(globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch summoner by account (PUUID)', () => {
    expect(summoner).toBeDefined();
    expect(summoner.region).toBe('euw');
    expect(summoner.name).toBe('TheDrone7');
    expect(summoner.level).toBeGreaterThan(400);
    expect(summoner.id).toBeDefined();

    expect(summoner.profileIconUrl).toBeDefined();
    expect(summoner.revisionDate).toBeInstanceOf(Date);
  });

  it("should be able to fetch summoner's account", async () => {
    const acc = await summoner.fetchAccount(globalThis.fetchOpts);
    expect(acc).toBeDefined();
    expect(acc).toBe(account);
  });

  it('should cache summoner', async () => {
    const summoner2 = await client.summoners.fetch(summoner.playerId, globalThis.fetchOpts);
    expect(summoner2).toBeDefined();
    expect(summoner2.name).toBe('TheDrone7');
    expect(summoner2.level).toBeGreaterThan(400);
    expect(summoner2.id).toBeDefined();

    expect(client.cache.has('summoner:' + summoner.playerId)).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const summoner2 = await client.summoners.fetch(summoner.playerId, {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.playerId === summoner.playerId
    });

    expect(summoner2).toBeDefined();
    expect(summoner2.name).toBe('TheDrone7');
    expect(summoner2.level).toBeGreaterThan(400);
    expect(summoner2.id).toBeDefined();
  });

  it('should store to local file', async () => {
    const storage = await client.storage.has(`summoners`, summoner.playerId);
    expect(storage).toBeTruthy();
  });

  it('should be unable to fetch unknown summoner', async () => {
    await expect(async () => {
      await client.summoners.fetch(summoner.id, globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be able to fetch summoner by summoner ID (from API)', async () => {
    const summoner2 = await client.summoners
      .fetchBySummonerId(summoner.id, {
        ...globalThis.fetchOpts,
        ignoreCache: true,
        ignoreStorage: true
      })
      .catch(console.error);
    expect(summoner2).toBeDefined();
    expect(summoner2?.name).toBe('TheDrone7');
    expect(summoner2?.level).toBeGreaterThan(400);
    expect(summoner2?.id).toBeDefined();
  });

  it('should be able to fetch summoner by summoner ID (from storage)', async () => {
    const summoner2 = await client.summoners.fetchBySummonerId(summoner.id, {
      ...globalThis.fetchOpts,
      ignoreCache: true
    });
    expect(summoner2).toBeDefined();
    expect(summoner2.name).toBe('TheDrone7');
    expect(summoner2.level).toBeGreaterThan(400);
    expect(summoner2.id).toBeDefined();
  });

  it('should be able to fetch summoner by summoner ID (from cache)', async () => {
    const summoner2 = await client.summoners.fetchBySummonerId(summoner.id, globalThis.fetchOpts);
    expect(summoner2).toBeDefined();
    expect(summoner2.name).toBe('TheDrone7');
    expect(summoner2.level).toBeGreaterThan(400);
    expect(summoner2.id).toBeDefined();
  });

  afterAll(async () => {
    await client.storage.clearAll();
  });
});
