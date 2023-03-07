import { config } from 'dotenv';

global.clientConfig = {
  cache: true,
  storage: false,
  region: 'na',
  logger: {
    enable: true,
    level: 'ERROR'
  },
  ratelimiter: {
    strategy: 'spread',
    throw: false,
    retry: {
      retries: 5,
      retryDelay: 5000
    }
  }
};

config();
