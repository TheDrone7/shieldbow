import { Client } from '../dist';

test('Creating a client', () => {
  const client = new Client('API KEY');
  expect(client).toBeDefined();
});
