import { Client, LeagueEntry } from '../dist';
import type { Collection } from '@discordjs/collection';

describe('Test league-v4 and league-exp-v4 API', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let leagues: Collection<string, LeagueEntry>;

  beforeAll(async () => {
    await client.initialize({
      region: 'euw',
      cache: false
    });
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    leagues = await summoner.fetchLeagueEntries();
  });

  test('Check entries size', () => {
    expect(leagues.size).toBeGreaterThanOrEqual(0);
  });

  test('Check entries keys', () => {
    if (leagues.size) expect(leagues.keys()).toContain('RANKED_SOLO_5x5');
  });

  test('Check entry data', () => {
    if (leagues.size) {
      const league = leagues.get('RANKED_SOLO_5x5')!;
      expect(league.summonerName).toBe('TheDrone7');
    }
  });

  test('Check leagues fetching by league ID', async () => {
    if (leagues.size) {
      const league = leagues.get('RANKED_SOLO_5x5');
      const leagueList = await client.leagues.fetchByLeagueId(league!.league);
      expect(leagueList.entries.size).toBeGreaterThanOrEqual(1);
    }
  });

  test('Check challenger list', async () => {
    const challengers = await client.leagues.fetchByQueueAndTier('RANKED_SOLO_5x5', 'CHALLENGER', 'I');
    expect(challengers.size).toBeGreaterThanOrEqual(0);
  });
});
