import { Client } from '../dist';

describe('Test lol-challenges-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize({
      region: 'na',
      cache: false
    });
  });

  test('Check fetching challenge data', async () => {
    const challenge = await client.challenges.fetch(0);
    expect(challenge).toBeDefined();
    expect(challenge.name).toBe('CRYSTAL');
    expect(challenge.percentiles).toBeDefined();
    expect(challenge.percentiles.get('NONE')).toBe(1);
  });
});
