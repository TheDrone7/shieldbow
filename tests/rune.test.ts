import { RuneTree, Rune, Client } from '../dist';

describe('DRAGON: runes', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let domination: RuneTree;
  let electrocute: Rune;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    domination = await client.runes.fetch('Domination', {
      ignoreCache: true,
      cache: true,
      ignoreStorage: true,
      store: true
    });
    electrocute = await client.runes.fetchRune('Electrocute', {
      ignoreCache: true,
      cache: true,
      ignoreStorage: true,
      store: true
    });
  });

  it('can fetch runes and rune trees by ID', () => {
    expect(domination.name).toBe('Domination');
    expect(electrocute.name).toBe('Electrocute');
  });

  it('can fetch runes and rune trees by ID from storage', async () => {
    const storedRunes = await client.runes.fetchAll({
      ignoreCache: true,
      ignoreStorage: false
    });
    expect(storedRunes.size).toBe(5);
    const storedDomination = storedRunes.get('Domination')!;
    expect(storedDomination.key).toBe(domination.key);
  });

  it('can fetch runes and rune trees by ID', () => {
    expect(domination.name).toBe('Domination');
    expect(electrocute.name).toBe('Electrocute');
  });

  it('can fetch runes and rune trees by name', async () => {
    const precision = await client.runes.fetchByName('precision', { ignoreCache: true });
    const conqueror = await client.runes.fetchRuneByName('conqueror', { ignoreCache: true });
    expect(precision?.name).toBe('Precision');
    expect(conqueror?.name).toBe('Conqueror');
  });

  it('can read rune details and description', () => {
    expect(electrocute.description).toBe(
      'Hitting a champion with 3 separate attacks or abilities in 3s deals bonus adaptive damage.'
    );
    expect(electrocute.details).toContain('Hitting a champion with 3 separate attacks or abilities');
  });

  it('can cache runes', async () => {
    expect((await client.cache.get<RuneTree>('rune:Domination'))?.name).toBe(domination.name);
  });

  it('can pre-fetch runes', async () => {
    const client2 = new Client(process.env.riot_api_key!);
    await client2.initialize({
      cache: false,
      storage: false,
      fetch: {
        runes: true
      }
    });
    expect((await client.cache.keys()).filter((k) => k.startsWith('rune:')).length).toBe(5);
  });
});
