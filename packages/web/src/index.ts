import { Client } from './client';
export * from 'types';
export * from 'utilities';
export * from 'structures';
export * from 'managers';

const client = new Client();

client
  .initialize({
    version: '13.10.1'
  })
  .then(async () => {
    const kayn = await client.champions.fetch('Kayn');
    console.log(kayn.name);
  });
