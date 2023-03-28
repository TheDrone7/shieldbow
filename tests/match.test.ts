import { Match, Client, MatchTimeline, RuneTree } from '../dist';

jest.setTimeout(300000);

describe('API: match-v5', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  let matches: string[];
  let match: Match;
  let matchTimeline: MatchTimeline;

  beforeAll(async () => {
    await client.initialize(global.clientConfig);
    const summoner = await client.summoners.fetchBySummonerName('TheDrone7');
    matches = await client.matches.fetchMatchListByPlayer(summoner);
    match = await client.matches.fetch(matches[0]);
    matchTimeline = await client.matches.fetchMatchTimeline(matches[0]);
  });

  it('checks for malformed match data', async () => {
    try {
      await client.matches.fetch('BR1_2583580397', { region: 'br' });
    } catch (e: any) {
      if (e instanceof Error) expect(e.message).toMatch('malformed');
    }
  });

  it('fetches match with malformed perks', async () => {
    const match = await client.matches.fetch('EUW1_6316245747', { region: 'euw' });
    const participant = match.teams.get('blue')!.participants[0];
    expect(participant.perks.primaryStyle.tree).toBeInstanceOf(RuneTree);
    expect(participant.perks.primaryStyle.selected.length).toBe(4);
  });

  it('can fetch match list', () => {
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0]).toBe(match.id);
  });

  it('can fetch match details', () => {
    expect(match).toBeDefined();
  });

  it('can fetch match timeline', () => {
    expect(matchTimeline).toBeDefined();
    expect(matchTimeline.matchId).toBe(matches[0]);
    expect(matchTimeline.participantIds.length).toBe(10);
  });

  it('can fetch match participants summoner details', () => {
    const blueTeam = match.teams.get('blue')!.participants;
    const redTeam = match.teams.get('red')!.participants;
    expect(blueTeam.length).toBe(5);
    expect(redTeam.length).toBe(5);
    const participant = redTeam[0];
    expect(participant.summoner.name).toBeDefined();
    expect(participant.bounty.level).toBeDefined();
    if ([400, 420, 430, 440, 450, 830, 840, 850].includes(match.queue.queueId))
      expect(typeof participant.challenges).toBe('object');
  });
});
