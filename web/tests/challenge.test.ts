import { Client } from '../dist';
describe('DRAGON: challenges', () => {
  const client = new Client();

  beforeAll(async () => {
    await client.initialize(globalThis.clientConfig);
  });

  it('can fetch challenge data by ID', async () => {
    const challenge = await client.challenges.fetch(0, globalThis.fetchOpts);
    expect(challenge).toBeDefined();
    expect(challenge.name).toBe('CRYSTAL');
    expect(challenge.thresholds).toBeDefined();
    expect(challenge.thresholds.get('IRON')).toBe(0);
  });

  it('can fetch all challenges data', async () => {
    const challenges = await client.challenges.fetchAll(globalThis.fetchOpts);
    expect(challenges).toBeDefined();
    expect(challenges.size).toBeGreaterThan(0);
    expect(challenges.get(0)).toBeDefined();
    expect(challenges.get(0)?.name).toBe('CRYSTAL');
  });

  it('can fetch stored challenge by ID', async () => {
    const challenge = await client.challenges.fetch(0, globalThis.fetchOpts);
    expect(challenge).toBeDefined();
    expect(challenge.name).toBe('CRYSTAL');
  });
});
