import { Champion, Client } from '../dist';

describe('Test champion fetching.', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let kayn: Champion;

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
    kayn = await client.champions.fetch('Kayn', { force: true, cache: true });
  });

  test('Check champion fetching by ID', () => {
    expect(kayn.name).toBe('Kayn');
  });

  test('Check champion fetching by name and key (cached)', async () => {
    const byName = await client.champions.fetchByName('Kayn');
    const byKey = await client.champions.fetchByKey(kayn.key);

    expect(byName).toBe(kayn);
    expect(byKey).toBe(kayn);
  });

  test('Check champion fetching by name and key (forced)', async () => {
    const byName = await client.champions.fetchByName("kai'sa", { force: true, cache: true });
    const byKey = await client.champions.fetchByKey(523, { force: true, cache: true });

    expect(byName?.name).toBe("Kai'Sa");
    expect(byKey?.name).toBe('Aphelios');
  });

  test('Check fetching all champions', async () => {
    const champions = await client.champions.fetchAll({ force: true });
    expect(champions.size).toBeGreaterThan(150);
  }, 120000);

  test('Check champion spells', () => {
    expect(kayn.spells.has('Q')).toBeTruthy();
    expect(kayn.spells.get('Q')!.name).toBe('Reaping Slash');

    expect(kayn.spells.has('W')).toBeTruthy();
    expect(kayn.spells.get('W')!.name).toBe("Blade's Reach");

    expect(kayn.spells.has('E')).toBeTruthy();
    expect(kayn.spells.get('E')!.name).toBe('Shadow Step');

    expect(kayn.spells.has('R')).toBeTruthy();
    expect(kayn.spells.get('R')!.name).toBe('Umbral Trespass');
  });

  test('Check champion passive', () => {
    expect(kayn.passive.name).toBe('The Darkin Scythe');
  });

  test('Check champion classes', () => {
    expect(kayn.classes).toContain('Assassin');
    expect(kayn.classes).toContain('Fighter');
  });

  test('Check champion assets', () => {
    expect(kayn.defaultSplashArt).toBe(
      'http://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/141/141000.jpg'
    );
    expect(kayn.defaultLoadingScreen).toBe(
      'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/characters/kayn/skins/base/kaynloadscreen.jpg'
    );
  });

  test('Check champion caching', async () => {
    expect(client.champions.cache.get('Kayn')?.name).toBe('Kayn');
  });

  test('Check champion sprite', () => {
    expect(kayn.sprite.size.w).toBe(48);
    expect(kayn.sprite.size.h).toBe(48);

    expect(typeof kayn.sprite.image).toBe('string');
  });

  test('Check champion rotations', async () => {
    const rotations = await client.champions.fetchRotations({
      force: true,
      cache: false
    });
    expect(rotations.get('all')?.length).toBeGreaterThan(0);
    expect(rotations.get('new')?.length).toBeGreaterThan(0);
  });
});
