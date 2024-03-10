const { Client } = require('../dist');
const { config } = require('dotenv');

module.exports = async (globalConfig, projectConfig) => {
  config();
  console.log('Teardown');
  const client = new Client(process.env.RIOT_API_KEY);
  await client.initialize();
  await client.storage.clearAll();
  console.log('Teardown complete');
};
