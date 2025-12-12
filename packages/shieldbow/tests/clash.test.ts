import { ClashTournament, Client } from '../dist';
import { config } from 'dotenv';

config();

describe('API: clash-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let tournaments: ClashTournament[];

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      tournaments = await client.clash.fetchAll(globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should be able to fetch tournaments', () => {
    expect(tournaments).toBeDefined();
  });

  it('should be able to fetch individual tournament by its ID', async () => {
    for (const tournament of tournaments) {
      const fetched = await client.clash.fetch(tournament.id, globalThis.fetchOpts);
      expect(fetched).toBeDefined();
      expect(fetched.id).toBe(tournament.id);
    }
  });
});
