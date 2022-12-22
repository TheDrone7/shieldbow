import { Client, Tournament } from '../dist';

describe('API: clash-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let tournaments: Tournament[];

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    tournaments = await client.clash.fetchAll();
  });

  it('can fetch all clash tournaments', () => {
    expect(tournaments).toBeDefined();
  });

  it('can fetch clash tournament by ID', async () => {
    if (tournaments.length) {
      const t = await client.clash.fetch(tournaments[0].id);
      const t2 = await client.clash.fetch(tournaments[0].id, { force: true });
      expect(t.title).toBe(tournaments[0].title);
      expect(t2.title).toBe(tournaments[0].title);
    }
  });
});
