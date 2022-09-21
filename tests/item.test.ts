import { Item, Client } from '../dist';

describe('Test item fetching.', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let boots: Item;

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
    boots = await client.items.fetch('1001');
  });

  test('Check item fetching by ID', () => {
    expect(boots.name).toBe('Boots');
  });

  test('Check item fetching by name', async () => {
    const byName = await client.items.fetchByName('Boots', { force: true });
    expect(byName?.name).toBe(boots.name);
  });

  test('Check item recipe', () => {
    expect(boots.into.size).toBe(7);
    expect(boots.from.size).toBe(0);
    expect(boots.specialRecipe).toBeUndefined();
  });

  test('Check item details', () => {
    expect(boots.details).toContain('25 Move Speed');
  });

  test('Check items caching', async () => {
    expect(client.items.cache.get('1001')?.name).toBe(boots.name);
  });

  test('Check items pre-fetching', async () => {
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
