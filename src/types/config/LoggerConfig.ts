import type { ILogger, LogLevel } from '../ILogger';

/**
 * Client's logging utility configuration.
 */
export interface LoggerConfig {
  /**
   * Whether to enable logging (defaults to `true`).
   * If set to `false`, all other options are ignored.
   */
  enable?: boolean;
  /**
   * The log level to use (defaults to `WARN`).
   * Only logs with a level equal to or higher than this will be logged.
   */
  level?: LogLevel;
  /**
   * The custom logger to use, if you don't want to use the built-in one.
   * This must implement the `ILogger` interface.
   */
  custom?: ILogger;
}
