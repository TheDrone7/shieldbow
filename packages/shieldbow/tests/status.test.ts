import { PlatformData, Client } from '../dist';
import { config } from 'dotenv';

config();

describe('API: clash-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let platform: PlatformData;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      platform = await client.fetchStatus('euw');
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should be able to fetch platform data', () => {
    expect(platform).toBeDefined();
    expect(platform.id).toBe('EUW1');
    expect(platform.name).toBe('EU West');
    expect(platform.locales.length).toBeGreaterThan(0);
  });
});
