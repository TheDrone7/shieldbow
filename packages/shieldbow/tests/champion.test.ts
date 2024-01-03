import { Champion } from '@shieldbow/web';
import { Client } from '../dist';
import { config } from 'dotenv';

config();

describe('DRAGON: champion', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let kayn: Champion;

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
    try {
      kayn = await client.champions.fetch('Kayn', globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch Kayn', () => {
    expect(kayn).toBeDefined();
    expect(kayn.name).toBe('Kayn');
  });
});
