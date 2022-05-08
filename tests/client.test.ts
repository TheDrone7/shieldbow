import { Client } from '../dist';

test('Creating a client', () => {
  const client = new Client(process.env.riot_api_key!);
  expect(client).toBeDefined();
});
