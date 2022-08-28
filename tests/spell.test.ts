import { SummonerSpell, Client } from '../dist';

describe('Test summoner spells fetching.', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

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
    const byName = await client.summonerSpells.fetchByName('Flash');
    expect(byName).toBe(flash);
  });

  test('Check spell caching', async () => {
    expect(client.summonerSpells.cache.get('SummonerFlash')).toBe(flash);
  });

  test('Check spells pre-fetching', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    await client2.initialize({
      cache: false,
      fetch: {
        summonerSpells: true
      }
    });
    expect(client2.summonerSpells.cache.size).toBe(16);
  });
});
