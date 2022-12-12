import { SummonerSpell, Client } from '../dist';

describe('DRAGON: summoner spells', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let flash: SummonerSpell;

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
    flash = await client.summonerSpells.fetch('SummonerFlash');
  });

  it('can fetch summoner spells by ID', () => {
    expect(flash.name).toBe('Flash');
  });

  it('can fetch summoner spells by name', async () => {
    const byName = await client.summonerSpells.fetchByName('Flash');
    expect(byName).toBe(flash);
  });

  it('can cache summoner spells', async () => {
    expect(client.summonerSpells.cache.get('SummonerFlash')).toBe(flash);
  });

  it('can pre-fetch summoner spells', async () => {
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
