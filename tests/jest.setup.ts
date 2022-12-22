import { config } from 'dotenv';

global.clientConfig = {
  cache: false,
  region: 'na',
  logger: {
    enable: true,
    level: 'ERROR'
  }
};

config();
