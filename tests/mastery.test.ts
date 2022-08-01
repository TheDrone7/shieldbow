import { Client, ChampionMasteryManager } from '../dist';

describe('Test Champion Mastery v4 API', () => {
  const client = new Client(process.env.riot_api_key!);

  let masteries: ChampionMasteryManager;

  beforeAll(async () => {
    await client.initialize({
      region: 'euw',
      cache: {
        enable: false
      },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: false
      }
    });
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    masteries = summoner.championMastery;
  });

  test('Check specific champion details', async () => {
    const mastery = await masteries.fetch('Kayn');
    expect(mastery.level).toBe(7);
  });

  test('Check highest mastery', async () => {
    const mastery = await masteries.highest();
    expect(mastery.level).toBe(7);
  });

  test('Check total points', async () => {
    await masteries.updateTotalScore();
    const points = masteries.totalScore;
    expect(points).toBeGreaterThan(296);
  });
});
