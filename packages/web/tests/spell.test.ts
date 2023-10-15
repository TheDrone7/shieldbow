import { SummonerSpell, Client } from '../dist';

describe('DRAGON: summoner spells', () => {
  const client = new Client();

  let flash: SummonerSpell;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    flash = await client.summonerSpells.fetch('SummonerFlash', {
      ignoreCache: true,
      cache: true
    });
  });

  it('can fetch summoner spells by ID', () => {
    expect(flash.name).toBe('Flash');
  });

  it('can fetch summoner spells from storage', async () => {
    const stored = await client.summonerSpells.fetch('SummonerFlash', {
      ignoreCache: true
    });
    expect(stored.name).toEqual(flash.name);
  });

  it('can fetch summoner spells by name', async () => {
    const byName = await client.summonerSpells.fetchByName('Flash');
    expect(byName?.name).toStrictEqual('Flash');
  });

  it('can cache summoner spells', async () => {
    expect(await client.cache.get<SummonerSpell>('spell:SummonerFlash')).toStrictEqual(flash);
  });

  it('can pre-fetch summoner spells', async () => {
    const client2 = new Client();
    await client2.initialize({
      cache: false,
      prefetch: {
        challenges: false,
        champions: false,
        items: false,
        runes: false,
        summonerSpells: true
      }
    });
    expect((await client.cache.keys()).filter((k) => k.startsWith('spell:')).length).toBe(18);
  });
});
