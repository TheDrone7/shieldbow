import { Match, Client } from "../dist";

describe('Test Summoner v4 and Account v1 API', () => {
  const client = new Client(process.env.riot_api_key!);

  let match: Match;

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
    match = await client.matches.fetch('EUW1_5861359615');
  });

  test('Check match exists', () => {
    expect(match).toBeDefined();
  });

  test('Check match participants', () => {
    const blueTeam = match.teams.get('blue')!.participants;
    const redTeam = match.teams.get('red')!.participants;
    expect(blueTeam.length).toBe(5);
    expect(redTeam.length).toBe(5);
  });

  test('Check participant data', () => {
    const participant = match.teams.get('red')!.participants[1];
    expect(participant.summoner.name).toBe('TheDrone7');
    expect(participant.bounty.level).toBe(0);
  })
});
