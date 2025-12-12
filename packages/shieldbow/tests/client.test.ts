import { Client } from '../dist';
import { config } from 'dotenv';

config();
jest.setTimeout(3000000);

describe('SHIELDBOW: client', () => {
  it('should validate API key format', () => {
    expect(() => {
      new Client('RGAPI-1234');
    }).toThrow();

    expect(() => {
      new Client(process.env.RIOT_API_KEY!);
    }).not.toThrow();
  });
});
