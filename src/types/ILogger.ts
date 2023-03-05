/**
 * The enumerated logger levels.
 */
export enum LoggerLevel {
  TRACE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  CRITICAL
}

/**
 * The Logger levels as a string, for easier usage.
 */
export type LogLevel = keyof typeof LoggerLevel;

/**
 * The basic logger interface for the logging plugins to be used.
 */
export interface ILogger {
  /**
   * The logger's level, only messages above or equal to this level will be logged.
   */
  level: LoggerLevel;

  /**
   * The base logging function.
   * @param level - The level at which the message should be logged.
   * @param message - The message to log.
   */
  log(level: LoggerLevel, ...message: any[]): void;

  /**
   * Check whether a certain level is enabled.
   * @param level - The level to check.
   */
  hasLevel(level: LoggerLevel): boolean;

  /**
   * Log a message at the TRACE level.
   * @param message - The message to log.
   */
  trace(...message: any[]): void;

  /**
   * Log a message at the DEBUG level.
   * @param message - The message to log.
   */
  debug(...message: any[]): void;

  /**
   * Log a message at the INFO level.
   * @param message - The message to log.
   */
  info(...message: any[]): void;

  /**
   * Log a message at the WARN level.
   * @param message - The message to log.
   */
  warn(...message: any[]): void;

  /**
   * Log a message at the ERROR level.
   * @param message - The message to log.
   */
  error(...message: any[]): void;

  /**
   * Log a message at the CRITICAL level.
   * @param message - The message to log.
   */
  critical(...message: any[]): void;
}
