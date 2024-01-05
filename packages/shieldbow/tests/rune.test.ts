import { Rune, RuneTree } from '@shieldbow/web';
import { Client } from '../dist';
import { config } from 'dotenv';

config();

describe('DRAGON: rune tree', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let domination: RuneTree;
  let electrocute: Rune;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      domination = await client.runes.fetch('Domination', globalThis.fetchOpts);
      electrocute = await client.runes.fetchRune('Electrocute', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch Rune trees and runes', () => {
    expect(domination).toBeDefined();
    expect(domination.name).toBe('Domination');

    expect(electrocute).toBeDefined();
    expect(electrocute.name).toBe('Electrocute');
  });

  it('should be unable to fetch unknown rune tree', async () => {
    await expect(async () => {
      await client.runes.fetch('Unknown', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should cache rune trees', async () => {
    const domination2 = await client.runes.fetch('Domination', globalThis.fetchOpts);
    expect(domination2).toBeDefined();
    expect(domination2.name).toBe('Domination');

    expect(client.cache.has('rune:Domination')).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const domination2 = await client.runes.fetch('Domination', {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === 'Domination'
    });
    expect(domination2).toBeDefined();
    expect(domination2.name).toBe('Domination');
  });

  it('should store to local file', async () => {
    const dDragon = await client.storage.has(`ddragon-${client.version}`, 'runes');
    expect(dDragon).toBeTruthy();
  });

  it('should be able to fetch by name', async () => {
    const prec = await client.runes.fetchByName('precision', globalThis.fetchOpts);
    expect(prec).toBeDefined();
    expect(prec?.name).toBe('Precision');

    expect(client.cache.has('rune:Precision')).toBeTruthy();

    // Also check for rune
    const lethalTempo = await client.runes.fetchRuneByName('Lethal Tempo', globalThis.fetchOpts);
    expect(lethalTempo).toBeDefined();
    expect(lethalTempo?.name).toBe('Lethal Tempo');
  });

  it('should be able to fetch all rune trees', async () => {
    const all = await client.runes.fetchAll(globalThis.fetchOpts);
    expect(all).toBeDefined();
    expect(all.size).toBe(5);
  });

  it('should be able to fetch all runes', async () => {
    const all = await client.runes.fetchAllRunes(globalThis.fetchOpts);
    expect(all).toBeDefined();
    expect(all.length).toBeGreaterThan(10);
  });

  it('should have stat runes', () => {
    const statRunes = client.runes.statRunes;
    expect(statRunes).toBeDefined();
    expect(statRunes.length).toBe(6);
  });

  it('should be able to fetch by numerical ID', async () => {
    const sorcery = await client.runes.fetchById(8200, globalThis.fetchOpts);
    expect(sorcery).toBeDefined();
    expect(sorcery?.name).toBe('Sorcery');

    const arcaneComet = await client.runes.fetchRuneById(8229, globalThis.fetchOpts);
    expect(arcaneComet).toBeDefined();
    expect(arcaneComet?.name).toBe('Arcane Comet');
  });

  afterAll(async () => {
    await client.storage.clearAll();
  });
});
