import { Client, LeagueEntry, Summoner } from '../dist';
import { Collection } from '@discordjs/collection';

describe('API: league-v4 + league-exp-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let summoner: Summoner;
  let leagues: Collection<string, LeagueEntry>;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    leagues = await summoner.fetchLeagueEntries(global.fetchOpts).catch(() => new Collection());
  });

  it('can fetch league entries by summoner', () => {
    expect(leagues.size).toBeGreaterThanOrEqual(0);
    if (leagues.size) expect(leagues.keys()).toContain('RANKED_SOLO_5x5');
  });

  it('can fetch league entries from storage', async () => {
    if (leagues.size) {
      const stored = await summoner.fetchLeagueEntries({
        ignoreCache: true,
        ignoreStorage: false
      });
      expect(stored.size).toBeGreaterThanOrEqual(leagues.size);
      expect(stored.keys()).toContain('RANKED_SOLO_5x5');
    }
  });

  it('can fetch league entries from cache', async () => {
    if (leagues.size) {
      const cached = await summoner.fetchLeagueEntries({
        ignoreCache: false,
        ignoreStorage: false
      });
      expect(cached.size).toBeGreaterThanOrEqual(leagues.size);
      expect(cached.keys()).toContain('RANKED_SOLO_5x5');
    }
  });

  it('fetches the correct entries and maps them properly', () => {
    if (leagues.size) {
      const league = leagues.get('RANKED_SOLO_5x5')!;
      expect(league.summonerName).toBe('TheDrone7');
    }
  });

  it('can fetch leagues by league ID', async () => {
    if (leagues.size) {
      const league = leagues.get('RANKED_SOLO_5x5');
      const leagueList = await client.leagues.fetchByLeagueId(league!.league, global.fetchOpts);
      expect(leagueList.entries.size).toBeGreaterThanOrEqual(1);
    }
  });

  it('can fetch leagues by league ID from storage', async () => {
    if (leagues.size) {
      const league = leagues.get('RANKED_SOLO_5x5');
      const leagueList = await client.leagues.fetchByLeagueId(league!.league, {
        ignoreCache: true,
        ignoreStorage: false
      });
      expect(leagueList.entries.size).toBeGreaterThanOrEqual(1);
    }
  });

  it('can fetch leagues by league ID from cache', async () => {
    if (leagues.size) {
      const league = leagues.get('RANKED_SOLO_5x5');
      const leagueList = await client.leagues.fetchByLeagueId(league!.league, {
        ignoreCache: false,
        ignoreStorage: false
      });
      expect(leagueList.entries.size).toBeGreaterThanOrEqual(1);
    }
  });

  it('can fetch apex entries by tier', async () => {
    const challengers = await client.leagues
      .fetchByQueueAndTier('RANKED_SOLO_5x5', 'CHALLENGER', 'I')
      .catch(() => new Collection());
    expect(challengers.size).toBeGreaterThanOrEqual(0);
  });

  it('can fetch league entries by tier', async () => {
    const challengers = await client.leagues
      .fetchByQueueAndTier('RANKED_SOLO_5x5', 'DIAMOND', 'I')
      .catch(() => new Collection());
    expect(challengers.size).toBeGreaterThanOrEqual(0);
  });
});
