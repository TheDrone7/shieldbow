import { Client } from './client';
export * from './types';
// export * from './structures';
// export * from './util';
// export * from './managers';

const client = new Client();
client.initialize().then(() => {
  console.log('Client initialized.');
});

export { Client };
