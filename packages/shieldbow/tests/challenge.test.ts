import { Client, LolChallenge, PlayerChallenges } from '../dist';
import { config } from 'dotenv';

config();

// ID: 201003
describe('API: lol-challenges-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let udk: LolChallenge;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      udk = await client.lolChallenges.fetch(201003, globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch challenge by ID', () => {
    expect(udk).toBeDefined();
    expect(udk.id).toBe(201003);
    expect(udk.name).toBe('Unkillable Demon King');
    expect(udk.state).toBe('ENABLED');
    expect(udk.hasLeaderboard).toBeTruthy();
  });

  it('should be unable to fetch unknown challenge', async () => {
    await expect(async () => {
      await client.lolChallenges.fetch(-1, globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should cache challenge', async () => {
    const udk2 = await client.lolChallenges.fetch(201003, globalThis.fetchOpts);
    expect(udk2).toBeDefined();
    expect(udk2.id).toBe(201003);
    expect(udk2.name).toBe('Unkillable Demon King');
    expect(udk2.state).toBe('ENABLED');
    expect(udk2.hasLeaderboard).toBeTruthy();

    expect(client.cache.has('lol-challenge:' + udk.id)).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const udk2 = await client.lolChallenges.fetch(201003, {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === udk.id
    });
    expect(udk2).toBeDefined();
    expect(udk2.id).toBe(201003);
    expect(udk2.name).toBe('Unkillable Demon King');
    expect(udk2.state).toBe('ENABLED');
    expect(udk2.hasLeaderboard).toBeTruthy();
  });

  it('should store to local file', async () => {
    const udk2 = await client.lolChallenges.fetch(201003, {
      ...globalThis.fetchOpts,
      ignoreStorage: false,
      ignoreCache: true
    });
    expect(udk2).toBeDefined();

    const storage = await client.storage.has(`challenges`, udk.id.toString());
    expect(storage).toBeTruthy();
  });

  it('should be able to fetch challenge percentile (from API)', async () => {
    const udkPercentile = await client.lolChallenges.fetchPercentiles(201003, globalThis.fetchOpts);
    expect(udkPercentile).toBeDefined();
    expect(udkPercentile.NONE).toBeDefined();
    expect(udkPercentile.BRONZE).toBeDefined();
  });

  it('should be able to fetch challenge percentile (from cache)', async () => {
    const udkPercentile = await client.lolChallenges.fetchPercentiles(201003, {
      ...globalThis.fetchOpts,
      ignoreCache: false,
      cache: false
    });
    expect(udkPercentile).toBeDefined();
    expect(udkPercentile.NONE).toBeDefined();
    expect(udkPercentile.BRONZE).toBeDefined();

    const udk2 = await client.cache.get<LolChallenge>(`lol-challenge:201003`);
    expect(udk2).toBeDefined();
    expect(udk2?.percentiles).toBeDefined();
  });

  it('should be able to fetch player challenges (from API)', async () => {
    const account = await client.accounts.fetchByRiotId('TheDrone7', '0000', globalThis.fetchOpts);
    const challenges = await client.lolChallenges.fetchPlayerChallenges(account!.id, globalThis.fetchOpts);
    expect(challenges).toBeDefined();
    expect(challenges.total.current).toBeGreaterThan(10000);
    expect(challenges.categories.COLLECTION).toBeDefined();
    expect(challenges.categories.COLLECTION.current).toBeGreaterThan(2000);
    expect(challenges.challenges.length).toBeGreaterThan(10);
    expect(challenges.challenges[0].challengeId).toBeDefined();
    expect(challenges.preferences.prestigeCrestBorderLevel).toBeGreaterThan(0);
    expect(challenges.preferences.displayedChallengeIds.length).toBe(3);
  });

  it('should be able to fetch player challenges (from cache)', async () => {
    const account = await client.accounts.fetchByRiotId('TheDrone7', '0000', globalThis.fetchOpts);
    const challenges = await client.lolChallenges.fetchPlayerChallenges(account!.id, {
      ...globalThis.fetchOpts,
      ignoreCache: false,
      cache: false
    });

    expect(challenges).toBeDefined();
    expect(challenges.total.current).toBeGreaterThan(10000);
    expect(challenges.categories.COLLECTION).toBeDefined();
    expect(challenges.categories.COLLECTION.current).toBeGreaterThan(2000);
    expect(challenges.challenges.length).toBeGreaterThan(10);
    expect(challenges.challenges[0].challengeId).toBeDefined();
    expect(challenges.preferences.prestigeCrestBorderLevel).toBeGreaterThan(0);
    expect(challenges.preferences.displayedChallengeIds.length).toBe(3);

    const challenges2 = await client.cache.get<PlayerChallenges>(`player-challenges:${account!.id}`);
    expect(challenges2).toBeDefined();
  });

  it('should be able to fetch player challenges (from storage)', async () => {
    const account = await client.accounts.fetchByRiotId('TheDrone7', '0000', globalThis.fetchOpts);
    const challenges = await client.lolChallenges.fetchPlayerChallenges(account!.id, {
      ...globalThis.fetchOpts,
      ignoreStorage: false,
      ignoreCache: true
    });

    expect(challenges).toBeDefined();

    const storage = await client.storage.has(`player-challenges`, account!.id.toString());
    expect(storage).toBeTruthy();
  });
});
