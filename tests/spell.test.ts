import { SummonerSpell, Client } from '../dist';

describe('DRAGON: summoner spells', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let flash: SummonerSpell;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    flash = await client.summonerSpells.fetch('SummonerFlash', {
      ignoreCache: true,
      cache: true,
      ignoreStorage: true,
      store: true
    });
  });

  it('can fetch summoner spells by ID', () => {
    expect(flash.name).toBe('Flash');
  });

  it('can fetch summoner spells from storage', async () => {
    const stored = await client.summonerSpells.fetch('SummonerFlash', {
      ignoreCache: true,
      ignoreStorage: false
    });
    expect(stored.name).toEqual(flash.name);
  });

  it('can fetch summoner spells by name', async () => {
    const byName = await client.summonerSpells.fetchByName('Flash');
    expect(byName).toStrictEqual(flash);
  });

  it('can cache summoner spells', async () => {
    expect(await client.cache.get<SummonerSpell>('spell:SummonerFlash')).toStrictEqual(flash);
  });

  it('can pre-fetch summoner spells', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    await client2.initialize({
      cache: false,
      storage: false,
      fetch: {
        summonerSpells: true
      }
    });
    expect((await client.cache.keys()).filter((k) => k.startsWith('spell:')).length).toBe(16);
  });
});
