import { Champion, Client } from "../dist";

describe('Test champion fetching.', () => {
  const client = new Client('RGAPI-...');

  let kayn: Champion;

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
    kayn = await client.champions.fetch('Kayn');
  });

  test('Check champion fetching by ID', async () => {
    expect(kayn.name).toBe('Kayn');
  });

  test('Champion fetching by name and key', async () => {
    const byName = await client.champions.findByName('Kayn');
    const champion = client.champions.findByKey(kayn.key);
    expect(byName).toBe(kayn);
    expect(champion).toBe(kayn);
  });

  test('Check champion spells', async () => {
    expect(kayn.spells.has('Q')).toBeTruthy();
    expect(kayn.spells.get('Q')!.name).toBe('Reaping Slash');

    expect(kayn.spells.has('W')).toBeTruthy();
    expect(kayn.spells.get('W')!.name).toBe('Blade\'s Reach');

    expect(kayn.spells.has('E')).toBeTruthy();
    expect(kayn.spells.get('E')!.name).toBe('Shadow Step');

    expect(kayn.spells.has('R')).toBeTruthy();
    expect(kayn.spells.get('R')!.name).toBe('Umbral Trespass');
  });

  test('Check champion passive', async () => {
    expect(kayn.passive.name).toBe('The Darkin Scythe');
  });

  test('Check champion classes', async () => {
    expect(kayn.classes).toContain('Assassin');
    expect(kayn.classes).toContain('Fighter');
  });
});
