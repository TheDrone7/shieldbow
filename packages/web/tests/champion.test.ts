import { Champion, Client } from '../dist';

jest.setTimeout(300000);

describe('DRAGON: champions', () => {
  const client = new Client();

  let kayn: Champion;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      kayn = await client.champions.fetch('Kayn', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('can fetch a champion by ID', () => {
    expect(kayn.name).toBe('Kayn');
  });

  it('can fetch champion from cache', async () => {
    const cached = await client.champions.fetch('Kayn', {
      ignoreCache: false
    });
    expect(cached).toBe(kayn);
  });

  it('can fetch champion from storage', async () => {
    const cached = await client.champions.fetch('Kayn', {
      ignoreCache: true
    });
    expect(cached.name).toEqual(kayn.name);
  });

  it('can fetch champion by name and key (cached)', async () => {
    const byName = await client.champions.fetchByName('Kayn', {
      ignoreCache: false
    });
    const byKey = await client.champions.fetchByKey(kayn.key, {
      ignoreCache: false
    });

    expect(byName?.name).toBe(kayn.name);
    expect(byKey?.name).toBe(kayn.name);
  });

  it('can fetch champion by name and key (storage)', async () => {
    // Storage is disabled in the client config anyway, so no need to ignore that manually.
    const byName = await client.champions.fetchByName("kai'sa", {
      ignoreCache: true
    });
    const byKey = await client.champions.fetchByKey(523, {
      ignoreCache: true
    });

    expect(byName?.name).toBe("Kai'Sa");
    expect(byKey?.name).toBe('Aphelios');
  });

  it('can fetch champion by name and key (forced)', async () => {
    // Storage is disabled in the client config anyway, so no need to ignore that manually.
    const byName = await client.champions.fetchByName("kai'sa", {
      ignoreCache: true
    });
    const byKey = await client.champions.fetchByKey(523, {
      ignoreCache: true
    });

    expect(byName?.name).toBe("Kai'Sa");
    expect(byKey?.name).toBe('Aphelios');
  });

  it('can fetch all champions', async () => {
    // Storage is disabled in the client config anyway, so no need to ignore that manually.
    const champions = await client.champions.fetchAll({ ignoreCache: true });
    expect(champions.size).toBeGreaterThan(150);
  }, 300000);

  it('assigns champion spells correctly', () => {
    expect(kayn.spells.has('Q')).toBeTruthy();
    expect(kayn.spells.get('Q')!.name).toBe('Reaping Slash');

    expect(kayn.spells.has('W')).toBeTruthy();
    expect(kayn.spells.get('W')!.name).toBe("Blade's Reach");

    expect(kayn.spells.has('E')).toBeTruthy();
    expect(kayn.spells.get('E')!.name).toBe('Shadow Step');

    expect(kayn.spells.has('R')).toBeTruthy();
    expect(kayn.spells.get('R')!.name).toBe('Umbral Trespass');
  });

  it('contains champion passive', () => {
    expect(kayn.passive.name).toBe('The Darkin Scythe');
  });

  it('contains champion classes', () => {
    expect(kayn.tags).toContain('Assassin');
    expect(kayn.tags).toContain('Fighter');
  });

  it('can fetch champion assets', () => {
    expect(kayn.skins[0].uncenteredSplashUrl).toBe(
      'http://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/uncentered/141/141000.jpg'
    );
    expect(kayn.skins[0].loadScreenUrl).toBe(
      'https://raw.communitydragon.org/pbe/plugins/rcp-be-lol-game-data/global/default/assets/characters/kayn/skins/base/kaynloadscreen.jpg'
    );
  });

  it('can cache champions', async () => {
    expect((await client.cache.get<Champion>('champion:Kayn'))?.name).toBe('Kayn');
  });

  it('can fetch champion sprites', () => {
    expect(kayn.image.size.width).toBe(48);
    expect(kayn.image.size.height).toBe(48);

    expect(typeof kayn.image.spriteUrl).toBe('string');
  });
});
