import { type ILogger, LoggerLevel, type LogLevel } from 'types';

/**
 * Basic built-in debugging logger?.
 */
export class ShieldbowLogger implements ILogger {
  /**
   * The logger's level, only messages above or equal to this level will be logged.
   */
  level: LoggerLevel;

  /**
   * Create a new logger?.
   * @param level - The logger's level.
   */
  constructor(level?: LogLevel) {
    this.level = LoggerLevel[level || 'WARN'];
  }

  /**
   * Check whether a certain level is enabled.
   * @param level - The level to check.
   */
  hasLevel(level: LoggerLevel): boolean {
    return this.level <= level;
  }

  /**
   * The base logging function.
   * @param level - The level at which the message should be logged.
   * @param message - The message to log.
   */
  log(level: LoggerLevel, ...message: any[]) {
    if (this.hasLevel(level)) {
      const date = new Date().toISOString();
      const levelString = `${LoggerLevel[level]}`.padEnd(8);
      const messages = message
        .map((m) => {
          if (typeof m === 'string') return m;
          return JSON.stringify(m, null, 2);
        })
        .join(' ')
        .split('\n')
        .map((m) => `[${date}] ${levelString} :: ${m}`);
      switch (level) {
        case LoggerLevel.CRITICAL:
          console.error(messages.join('\n'));
          break;
        case LoggerLevel.DEBUG:
          console.debug(messages.join('\n'));
          break;
        case LoggerLevel.ERROR:
          console.error(messages.join('\n'));
          break;
        case LoggerLevel.INFO:
          console.info(messages.join('\n'));
          break;
        case LoggerLevel.TRACE:
          console.debug(messages.join('\n'));
          break;
        case LoggerLevel.WARN:
          console.warn(messages.join('\n'));
          break;
      }
    }
  }

  /**
   * Log a message at the CRITICAL level.
   * @param message - The message to log.
   */
  critical(...message: any[]) {
    this.log(LoggerLevel.CRITICAL, ...message);
  }

  /**
   * Log a message at the DEBUG level.
   * @param message - The message to log.
   */
  debug(...message: any[]) {
    this.log(LoggerLevel.DEBUG, ...message);
  }

  /**
   * Log a message at the ERROR level.
   * @param message - The message to log.
   */
  error(...message: any[]) {
    this.log(LoggerLevel.ERROR, ...message);
  }

  /**
   * Log a message at the INFO level.
   * @param message - The message to log.
   */
  info(...message: any[]) {
    this.log(LoggerLevel.INFO, ...message);
  }

  /**
   * Log a message at the TRACE level.
   * @param message - The message to log.
   */
  trace(...message: any[]) {
    this.log(LoggerLevel.TRACE, ...message);
  }

  /**
   * Log a message at the WARN level.
   * @param message - The message to log.
   */
  warn(...message: any[]) {
    this.log(LoggerLevel.WARN, ...message);
  }
}
