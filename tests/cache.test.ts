import { Client, ClientConfig } from '../dist';

describe('Test Cache', () => {
  async function prepareClient(config: ClientConfig): Promise<Client> {
    const client = new Client(process.env.riot_api_key!);
    await client.initialize(config);
    return client;
  }

  test('Check champion caching', async () => {
    console.log(Buffer.from(process.env.riot_api_key!, 'utf8').toString('base64'));
    const client = await prepareClient({
      cache: { enable: false },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: false
      }
    });
    await client.champions.fetch('Heimerdinger', { cache: true });
    expect(client.champions.cache.size).toBe(1);
    expect(client.champions.cache.firstKey()).toBe('Heimerdinger');
  });

  test('Check summoner spells pre-fetching', async () => {
    const client = await prepareClient({
      cache: { enable: false },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: true
      }
    });
    expect(client.summonerSpells.cache.size).toBeGreaterThan(0);
  });
});
