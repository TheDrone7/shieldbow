import { Client, Tournament } from "../dist";

describe('Test Champion Mastery v4 API', () => {
  const client = new Client(process.env.riot_api_key!);

  let tournaments: Tournament[];

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
    tournaments = await client.clash.fetchAll();
  });

  test('Check fetching all tournaments', () => {
    expect(tournaments).toBeDefined();
  });

  test('Check fetching tournament by ID', async () => {
    if (tournaments.length) {
      const t = await client.clash.fetch(tournaments[0].id);
      const t2 = await client.clash.fetch(tournaments[0].id, { force: true });
      expect(t.title).toBe(tournaments[0].title);
      expect(t2.title).toBe(tournaments[0].title);
    }
  });
});
