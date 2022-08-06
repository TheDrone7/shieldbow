import { SummonerSpell, Client } from '../dist';

describe('Test summoner spells fetching.', () => {
  const client = new Client(process.env.riot_api_key!);

  let flash: SummonerSpell;

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
    flash = await client.summonerSpells.fetch('SummonerFlash');
  });

  test('Check spell fetching by ID', () => {
    expect(flash.name).toBe('Flash');
  });

  test('Check spell fetching by name', async () => {
    const byName = await client.summonerSpells.findByName('Flash');
    expect(byName).toBe(flash);
  });

  test('Check spell caching', async () => {
    const cachedFlash = client.summonerSpells.cache.find((s) => s.id === 'SummonerFlash')!;
    expect(cachedFlash.name).toBe(flash.name);
  });

  test('Check spells pre-fetching', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    await client2.initialize({
      cache: false,
      fetch: {
        summonerSpells: true
      }
    });
    expect(client2.summonerSpells.cache.size).toBeGreaterThan(10);
  });
});
