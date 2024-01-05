import { SummonerSpell } from '@shieldbow/web';
import { Client } from '../dist';
import { config } from 'dotenv';

config();

describe('DRAGON: summoner spell', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let flash: SummonerSpell;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      flash = await client.summonerSpells.fetch('SummonerFlash', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch flash', () => {
    expect(flash).toBeDefined();
    expect(flash.name).toBe('Flash');
  });

  it('should be unable to fetch unknown summoner spell', async () => {
    await expect(async () => {
      await client.summonerSpells.fetch('UnknownSpellXD', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should cache flash', async () => {
    const flash2 = await client.summonerSpells.fetch('SummonerFlash', globalThis.fetchOpts);
    expect(flash2).toBeDefined();
    expect(flash2.name).toBe('Flash');

    expect(client.cache.has('spell:SummonerFlash')).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const flash2 = await client.summonerSpells.fetch('SummonerFlash', {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === 'SummonerFlash'
    });
    expect(flash2).toBeDefined();
    expect(flash2.name).toBe('Flash');
  });

  it('should store to local file', async () => {
    const dDragon = await client.storage.has(`ddragon-${client.version}`, 'spell');
    expect(dDragon).toBeTruthy();
  });

  it('should be able to fetch by name', async () => {
    const exh = await client.summonerSpells.fetchByName('Exhaust', globalThis.fetchOpts);
    expect(exh).toBeDefined();
    expect(exh?.name).toBe('Exhaust');
    expect(exh?.id).toBe('SummonerExhaust');

    expect(client.cache.has('spell:SummonerExhaust')).toBeTruthy();

    // Check if cache can be used
    const exh2 = await client.summonerSpells.fetchByName('Exhaust', globalThis.fetchOpts);
    expect(exh2).toBeDefined();
    expect(exh2?.name).toBe('Exhaust');
    expect(exh2?.id).toBe('SummonerExhaust');

    // Check if cache can be ignored
    const exh3 = await client.summonerSpells.fetchByName('Exhaust', {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === 'SummonerExhaust'
    });
    expect(exh3).toBeDefined();
    expect(exh3?.name).toBe('Exhaust');
    expect(exh3?.id).toBe('SummonerExhaust');
  });

  it('should be able to fetch all summoner spells', async () => {
    const all = await client.summonerSpells.fetchAll(globalThis.fetchOpts);
    expect(all).toBeDefined();
    expect(all.size).toBeGreaterThan(10);
  });

  afterAll(async () => {
    await client.storage.clearAll();
  });
});
