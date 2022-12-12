import { Client } from '../dist';

describe('UTIL: logger', () => {
  const client = new Client(process.env.RIOT_API_KEY!);

  beforeAll(async () => {
    await client.initialize({
      cache: false,
      logger: {
        enable: true,
        level: 'DEBUG'
      }
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const spy = jest.spyOn(console, 'log');

  it('initializes properly', async () => {
    expect(client.logger).toBeDefined();
  });

  it('can log info', () => {
    client.logger.info('Test info');
    expect(spy).toHaveBeenCalled();
  });

  it('cannot log trace', () => {
    client.logger.trace('Test trace');
    expect(spy).not.toHaveBeenCalled();
  });
});
