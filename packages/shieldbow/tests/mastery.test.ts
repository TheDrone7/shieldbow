import { Champion } from '@shieldbow/web';
import { Account, ChampionMastery, Client } from '../dist';
import { config } from 'dotenv';
import { Collection } from '@discordjs/collection';

config();
jest.setTimeout(600000);

describe('API: champion-mastery-v4', () => {
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

  const genericValidate = (mastery: ChampionMastery) => {
    expect(mastery).toBeDefined();

    expect(mastery.champion).toBeDefined();
    expect(mastery.champion).toBeInstanceOf(Champion);
    expect(mastery.pointsSinceLastLevel).toBeGreaterThan(0);
    expect(mastery.lastPlayedAt).toBeInstanceOf(Date);
    expect(mastery.lastPlayedTimestamp).toBeGreaterThan(0);
    expect(mastery.lastPlayedTimestamp).toBeLessThan(Date.now());
  };

  const validate = (mastery: ChampionMastery) => {
    genericValidate(mastery);
    expect(mastery.champion.name).toBe('Kayn');
    expect(mastery.champion.key).toBe(141);
    expect(mastery.champion.id).toBe('Kayn');
    expect(mastery.level).toBe(7);
    expect(mastery.totalPoints).toBeGreaterThan(200000);
    expect(mastery.pointsSinceLastLevel).toBeGreaterThan(0);
  };

  it('should be able to fetch champion mastery by champion (API)', async () => {
    const mastery = await client.championMasteries.fetch(account.playerId, 'Kayn', {
      ...globalThis.fetchOpts,
      ignoreCache: true,
      ignoreStorage: true
    });

    validate(mastery);
  });

  it('should be able to fetch champion mastery by champion ID (cache)', async () => {
    const mastery = await client.championMasteries.fetch(account.playerId, 141, {
      ...globalThis.fetchOpts,
      ignoreStorage: false,
      ignoreCache: true
    });
    validate(mastery);
  });

  it('should be able to fetch champion mastery by champion ID (storage)', async () => {
    const mastery = await client.championMasteries.fetch(account.playerId, 141, {
      ...globalThis.fetchOpts,
      ignoreStorage: false,
      ignoreCache: true
    });
    validate(mastery);
  });

  it('should be able to fetch champion mastery score (API only)', async () => {
    const score = await client.championMasteries.fetchScore(account);
    expect(score).toBeDefined();
    expect(score).toBeGreaterThan(400);
  });

  it('should be unable to fetch invalid champion mastery', async () => {
    await expect(async () => {
      await client.championMasteries.fetch(account, 'invalid', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be unable to fetch mastery of invalid account', async () => {
    await expect(async () => {
      await client.championMasteries.fetch('invalid', 'Kayn', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be unable to fetch score of an invalid account', async () => {
    await expect(async () => {
      await client.championMasteries.fetchScore('invalid');
    }).rejects.toBeTruthy();
  });

  it('should be able to fetch all champion masteries', async () => {
    const masteries = await client.championMasteries.fetchAll(account, globalThis.fetchOpts);
    expect(masteries).toBeDefined();
    expect(masteries).toBeInstanceOf(Collection);
    expect(masteries.size).toBeGreaterThan(100);
    masteries.forEach(genericValidate);
  });

  it('should be unable to fetch all champion masteries of an invalid account', async () => {
    await expect(async () => {
      await client.championMasteries.fetchAll('invalid', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be able to fetch top masteries (API)', async () => {
    const masteries = await client.championMasteries.fetchTop(account, 10, {
      ...globalThis.fetchOpts,
      ignoreCache: true,
      ignoreStorage: true
    });
    expect(masteries).toBeDefined();
    expect(masteries).toBeInstanceOf(Array);
    expect(masteries.length).toBe(10);
    masteries.forEach(genericValidate);
  });

  it('should be able to fetch top masteries (cache)', async () => {
    const masteries = await client.championMasteries.fetchTop(account, 5, {
      ...globalThis.fetchOpts,
      ignoreCache: false,
      ignoreStorage: true
    });
    expect(masteries).toBeDefined();
    expect(masteries).toBeInstanceOf(Array);
    expect(masteries.length).toBe(5);
    masteries.forEach(genericValidate);
  });

  it('should be able to fetch top masteries (storage)', async () => {
    const masteries = await client.championMasteries.fetchTop(account, 3, {
      ...globalThis.fetchOpts,
      ignoreCache: true,
      ignoreStorage: false
    });
    expect(masteries).toBeDefined();
    expect(masteries).toBeInstanceOf(Array);
    expect(masteries.length).toBe(3);
    masteries.forEach(genericValidate);
  });

  it('should be unable to fetch top masteries of an invalid account', async () => {
    await expect(async () => {
      await client.championMasteries.fetchTop('invalid', 10, globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be able to fetch the nth highest mastery', async () => {
    const mastery = await client.championMasteries.fetchHighest(account, 1, globalThis.fetchOpts);
    validate(mastery);
  });

  afterAll(async () => {
    await client.storage.clearAll();
  });
});
