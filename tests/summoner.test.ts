import { Summoner, Client } from "../dist";

describe('Test Summoner v4 and Account v1 API', () => {
  const client = new Client(process.env.riot_api_key!);

  let summoner: Summoner;

  beforeAll(async () => {
    await client.initialize({
      region: 'euw',
      cache: { enable: false },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: false
      }
    });
    summoner = await client.summoners.fetchBySummonerName('TheDrone7');
  });

  test('Check summoner details', () => {
    expect(summoner.name).toBe('TheDrone7');
  });

  test('Check summoner account details', async () => {
    const account = await summoner.account.catch(console.error);
    expect(account?.username).toBe('TheDrone7');
  });

  test('Check account by username and tag', async () => {
    const account = await client.accounts.fetchByNameAndTag('TheDrone7', '1624');
    expect(account?.username).toBe('TheDrone7');
  });

  test('Check third-party-verification-code', async () => {
    const match = await summoner.verifyCode('random-code').catch(() => {});
    if (match) expect(match).toBeFalsy();
    else expect(match).toBeUndefined();
  });
});
