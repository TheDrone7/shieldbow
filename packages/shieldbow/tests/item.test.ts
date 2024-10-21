import { Item } from '@shieldbow/web';
import { Client } from '../dist';
import { config } from 'dotenv';

config();

describe('DRAGON: item', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let boots: Item;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      boots = await client.items.fetch('1001', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch Boots', () => {
    expect(boots).toBeDefined();
    expect(boots.name).toBe('Boots');
  });

  it('should be unable to fetch unknown item', async () => {
    await expect(async () => {
      await client.items.fetch('Unknown', globalThis.fetchOpts);
    }).rejects.toBeTruthy();
  });

  it('should cache Boots', async () => {
    const boots2 = await client.items.fetch('1001', globalThis.fetchOpts);
    expect(boots2).toBeDefined();
    expect(boots2.name).toBe('Boots');

    expect(client.cache.has('item:1001')).toBeTruthy();
  });

  it('should be able to ignore cache', async () => {
    const boots2 = await client.items.fetch('1001', {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === '1001'
    });
    expect(boots2).toBeDefined();
    expect(boots2.name).toBe('Boots');
  });

  it('should store to local file', async () => {
    const dDragon = await client.storage.has(`ddragon-${client.version}`, 'items');
    const meraki = await client.storage.has(`meraki-${client.version}`, 'items');

    expect(dDragon).toBeTruthy();
    expect(meraki).toBeTruthy();
  });

  it('should be able to fetch by name', async () => {
    const dd = await client.items.fetchByName("Death's Dance", globalThis.fetchOpts);
    expect(dd).toBeDefined();
    expect(dd?.name).toBe("Death's Dance");

    expect(client.cache.has('item:6333')).toBeTruthy();

    // Check if cache can be used
    const dd2 = await client.items.fetchByName("Death's Dance", globalThis.fetchOpts);
    expect(dd2).toBeDefined();
    expect(dd2?.name).toBe("Death's Dance");

    // Check if cache can be ignored
    const dd3 = await client.items.fetchByName("Death's Dance", {
      ...globalThis.fetchOpts,
      ignoreCache: (c: any) => c.id === '6333'
    });
    expect(dd3).toBeDefined();
    expect(dd3?.name).toBe("Death's Dance");
  });

  it('should be able to fetch all items', async () => {
    const all = await client.items.fetchAll(globalThis.fetchOpts);
    expect(all).toBeDefined();
    expect(all.size).toBeGreaterThan(200);
  });

  it('should be able to fetch multiple items at once', async () => {
    const keys = boots.intoIds;
    const multiple = await client.items.fetchMany(keys, globalThis.fetchOpts);
    expect(multiple).toBeDefined();
    expect(multiple.size).toBeGreaterThan(0);
    expect(multiple.size).toBe(keys.length);
  });
});
