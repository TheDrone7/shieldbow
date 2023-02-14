import { Client, Summoner } from '../dist';

jest.setTimeout(300000);
// This goes beyond the ratelimit to make sure ratelimiter works properly and limits you.
// If this test fails, your API key will be at risk of being blacklisted, so be careful.
describe('UTIL: ratelimiter', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
  });

  it('can rate limit properly', async () => {
    const processes = [];
    for (let i = 0; i < 101; i++) processes.push(client.summoners.fetchBySummonerName('TheDrone7'));
    const results: string | Summoner[] = await Promise.all(processes).catch((e) => e.url);
    if (typeof results === 'string') expect(results).toBe('/lol/summoner/v4/summoners/by-name/TheDrone7');
    else expect(results.length).toBeGreaterThan(101);
  });
});
