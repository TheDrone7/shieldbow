import { Client, FeaturedGame } from '../dist';
import { config } from 'dotenv';

config();
jest.setTimeout(600000);

const checkGame = (game: FeaturedGame) => {
  expect(game.type).toBeDefined();
  expect(game.length).toBeDefined();
  expect(game.participants[0]).toBeDefined();
  expect(game.mode).toBeDefined();
  expect(game.participants[0].champion).toBeDefined();
  expect(game.participants[0].playerId).toBeDefined();
  expect(game.participants[0].summonerSpells.get('D')).toBeDefined();
  expect(game.participants[0].summonerSpells.get('F')).toBeDefined();
  if (game.bannedChampions.length > 0) {
    if (game.bannedChampions[0].championId > 0) expect(game.bannedChampions[0].champion).toBeDefined();
    expect(game.bannedChampions[0].teamId).toBeDefined();
  }
};

describe('API: spectator-v5', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let featured: FeaturedGame[];

  beforeAll(async () => {
    await client.initialize({
      ...globalThis.clientConfig,
      logger: {
        level: 'WARN'
      }
    });
    try {
      featured = await client.spectator.fetchFeatured(globalThis.fetchOpts);
    } catch (e) {
      client.logger?.error(`${e}`);
    }
  });

  it('should fetch featured games', () => {
    expect(featured.length).toBeGreaterThan(0);
    featured.forEach(checkGame);
  });

  it('should fetch, cache and store a live game', async () => {
    const puuid = featured[0].participants[0].playerId;
    const game = await client.spectator.fetch(puuid, globalThis.fetchOpts);
    checkGame(game);

    expect(game.participants[0].runes).toBeDefined();
    expect(game.participants[0].runes.primaryTree).toBeDefined();
    expect(game.participants[0].runes.secondaryTree).toBeDefined();
    expect(game.participants[0].runes.selectedRunes).toHaveLength(6);
    expect(game.participants[0].runes.statRunes).toHaveLength(3);

    const cached = await client.cache.has(`live-game:${puuid}`);
    const stored = await client.storage.has(`live-game`, puuid);

    console.log(await client.cache.keys());
    expect(cached).toBeTruthy();
    expect(stored).toBeTruthy();
  });
});
