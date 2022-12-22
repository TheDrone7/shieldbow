import { Client, ClientConfig, CurrentGame } from '../dist';

jest.setTimeout(300000);

describe('API: spectator-v4', () => {
  const client = new Client(process.env.RIOT_API_KEY!);
  const globals = global as any;
  const config: ClientConfig = globals.clientConfig;

  let games: CurrentGame[];

  beforeAll(async () => {
    await client.initialize(config);
    games = await client.spectator.fetchFeatured();
  });

  it('can fetch featured games', () => {
    expect(games).toBeDefined();
    expect(games.length).toBeGreaterThan(0);
  });

  it('can fetch individual matches', async () => {
    const participant = games[0].teams.get('red')!.participants[0];
    const summoner = await client.summoners.fetchBySummonerName(participant.summonerName);
    const match = await client.spectator.fetch(summoner.id);
    expect(match).toBeDefined();
    expect(match.id).toBe(games[0].id);
  });
});
