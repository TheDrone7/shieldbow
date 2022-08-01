import { Client } from '../dist';

describe('Test client configuration update', () => {
  const client = new Client(process.env.riot_api_key!);

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
  });

  test('Check locale updating', async () => {
    const boots = await client.items.fetch('1001', { force: true });
    await client.updateLocale('ko_KR', false);
    const krBoots = await client.items.fetch('1001', { force: true });
    expect(boots.name).toBe('Boots');
    expect(krBoots.name).toBe('장화');
  });

  test('Check patch updating', async () => {
    const boots = await client.items.fetch('1001', { force: true });
    await client.updatePatch('12.9', false);
    const oldBoots = await client.items.fetch('1001', { force: true });
    expect(boots.name).toBeDefined();
    expect(oldBoots.name).toBeDefined();
  });
});
