import { Client, CurrentGame } from '../dist';

jest.setTimeout(300000);

describe('Test Spectator v4 API', () => {
  const client = new Client(process.env.riot_api_key!);

  let games: CurrentGame[];

  beforeAll(async () => {
    await client.initialize({
      region: 'euw',
      cache: false
    });
    games = await client.spectator.fetchFeatured();
  });

  test('Check fetching featured games', () => {
    expect(games).toBeDefined();
    expect(games.length).toBeGreaterThan(0);
  });

  test('Check individual match fetching', async () => {
    const participant = games[0].teams.get('red')!.participants[0];
    const summoner = await client.summoners.fetchBySummonerName(participant.summonerName);
    const match = await client.spectator.fetch(summoner.id);
    expect(match).toBeDefined();
    expect(match.id).toBe(games[0].id);
  });
});
