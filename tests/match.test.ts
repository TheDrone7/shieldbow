import { Match, Client, MatchTimeline } from '../dist';

jest.setTimeout(300000);

describe('Test match v5 API', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let matches: string[];
  let match: Match;
  let matchTimeline: MatchTimeline;

  beforeAll(async () => {
    await client.initialize({
      region: 'euw',
      cache: false
    });
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    matches = await client.matches.fetchMatchListByPlayer(summoner);
    match = await client.matches.fetch(matches[0]);
    matchTimeline = await client.matches.fetchMatchTimeline(matches[0]);
  });

  test('Check malformed match', async () => {
    const client = new Client(process.env.RIOT_API_KEY!);
    await client.initialize({
      region: 'br',
      cache: false
    });
    try {
      await client.matches.fetch('BR1_2583580397');
    } catch (e: any) {
      if (e instanceof Error) expect(e.message).toMatch('malformed');
    }
  });

  test('Check match list fetching', () => {
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]).toBe(match.id);
  });

  test('Check match exists', () => {
    expect(match).toBeDefined();
  });

  test('Check match timeline exists', () => {
    expect(matchTimeline).toBeDefined();
  });

  test('Check match timeline properties', () => {
    expect(matchTimeline.matchId).toBe(matches[0]);
    expect(matchTimeline.participantIds.length).toBe(10);
  });

  test('Check match participants', () => {
    const blueTeam = match.teams.get('blue')!.participants;
    const redTeam = match.teams.get('red')!.participants;
    expect(blueTeam.length).toBe(5);
    expect(redTeam.length).toBe(5);
  });

  test('Check participant data', () => {
    const participant = match.teams.get('red')!.participants[0];
    expect(participant.summoner.name).toBeDefined();
    expect(participant.bounty.level).toBeDefined();
    expect(typeof participant.challenges).toBe('object');
  });
});
