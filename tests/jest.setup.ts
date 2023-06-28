import { config } from 'dotenv';

global.clientConfig = {
  cache: true,
  storage: {
    enable: true,
    root: 'dev/data'
  },
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

global.fetchOpts = {
  ignoreCache: false,
  ignoreStorage: true,
  cache: true,
  store: true
};

config();
