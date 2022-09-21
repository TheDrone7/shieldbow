import { Client } from '../dist';

describe('Test client configuration update', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
  });

  test('Check API status fetching', async () => {
    // TODO: Add type support.
    const status = <{ id: string; name: string }>await client.status;
    expect(status.id).toBe('NA1');
    expect(status.name).toBe('North America');
  });
});
