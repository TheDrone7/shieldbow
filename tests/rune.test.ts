import { RuneTree, Rune, Client } from "../dist";

describe('Test runes fetching.', () => {
  const client = new Client(process.env.riot_api_key!);

  let domination: RuneTree;
  let electrocute: Rune;

  beforeAll(async () => {
    await client.initialize({
      cache: { enable: false },
      fetch: {
        champions: false,
        items: false,
        runes: false,
        summonerSpells: false
      }
    });
    domination = await client.runes.fetch('Domination');
    electrocute = await client.runes.fetchRune('Electrocute');
  });

  test('Check rune and rune tree fetching by ID', () => {
    expect(domination.name).toBe('Domination');
    expect(electrocute.name).toBe('Electrocute');
  });

  test('Rune details and description', () => {
    expect(electrocute.description).toBe('Hitting a champion with 3 separate attacks or abilities in 3s deals bonus adaptive damage.');
    expect(electrocute.details).toContain('Hitting a champion with 3 separate attacks or abilities');
  });
});
