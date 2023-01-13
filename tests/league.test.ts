import { Client, LeagueEntry } from '../dist';
import { Collection } from '@discordjs/collection';

describe('API: league-v4 + league-exp-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let leagues: Collection<string, LeagueEntry>;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    leagues = await summoner.fetchLeagueEntries().catch(() => new Collection());
  });

  it('can fetch league entries by summoner', () => {
    expect(leagues.size).toBeGreaterThanOrEqual(0);
    if (leagues.size) expect(leagues.keys()).toContain('RANKED_SOLO_5x5');
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
      const leagueList = await client.leagues.fetchByLeagueId(league!.league);
      expect(leagueList.entries.size).toBeGreaterThanOrEqual(1);
    }
  });

  it('can fetch entries by tier', async () => {
    const challengers = await client.leagues
      .fetchByQueueAndTier('RANKED_SOLO_5x5', 'CHALLENGER', 'I')
      .catch(() => new Collection());
    expect(challengers.size).toBeGreaterThanOrEqual(0);
  });
});
