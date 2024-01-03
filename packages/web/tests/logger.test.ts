import { Client, ShieldbowLogger } from '../dist';

describe('UTIL: logger', () => {
  const client = new Client();

  beforeAll(async () => {
    await client.initialize({
      cache: false,
      logger: {
        level: 'DEBUG'
      }
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const spy = jest.spyOn(console, 'info');

  it('initializes properly', async () => {
    expect(client.logger).toBeDefined();
  });

  it('can log info', () => {
    client.logger?.info('Test info');
    expect(spy).toHaveBeenCalled();
  });

  it('cannot log trace', () => {
    client.logger?.trace('Test trace');
    expect(spy).not.toHaveBeenCalled();
  });

  it('uses debug for trace', () => {
    const debugSpy = jest.spyOn(console, 'debug');
    const logger = new ShieldbowLogger('TRACE');
    logger.trace('Test trace');
    expect(debugSpy).toHaveBeenCalled();
  });
});
