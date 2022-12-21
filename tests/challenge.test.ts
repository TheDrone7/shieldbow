import { Client } from '../dist';

describe('API: lol-challenges-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize({
      region: 'na',
      cache: false
    });
  });

  it('can fetch challenge data by ID', async () => {
    const challenge = await client.challenges.fetch(0);
    expect(challenge).toBeDefined();
    expect(challenge.name).toBe('CRYSTAL');
    expect(challenge.percentiles).toBeDefined();
    expect(challenge.percentiles.get('NONE')).toBe(1);
  });

  it('can fetch all challenges data', async () => {
    const challenges = await client.challenges.fetchAll();
    expect(challenges).toBeDefined();
    expect(challenges.size).toBeGreaterThan(0);
    expect(challenges.get(0)).toBeDefined();
    expect(challenges.get(0)?.name).toBe('CRYSTAL');
  });

  it('can fetch challenge leaderboard', async () => {
    const leaders = await client.challenges.fetchLeaderboard(101106, 'MASTER', { limit: 10 });
    expect(leaders).toBeDefined();
    expect(leaders.length).toBe(10);
  });

  it('can check summoner progression in challenges', async () => {
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    expect(summoner).toBeDefined();
    const progress = await summoner.fetchChallenges();
    expect(progress).toBeDefined();
    expect(progress.totalPoints).toBeDefined();
    expect(progress.challenges.size).toBeGreaterThan(0);
    expect(progress.categoryPoints.size).toBe(5);
    expect(progress.preferences).toBeDefined();
  });
});
