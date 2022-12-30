import { Client } from '../dist';

describe('API: lol-status-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
  });

  it('can fetch API statuses', async () => {
    // TODO: Add type support.
    const status = <{ id: string; name: string }>await client.status;
    expect(status.id).toBe('NA1');
    expect(status.name).toBe('North America');
  });
});
