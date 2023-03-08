import { Item, Client } from '../dist';

describe('DRAGON: items', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let boots: Item;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    boots = await client.items.fetch('1001', { ignoreCache: true, cache: true, ignoreStorage: true, store: true });
  });

  it('can fetch items by ID', () => {
    expect(boots.name).toBe('Boots');
  });

  it('can fetch items by ID from cache', async () => {
    const cached = await client.items.fetch('1001', {
      ignoreCache: false,
      ignoreStorage: false
    });
    expect(cached.name).toBe(boots.name);
  });

  it('can fetch items by ID from storage', async () => {
    const stored = await client.items.fetch('1001', {
      ignoreCache: true,
      ignoreStorage: false
    });
    expect(stored.name).toBe(boots.name);
  });

  it('can fetch items by name', async () => {
    const byName = await client.items.fetchByName('Boots', { ignoreCache: true });
    expect(byName?.name).toBe(boots.name);
  });

  it('parses the item recipe', async () => {
    expect((await boots.into()).size).toBe(7);
    expect((await boots.from()).size).toBe(0);
    expect(await boots.specialRecipe()).toBeUndefined();
  });

  it('fetches item details', () => {
    expect(boots.details).toContain('25 Move Speed');
  });

  it('can cache items', async () => {
    expect((await client.cache.get<Item>('item:1001'))?.name).toBe(boots.name);
  });

  it('can pre-fetch items', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    // Custom config to test pre-fetching.
    await client2.initialize({
      cache: false,
      storage: false,
      fetch: {
        items: true
      }
    });
    expect((await client.cache.keys()).filter((k) => k.startsWith('item:')).length).toBeGreaterThan(100);
  });
});
