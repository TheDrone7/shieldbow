import { Champion } from '@shieldbow/web';
import { Client } from '../dist';
import { config } from 'dotenv';

config();

// Give it up to 10 minutes since there is a lot of fetching to do here.
jest.setTimeout(600000);

describe('DRAGON: champion', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let kayn: Champion;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      kayn = await client.champions.fetch('Kayn', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch Kayn', () => {
    expect(kayn).toBeDefined();
    expect(kayn.name).toBe('Kayn');
  });

  it('should be unable to fetch unknown champion', async () => {
    await expect(async () => {
      await client.champions.fetch('Unknown', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should cache Kayn', async () => {
    const kayn2 = await client.champions.fetch('Kayn', globalThis.fetchOpts);
    expect(kayn2).toBeDefined();
    expect(kayn2.name).toBe('Kayn');

    expect(client.cache.has('champion:Kayn')).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const kayn2 = await client.champions.fetch('Kayn', {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === 'Kayn'
    });
    expect(kayn2).toBeDefined();
    expect(kayn2.name).toBe('Kayn');
  });

  it('should store to local file', async () => {
    const dDragon = await client.storage.has(`ddragon-${client.version}-champion`, 'Kayn');
    const cDragon = await client.storage.has(`cdragon-${client.version}-champion`, 'Kayn');
    const meraki = await client.storage.has(`meraki-${client.version}-champion`, 'Kayn');

    expect(dDragon).toBeTruthy();
    expect(cDragon).toBeTruthy();
    expect(meraki).toBeTruthy();
  });

  it('should be able to fetch by name', async () => {
    const kaisa = await client.champions.fetchByName("Kai'Sa", globalThis.fetchOpts);
    expect(kaisa).toBeDefined();
    expect(kaisa?.name).toBe("Kai'Sa");

    expect(client.cache.has('champion:Kaisa')).toBeTruthy();

    // Check if cache can be used
    const kaisa2 = await client.champions.fetchByName("Kai'Sa", globalThis.fetchOpts);
    expect(kaisa2).toBeDefined();
    expect(kaisa2?.name).toBe("Kai'Sa");

    // Check if cache can be ignored
    const kaisa3 = await client.champions.fetchByName("Kai'Sa", {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === 'Kaisa'
    });
    expect(kaisa3).toBeDefined();
    expect(kaisa3?.name).toBe("Kai'Sa");
  });

  it('should be able to fetch by numerical key', async () => {
    const aphelios = await client.champions.fetchByKey(523, globalThis.fetchOpts);
    expect(aphelios).toBeDefined();
    expect(aphelios?.name).toBe('Aphelios');

    expect(client.cache.has('champion:Aphelios')).toBeTruthy();

    // Check if cache can be used
    const aphelios2 = await client.champions.fetchByKey(523, globalThis.fetchOpts);
    expect(aphelios2).toBeDefined();
    expect(aphelios2?.name).toBe('Aphelios');

    // Check if cache can be ignored
    const aphelios3 = await client.champions.fetchByKey(523, {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === 'Aphelios'
    });
    expect(aphelios3).toBeDefined();
    expect(aphelios3?.name).toBe('Aphelios');
  });

  it('should be unable to fetch by unknown name or key', async () => {
    await expect(async () => {
      await client.champions.fetchByName('Unknown', globalThis.fetchOpts);
    }).rejects.toBeTruthy();

    await expect(async () => {
      await client.champions.fetchByKey(-1, globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should be able to fetch FiddleSticks', async () => {
    const fiddle = await client.champions.fetch('FiddleSticks', globalThis.fetchOpts);
    expect(fiddle).toBeDefined();
    expect(fiddle.id).toBe('Fiddlesticks');
  });

  it('should be able to fetch all champions', async () => {
    const all = await client.champions.fetchAll(globalThis.fetchOpts);
    expect(all).toBeDefined();
    expect(all.size).toBeGreaterThan(100);
  });

  it('should be able to fetch champion rotation', async () => {
    const rotation = await client.champions.fetchRotation(globalThis.fetchOpts);
    expect(rotation).toBeDefined();
    expect(rotation.get('all')).toBeDefined();
    expect(rotation.get('new')).toBeDefined();

    expect(rotation.get('all')).toHaveLength(20);
    expect(rotation.get('new')).toHaveLength(20);
  });
});
