import { Item, Client } from '../dist';

describe('DRAGON: items', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let boots: Item;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    boots = await client.items.fetch('1001');
  });

  it('can fetch items by ID', () => {
    expect(boots.name).toBe('Boots');
  });

  it('can fetch items by name', async () => {
    const byName = await client.items.fetchByName('Boots', { force: true });
    expect(byName?.name).toBe(boots.name);
  });

  it('parses the item recipe', () => {
    expect(boots.into.size).toBe(7);
    expect(boots.from.size).toBe(0);
    expect(boots.specialRecipe).toBeUndefined();
  });

  it('fetches item details', () => {
    expect(boots.details).toContain('25 Move Speed');
  });

  it('can cache items', async () => {
    expect(client.items.cache.get('1001')?.name).toBe(boots.name);
  });

  it('can pre-fetch items', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    await client2.initialize({
      cache: false,
      fetch: {
        items: true
      }
    });
    expect(client2.items.cache.size).toBeGreaterThan(100);
  });
});
