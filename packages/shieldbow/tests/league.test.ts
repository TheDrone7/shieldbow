import { config } from 'dotenv';
import { Client, LeagueEntry, LeagueItem, LeagueList, QueueType, Summoner } from '../dist';
import { Collection } from '@discordjs/collection';

config();

describe('API: league-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);
  let summoner: Summoner;
  let entries: Collection<QueueType, LeagueEntry>;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      const account = await client.accounts.fetchByRiotId('TheDrone7', '0000', globalThis.fetchOpts);
      summoner = await account.fetchSummoner(globalThis.fetchOpts);
      entries = await client.leagues.fetch(summoner.id, {
        ...globalThis.fetchOpts,
        ignoreCache: true,
        ignoreStorage: true
      });
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  const validateEntry = (entry: LeagueEntry) => {
    expect(entry).toBeDefined();
    expect(entry).toBeInstanceOf(LeagueEntry);
    expect(entry!.queue).toBe('RANKED_SOLO_5x5');
    expect(entry?.promos).toBeUndefined();
  };

  const validateEntries = (entries: Collection<QueueType, LeagueEntry>) => {
    expect(entries.size).toBeGreaterThan(0);
    const soloQ = entries.get('RANKED_SOLO_5x5');
    expect(soloQ).toBeDefined();
    validateEntry(soloQ!);
  };

  it('should be able to fetch league entries by summoner ID (API)', () => {
    validateEntries(entries);
  });

  it('should be able to fetch league entries by summoner ID (cache)', async () => {
    const exists = await client.cache.has(`league:${summoner.id}`);
    expect(exists).toBeTruthy();
    const entries = await client.leagues.fetch(summoner.id, {
      ...globalThis.fetchOpts,
      ignoreStorage: true,
      ignoreCache: false
    });
    validateEntries(entries);
  });

  it('should be able to fetch league entries by summoner ID (storage)', async () => {
    const exists = await client.storage.has('league', summoner.id);
    expect(exists).toBeTruthy();
    const entries = await client.leagues.fetch(summoner.id, {
      ...globalThis.fetchOpts,
      ignoreStorage: false,
      ignoreCache: true
    });
    validateEntries(entries);
  });

  it('should be unable to fetch invalid summoner league entries', async () => {
    await expect(async () => {
      await client.leagues.fetch('invalid', globalThis.fetchOpts);
    }).rejects.toThrow();
  });

  it('should be able to fetch league entries by queue and divided tier (API)', async () => {
    const hardstucks = await client.leagues.fetchByQueueAndTier(
      'RANKED_SOLO_5x5',
      'EMERALD',
      'II',
      1,
      globalThis.fetchOpts
    );

    expect(hardstucks).toBeDefined();
    expect(hardstucks.length).toBeGreaterThan(10);
    expect(hardstucks[0]).toBeInstanceOf(LeagueEntry);
    expect(hardstucks[0].tier).toBe('EMERALD');
    expect(hardstucks[0].division).toBe('II');
    hardstucks.forEach(validateEntry);

    // Should cache the league entry
    const cached = await client.cache.has(`league:${hardstucks[0].summonerId}`);
    expect(cached).toBeTruthy();

    // Should store the league entry
    const stored = await client.storage.has('league', hardstucks[0].summonerId);
    expect(stored).toBeTruthy();
  });

  it('should be able to fetch league entries by queue and apex tier (API)', async () => {
    const challengers = await client.leagues.fetchByQueueAndTier(
      'RANKED_SOLO_5x5',
      'CHALLENGER',
      'I',
      1,
      globalThis.fetchOpts
    );

    expect(challengers).toBeDefined();
    expect(challengers.length).toBeGreaterThan(50);
    expect(challengers[0]).toBeInstanceOf(LeagueEntry);
    expect(challengers[0].tier).toBe('CHALLENGER');
    expect(challengers[0].division).toBe('I');
    challengers.forEach(validateEntry);

    // Should cache the league entry
    const cached = await client.cache.has(`league:${challengers[0].summonerId}`);
    expect(cached).toBeTruthy();

    // Should store the league entry
    const stored = await client.storage.has('league', challengers[0].summonerId);
    expect(stored).toBeTruthy();
  });

  it('should be able to fetch league list by league ID', async () => {
    const soloQ = entries.get('RANKED_SOLO_5x5');
    const league = await client.leagues.fetchByLeagueId(soloQ!.leagueId, globalThis.fetchOpts);

    expect(league).toBeDefined();
    expect(league).toBeInstanceOf(LeagueList);
    expect(league.leagueId).toBe(soloQ!.leagueId);
    expect(league.tier).toBe(soloQ!.tier);
    expect(league.queue).toBe(soloQ!.queue);

    const leagueItems = league.items;
    expect(leagueItems).toBeDefined();
    expect(leagueItems.length).toBeGreaterThan(0);

    const leagueItem = leagueItems[0];
    expect(leagueItem).toBeDefined();
    expect(leagueItem).toBeInstanceOf(LeagueItem);
    expect(leagueItem.winRate).toBeDefined();
    expect(leagueItem.rank).toContain('SILVER');
    expect(leagueItem.labels).toBeInstanceOf(Array);
  });
});
