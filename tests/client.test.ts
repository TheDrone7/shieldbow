import { Client } from '../dist';

test('Test client creation', () => {
  const client = new Client(process.env.riot_api_key!);
  expect(client).toBeDefined();
});
