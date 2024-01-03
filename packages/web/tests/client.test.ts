import { Client } from '../dist';

describe('UTIL: client', () => {
  const client = new Client();

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
  });

  it('can initialize', () => {
    expect(client.initialized).toBeTruthy();
  });

  it('logs the initialization', async () => {
    const spy = jest.spyOn(console, 'debug');
    spy.mockImplementation(() => {});
    await new Client().initialize({ logger: { enabled: true, level: 'TRACE' } });
    expect(spy.mock.calls.length).toBeGreaterThanOrEqual(10);
  });

  it('can fetch in different locales', async () => {
    const boots = await client.items.fetch('1001', { ignoreCache: true });
    await client.updateLocale('ko_KR', false);
    const krBoots = await client.items.fetch('1001', { ignoreCache: true });
    expect(boots.name).toBe('Boots');
    expect(krBoots.name).toBe('장화');
  });

  it('can fetch from different patches', async () => {
    const boots = await client.items.fetch('1001', { ignoreCache: true });
    await client.updatePatch('12.9', false);
    const oldBoots = await client.items.fetch('1001', { ignoreCache: true });
    expect(boots.name).toBeDefined();
    expect(oldBoots.name).toBeDefined();
  });

  it('rolls back to previous patch when fetching from a non-existent patch', async () => {
    const clientV2 = new Client();
    // A patch that doesn't exist
    await clientV2.initialize({ ...globalThis.clientConfig, version: '99.99.1' });
    const boots = await clientV2.items.fetch('1001', { ignoreCache: true });
    expect(clientV2.version).not.toBe('99.99.1'); // Should have rolled back to previous patch
    expect(boots.name).toBeDefined(); // Should have fetched from previous patch

    // A patch that exists
    await clientV2.initialize({ ...globalThis.clientConfig, version: '12.9.1' });
    const oldBoots = await clientV2.items.fetch('1001', { ignoreCache: true });
    expect(clientV2.version).toBe('12.9.1'); // Should have updated to new patch
    expect(oldBoots.name).toBeDefined(); // Should have fetched from new patch
  });
});
