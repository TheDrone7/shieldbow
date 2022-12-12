import { Client } from '../dist';

describe('UTIL: client', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize({
      cache: false
    });
  });

  it('can initialize', () => {
    expect(client.initialized).toBeTruthy();
  });

  it('can fetch in different locales', async () => {
    const boots = await client.items.fetch('1001', { force: true });
    await client.updateLocale('ko_KR', false);
    const krBoots = await client.items.fetch('1001', { force: true });
    expect(boots.name).toBe('Boots');
    expect(krBoots.name).toBe('장화');
  });

  it('can fetch from different patches', async () => {
    const boots = await client.items.fetch('1001', { force: true });
    await client.updatePatch('12.9', false);
    const oldBoots = await client.items.fetch('1001', { force: true });
    expect(boots.name).toBeDefined();
    expect(oldBoots.name).toBeDefined();
  });
});
