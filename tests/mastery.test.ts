import { Client, ChampionMasteryManager } from '../dist';

describe('API: champion-mastery-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let masteries: ChampionMasteryManager;

  beforeAll(async () => {
    await client.initialize({
      region: 'na',
      cache: false
    });
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    masteries = summoner.championMastery;
  });

  it('can fetch mastery details for specific champion', async () => {
    const mastery = await masteries.fetch('Kayn');
    expect(mastery.level).toBe(7);
  });

  it('can fetch all champion mastery', async () => {
    const summonerMastery = await masteries.fetchAll();
    expect(summonerMastery.size).toBeGreaterThan(50);
  }, 120000);

  it('can fetch highest mastery', async () => {
    const mastery = await masteries.highest();
    expect(mastery.level).toBe(7);
  });

  it('can fetch total points', async () => {
    await masteries.updateTotalScore();
    const points = masteries.totalScore;
    expect(points).toBeGreaterThan(296);
  });
});
