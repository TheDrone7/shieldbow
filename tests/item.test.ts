import { Item, Client } from "../dist";

describe('Test item fetching.', () => {
  const client = new Client(process.env.riot_api_key!);

  let boots: Item;

  beforeAll(async () => {
    await client.initialize({
      cache: { enable: false },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: false
      }
    });
    boots = await client.items.fetch('1001');
  });

  test('Check item fetching by ID', () => {
    expect(boots.name).toBe('Boots');
  });

  test('Check item fetching by name', async () => {
    const byName = await client.items.findByName('Boots');
    expect(byName).toBe(boots);
  });

  test('Check item recipe', () => {
    expect(boots.into.size).toBe(7);
    expect(boots.from.size).toBe(0);
    expect(boots.specialRecipe).toBeUndefined();
  });

  test('Check item details', () => {
    expect(boots.details).toContain('25 Move Speed');
  });
});
