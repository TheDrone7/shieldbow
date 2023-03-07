import { Client, Summoner } from '../dist';

jest.setTimeout(600000);
// This goes beyond the ratelimit to make sure ratelimiter works properly and limits you.
// If this test fails, your API key will be at risk of being blacklisted, so be careful.
describe('UTIL: ratelimiter', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    // Custom config to switch to burst mode and throw for faster testing.
    await client.initialize({
      cache: false,
      storage: false,
      fetch: false,
      ratelimiter: {
        strategy: 'burst',
        throw: true,
        retry: {
          retries: 5,
          retryDelay: 5000
        }
      }
    });
  });

  it('can rate limit properly', async () => {
    const processes = [];
    for (let i = 0; i < 101; i++) processes.push(client.summoners.fetchBySummonerName('TheDrone7'));
    const results: string | Summoner[] = await Promise.all(processes).catch((e) => e.url);
    // If it fails, then the URL must be returned and the returned URL must not contain base URL.
    // If it contains base URL, then it was an actual API response which should be prevented.
    if (typeof results === 'string') expect(results).toBe('/lol/summoner/v4/summoners/by-name/TheDrone7');
    // If it succeeds (might happen if slow internet), then the results must be an array of 101 summoners.
    else expect(results.length).toBeGreaterThanOrEqual(101);
  });
});
