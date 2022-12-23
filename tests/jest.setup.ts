import { config } from 'dotenv';

global.clientConfig = {
  cache: true,
  storage: false,
  region: 'na',
  logger: {
    enable: true,
    level: 'ERROR'
  }
};

config();
