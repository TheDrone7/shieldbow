import { Summoner, Client } from '../dist';

describe('API: summoner-v4 + account-v1', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let summoner: Summoner;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    summoner = await client.summoners.fetchBySummonerName('TheDrone7');
  });

  it('can fetch summoner by summoner name', () => {
    expect(summoner.name).toBe('TheDrone7');
  });

  it('can fetch summoner by summoner IDs and PUUIDs', async () => {
    const summoner2 = await client.summoners.fetch(summoner.id, { ignoreCache: true });
    const summoner3 = await client.summoners.fetchByPlayerId(summoner.playerId, { ignoreCache: true });
    expect(summoner2.name).toBe(summoner.name);
    expect(summoner3.name).toBe(summoner.name);
  });

  it('can cache summoners', async () => {
    const cachedSummoner2 = await client.summoners.fetch(summoner.id);
    const cachedSummoner3 = await client.summoners.fetchByPlayerId(summoner.playerId);
    expect(cachedSummoner2.name).toBe(summoner.name);
    expect(cachedSummoner3.name).toBe(summoner.name);
  });

  it('can fetch RIOT account details for a summoner', async () => {
    const account = await summoner.fetchAccount().catch(console.error);
    expect(account?.username).toBe('TheDrone7');
  });

  it('can fetch RIOT account details by username and tag', async () => {
    const account = await client.accounts.fetchByNameAndTag('TheDrone7', '1624');
    expect(account?.username).toBe('TheDrone7');
  });

  it('can verify third-party-verification-code', async () => {
    const match = await summoner.verifyCode('random-code').catch(() => {});
    if (match) expect(match).toBeFalsy();
    else expect(match).toBeUndefined();
  });

  it('automatically makes regional requests', async () => {
    const faker = await client.summoners.fetchBySummonerName('hide on bush', { region: 'kr' });
    expect(faker.name.toLowerCase()).toBe('hide on bush');
    expect(faker.region).toBe('kr');
  });
});
