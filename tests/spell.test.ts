import { SummonerSpell, Client } from '../dist';

describe('Test summoner spells fetching.', () => {
  const client = new Client(process.env.riot_api_key!);

  let flash: SummonerSpell;

  beforeAll(async () => {
    await client.initialize({
      cache: false,
      fetch: false
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
});
