import { Client } from '../dist';
import { config } from 'dotenv';

config();
jest.setTimeout(3000000);

describe('SHIELDBOW: client', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  it('should validate API key format', () => {
    expect(() => {
      new Client('RGAPI-1234');
    }).toThrow();

    expect(() => {
      new Client(process.env.RIOT_API_KEY!);
    }).not.toThrow();
  });

  it('should initialize properly with defaults', async () => {
    await client.initialize();
    expect(client.initialized).toBe(true);
  });
});
