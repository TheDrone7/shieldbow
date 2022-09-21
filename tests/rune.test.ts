import { RuneTree, Rune, Client } from '../dist';

describe('Test runes fetching.', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let domination: RuneTree;
  let electrocute: Rune;

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
    domination = await client.runes.fetch('Domination');
    electrocute = await client.runes.fetchRune('Electrocute');
  });

  test('Check rune and rune tree fetching by ID', () => {
    expect(domination.name).toBe('Domination');
    expect(electrocute.name).toBe('Electrocute');
  });

  test('Check rune and rune tree fetching by name', async () => {
    const precision = await client.runes.fetchByName('precision', { force: true });
    const conqueror = await client.runes.fetchRuneByName('conqueror', { force: true });
    expect(precision?.name).toBe('Precision');
    expect(conqueror?.name).toBe('Conqueror');
  });

  test('Rune details and description', () => {
    expect(electrocute.description).toBe(
      'Hitting a champion with 3 separate attacks or abilities in 3s deals bonus adaptive damage.'
    );
    expect(electrocute.details).toContain('Hitting a champion with 3 separate attacks or abilities');
  });

  test('Check runes caching', async () => {
    expect(client.runes.cache.get('Domination')?.name).toBe(domination.name);
  });

  test('Check runes pre-fetching', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    await client2.initialize({
      cache: false,
      fetch: {
        runes: true
      }
    });
    expect(client2.runes.cache.size).toBe(5);
    expect(client2.runes.cachedRunes.length).toBeGreaterThan(50);
  });
});
