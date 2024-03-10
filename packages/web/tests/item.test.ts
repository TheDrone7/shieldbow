import { Item, Client } from '../dist';

describe('DRAGON: items', () => {
  const client = new Client();

  let boots: Item;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    boots = await client.items.fetch('1001', { ignoreCache: true, cache: true });
  });

  it('can fetch items by ID', () => {
    expect(boots.name).toBe('Boots');
  });

  it('can fetch items by ID from cache', async () => {
    const cached = await client.items.fetch('1001', {
      ignoreCache: false
    });
    expect(cached.name).toBe(boots.name);
  });

  it('can fetch items by ID from API', async () => {
    const stored = await client.items.fetch('1001', {
      ignoreCache: true
    });
    expect(stored.name).toBe(boots.name);
  });

  it('can fetch items by name', async () => {
    const byName = await client.items.fetchByName('Boots', { ignoreCache: true });
    expect(byName?.name).toBe(boots.name);
  });

  it('parses the item recipe', async () => {
    expect((await boots.into()).length).toBeGreaterThanOrEqual(7);
    expect((await boots.from()).length).toBe(0);
    expect(await boots.specialRecipe()).toBeUndefined();
  });

  it('fetches item details', () => {
    expect(boots.details).toContain('25 Move Speed');
  });

  it('can cache items', async () => {
    expect((await client.cache.get<Item>('item:1001'))?.name).toBe(boots.name);
  });

  it('can pre-fetch items', async () => {
    const client2 = new Client();
    // Custom config to test pre-fetching.
    await client2.initialize({
      cache: false,
      prefetch: {
        champions: false,
        runes: false,
        summonerSpells: false,
        challenges: false,
        items: true
      }
    });
    expect((await client.cache.keys()).filter((k) => k.startsWith('item:')).length).toBeGreaterThan(100);
  });
});
